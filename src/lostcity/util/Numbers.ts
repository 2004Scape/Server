/**
 * Returns `num` "casted" to a signed 32-bit integer.
 * @param num The number to cast.
 */
export function toInt32(num: number): number {
    return num | 0;
}

/**
 * Returns `num` "casted" to an unsigned 32-bit integer.
 * @param num The number to cast.
 */
export function toUInt32(num: number): number {
    return num >>> 0;
}
