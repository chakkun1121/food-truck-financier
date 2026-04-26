import { clientFirebase } from "@/firebase/client";
import { ref, set } from "firebase/database";
import { createUUID } from "./uuid";

export type LogLevel = "info" | "warn" | "error" | "fatal";

export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  errorName?: string;
  errorMessage?: string;
  errorStack?: string;
  context?: Record<string, unknown>;
  timestamp: string;
  userAgent?: string;
  url?: string;
}

const sendLogToBackend = async (logEntry: LogEntry) => {
  // 1. セルフホスト環境（利用者自身）のFirebaseへ保存
  try {
    const errorRef = ref(clientFirebase.db, `errors/${logEntry.id}`);
    const safePayload = JSON.parse(JSON.stringify(logEntry));
    await set(errorRef, safePayload);
  } catch (e) {
    console.error("[Logger: sendLogToBackend] Firebase Error", e);
  }

  // 2. 開発者（中央）への外部通知
  const discordWebhookUrl =
    process.env.NEXT_PUBLIC_DEVELOPER_DISCORD_WEBHOOK_URL;
  const genericReportUrl = process.env.NEXT_PUBLIC_DEVELOPER_REPORT_URL;

  // Discord専用の通知（リッチな埋め込み形式）
  if (discordWebhookUrl) {
    try {
      const discordPayload = {
        embeds: [
          {
            title: `🚨【${logEntry.level.toUpperCase()}】エラー発生`,
            color: logEntry.level === "fatal" ? 0xff0000 : 0xff9933,
            fields: [
              { name: "Error ID", value: `\`${logEntry.id}\``, inline: true },
              { name: "Message", value: logEntry.message || "No message" },
              { name: "URL", value: logEntry.url || "Unknown" },
              {
                name: "User-Agent",
                value: `\`${logEntry.userAgent || "Unknown"}\``
              },
              {
                name: "Stack Trace",
                value: logEntry.errorStack
                  ? `\`\`\`${logEntry.errorStack.substring(0, 1000)}\`\`\``
                  : "No stack trace available"
              }
            ],
            timestamp: logEntry.timestamp
          }
        ]
      };
      await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload)
      });
    } catch (e) {
      console.error("[Logger: sendLogToBackend] Discord Webhook Error", e);
    }
  }

  // 汎用的なHTTP POST通知（自前サーバーや他サービス用）
  if (genericReportUrl) {
    try {
      await fetch(genericReportUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry)
      });
    } catch (e) {
      console.error("[Logger: sendLogToBackend] Generic Report Error", e);
    }
  }
};

const buildLogEntry = (
  level: LogLevel,
  message: string,
  error?: Error,
  context?: Record<string, unknown>
): LogEntry => {
  return {
    id: createUUID(),
    level,
    message,
    errorName: error?.name,
    errorMessage: error?.message,
    errorStack: error?.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined
  };
};

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    const entry = buildLogEntry("info", message, undefined, context);
    console.info(message, context || "");
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    const entry = buildLogEntry("warn", message, undefined, context);
    console.warn(message, context || "");
  },
  error: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): string => {
    const entry = buildLogEntry("error", message, error, context);
    console.error(message, error || "", context || "");
    sendLogToBackend(entry).catch(console.error);
    return entry.id;
  },
  fatal: (
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): string => {
    const entry = buildLogEntry("fatal", message, error, context);
    console.error(`[FATAL] ${message}`, error || "", context || "");
    sendLogToBackend(entry).catch(console.error);
    return entry.id;
  }
};
