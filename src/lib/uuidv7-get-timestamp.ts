import { UUID } from "uuidv7";

export function UUIDv7GetTimestamp(uuid: string) {
  const timestampBytes = new Uint8Array(8);
  timestampBytes.set(
    new Uint8Array(UUID.parse(uuid).bytes.buffer.slice(0, 6)),
    2
  );
  // @ts-ignore
  const timestampMs = new DataView(timestampBytes.buffer).getBigUint64();

  return new Date(Number(timestampMs));
}
