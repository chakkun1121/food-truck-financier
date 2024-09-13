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
});
