import { UUID } from "crypto";

/**
 * Generates a Universally Unique Identifier (UUID).
 *
 * @returns {UUID} The generated UUID.
 */
export const createUUID: () => UUID = require("uuidv7").uuidv7;
