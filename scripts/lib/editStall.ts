import { serverFirebase } from "@/firebase/server";

type EditStallParams = {
  stallId: string;
  name: string;
  prefix: string;
};

type EditStallResult = {
  success: boolean;
  error?: string;
};

export async function editStall({
  stallId,
  name,
  prefix
}: EditStallParams): Promise<EditStallResult> {
  if (!stallId || !name || !prefix) {
    return {
      success: false,
      error: "stallId, name, and prefix are required."
    };
  }

  const trimmedStallId = stallId.trim();
  const trimmedName = name.trim();
  const trimmedPrefix = prefix.trim();

  if (trimmedPrefix.length < 1) {
    return {
      success: false,
      error: "Prefix should be at least 1 character."
    };
  }

  if (trimmedName.length === 0) {
    return {
      success: false,
      error: "Name cannot be empty."
    };
  }
  if (trimmedName.length > 50) {
    return {
      success: false,
      error: "Name must be 50 characters or less."
    };
  }

  const db = serverFirebase.db;

  const existingStalls =
    (await db
      .ref("stalls")
      .once("value")
      .then(snapshot => snapshot.val())) || {};

  if (!existingStalls[trimmedStallId]) {
    return {
      success: false,
      error: `Stall with ID "${trimmedStallId}" does not exist.`
    };
  }

  for (const key in existingStalls) {
    if (
      key !== trimmedStallId &&
      existingStalls[key]?.prefix === trimmedPrefix
    ) {
      return {
        success: false,
        error: `Stall with prefix "${trimmedPrefix}" already exists.`
      };
    }
  }

  try {
    // Partial update of the stall object to avoid wiping out other data (category, commodities, etc.)
    await db.ref(`stalls/${trimmedStallId}`).update({
      name: trimmedName,
      prefix: trimmedPrefix
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Failed to edit stall (${trimmedStallId}): ${errorMessage}`
    };
  }

  return {
    success: true
  };
}
