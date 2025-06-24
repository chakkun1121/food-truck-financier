import { describe, expect, it } from "bun:test";
import { User } from "firebase/auth";
import { generateTickerId } from "./generateTickerId";

describe("generateTickerId", () => {
  it("should generate ticker ID with userNumber and lastTicket", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: 45 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1046");
  });

  it("should generate ticker ID with email character and lastTicket when userNumber is undefined", () => {
    const prefix = "T";
    const userInfo = { lastTicket: 45 };
    const user = { email: "test-1@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1046");
  });

  it("should generate ticker ID with email character and default lastTicket when userNumber and lastTicket are undefined", () => {
    const prefix = "T";
    const userInfo = {};
    const user = { email: "test-1@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1001");
  });

  it("should generate ticker ID with default values when userInfo and user are undefined", () => {
    const prefix = "T";
    const userInfo = undefined;
    const user = undefined;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-undefined001");
  });

  it("should generate ticker ID with default values when userInfo is undefined and user email is null", () => {
    const prefix = "T";
    const userInfo = undefined;
    const user = { email: null } as unknown as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-undefined001");
  });

  it("should handle an undefined prefix", () => {
    const prefix = undefined;
    const userInfo = { userNumber: 1, lastTicket: 45 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("undefined-1046");
  });

  it("should use userNumber when it is 0", () => {
    const prefix = "T";
    const userInfo = { userNumber: 0, lastTicket: 9 };
    const user = { email: "test@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-0010");
  });

  it("should correctly pad the ticket number when crossing from 1 to 2 digits", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: 9 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1010");
  });

  it("should correctly pad the ticket number when crossing from 2 to 3 digits", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: 99 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1100");
  });

  it("should handle ticket number overflow correctly", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: 999 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1000");
  });

  it("should handle email with empty local part", () => {
    const prefix = "T";
    const userInfo = {};
    const user = { email: "@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-001");
  });

  it("should handle email without an @ symbol", () => {
    const prefix = "T";
    const userInfo = {};
    const user = { email: "testuser" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-r001");
  });

  it("should handle an empty string prefix", () => {
    const prefix = "";
    const userInfo = { userNumber: 1, lastTicket: 45 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("-1046");
  });

  it("should handle a null prefix", () => {
    const prefix = null;
    const userInfo = { userNumber: 1, lastTicket: 45 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("null-1046");
  });

  it("should use email when userInfo.userNumber is null", () => {
    const prefix = "T";
    const userInfo = { userNumber: null, lastTicket: 45 };
    const user = { email: "test-a@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-a046");
  });

  it("should use default lastTicket when userInfo.lastTicket is null", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: null };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);
    expect(result).toBe("T-1001");
  });

  it("should handle email with a single character local part", () => {
    const prefix = "T";
    const userInfo = {};
    const user = { email: "a@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-a001");
  });

  it("should handle email with a '+' in the local part", () => {
    const prefix = "T";
    const userInfo = {};
    const user = { email: "test+alias@example.com" } as User;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-s001");
  });

  it("should correctly handle ticket number greater than 1000", () => {
    const prefix = "T";
    const userInfo = { userNumber: 1, lastTicket: 1234 };
    const user = null;

    const result = generateTickerId(prefix, userInfo, user);

    expect(result).toBe("T-1235");
  });
});
