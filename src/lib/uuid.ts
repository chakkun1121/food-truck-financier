import { UUID } from "crypto";
import { uuidv7 } from "uuidv7";

/**
 * Generates a Universally Unique Identifier (UUID).
 *
 * @returns {UUID} The generated UUID.
 */
export const createUUID: () => UUID = () => uuidv7() as UUID;
