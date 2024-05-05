export function tryParseBoolean(value: string | boolean | undefined, defaultValue: boolean): boolean {
    if (value === 'true' || value === true) {
        return true;
    } else if (value === 'false' || value === false) {
        return false;
    } else {
        return defaultValue;
    }
}

export function tryParseInt(value: string | number | undefined, defaultValue: number): number {
    if (typeof value === 'number') {
        return value;
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
        return defaultValue;
    }

    const intValue = parseInt(value);
    if (!isNaN(intValue)) {
        return intValue;
    }

    return defaultValue;
}

export function tryParseString(value: string | undefined, defaultValue: string): string {
    if (typeof value !== 'string') {
        return defaultValue;
    }

    return value;
}

export function tryParseArray<T>(value: T[] | undefined, defaultValue: T[]): T[] {
    if (!Array.isArray(value)) {
        return defaultValue;
    }

    return value;
}
