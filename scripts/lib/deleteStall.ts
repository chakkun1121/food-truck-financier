import { serverFirebase } from "@/firebase/server";
import { UserInfo } from "@/types/userInfo";

type DeleteStallParams = {
  stallId: string;
};

type DeleteStallResult = {
  success: boolean;
  error?: string;
};

export async function deleteStall({
  stallId
}: DeleteStallParams): Promise<DeleteStallResult> {
  if (!stallId) {
    return {
      success: false,
      error: "stallId is required."
    };
  }

  const trimmedStallId = stallId.trim();
  const db = serverFirebase.db;

  const stallSnapshot = await db.ref(`stalls/${trimmedStallId}`).once("value");
  if (!stallSnapshot.exists()) {
    return {
      success: false,
      error: `Stall with ID "${trimmedStallId}" does not exist.`
    };
  }

  const usersSnapshot = await db.ref("users").once("value");
  const users = usersSnapshot.val() as Record<string, UserInfo> | null;

  if (users) {
    for (const uid in users) {
      if (users[uid].stallId === trimmedStallId) {
        return {
          success: false,
          error: `Cannot delete stall. There are still users associated with this stall.`
        };
      }
    }
  }

  try {
    await db.ref(`stalls/${trimmedStallId}`).remove();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to delete stall (${trimmedStallId}): ${errorMessage}`
    };
  }

  return {
    success: true
  };
}
