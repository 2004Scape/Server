export default class ColorConversion {
    static hsl24to16(hue: number, saturation: number, lightness: number): number {
        if (lightness > 243) {
            saturation >>= 4;
        } else if (lightness > 217) {
            saturation >>= 3;
        } else if (lightness > 192) {
            saturation >>= 2;
        } else if (lightness > 179) {
            saturation >>= 1;
        }

        return ((hue & 0xff) >> 2 << 10) + (saturation >> 5 << 7) + (lightness >> 1);
    }

    static rgb15to24(rgb: number): number {
        const r: number = (rgb >> 10) & 0x1f;
        const g: number = (rgb >> 5) & 0x1f;
        const b: number = rgb & 0x1f;

        return (r << 3 << 16) + (g << 3 << 8) + (b << 3);
    }

    static rgb15toHsl16(rgb: number): number {
        const r: number = (rgb >> 10) & 0x1f;
        const g: number = (rgb >> 5) & 0x1f;
        const b: number = rgb & 0x1f;

        const red: number = r / 31.0;
        const green: number = g / 31.0;
        const blue: number = b / 31.0;

        return ColorConversion.rgbToHsl(red, green, blue);
    }

    static rgb24to15(rgb: number): number {
        const r: number = (rgb >> 16) & 0xff;
        const g: number = (rgb >> 8) & 0xff;
        const b: number = rgb & 0xff;

        return ((r >> 3) << 10) + ((g >> 3) << 5) + (b >> 3);
    }

    static rgb24toHsl16(rgb: number): number {
        const r: number = (rgb >> 16) & 0xff;
        const g: number = (rgb >> 8) & 0xff;
        const b: number = rgb & 0xff;

        const red: number = r / 256.0;
        const green: number = g / 256.0;
        const blue: number = b / 256.0;

        return ColorConversion.rgbToHsl(red, green, blue);
    }

    static rgbToHsl(red: number, green: number, blue: number): number {
        let min = red;
        if (green < min) {
            min = green;
        }
        if (blue < min) {
            min = blue;
        }

        let max = red;
        if (green > max) {
            max = green;
        }
        if (blue > max) {
            max = blue;
        }

        let hNorm: number = 0.0;
        let sNorm: number = 0.0;
        const lNorm: number = (min + max) / 2.0;

        if (min !== max) {
            if (lNorm < 0.5) {
                sNorm = (max - min) / (max + min);
            } else if (lNorm >= 0.5) {
                sNorm = (max - min) / (2.0 - max - min);
            }

            if (red === max) {
                hNorm = (green - blue) / (max - min);
            } else if (green === max) {
                hNorm = (blue - red) / (max - min) + 2.0;
            } else if (blue === max) {
                hNorm = (red - green) / (max - min) + 4.0;
            }
        }

        hNorm /= 6.0;

        const hue = (hNorm * 256.0) | 0;
        let saturation = (sNorm * 256.0) | 0;
        let lightness = (lNorm * 256.0) | 0;

        if (saturation < 0) {
            saturation = 0;
        } else if (saturation > 255) {
            saturation = 255;
        }

        if (lightness < 0) {
            lightness = 0;
        } else if (lightness > 255) {
            lightness = 255;
        }

        return ColorConversion.hsl24to16(hue, saturation, lightness);
    }

    static readonly RGB15_HSL16: Int32Array = new Int32Array(32768);

    static {
        for (let rgb = 0; rgb < 32768; rgb++) {
            ColorConversion.RGB15_HSL16[rgb] = ColorConversion.rgb15toHsl16(rgb);
        }
    }

    static reverseHsl(hsl: number): number[] {
        const possible: number[] = [];

        for (let rgb = 0; rgb < 32768; rgb++) {
            if (ColorConversion.RGB15_HSL16[rgb] === hsl) {
                possible.push(rgb);
            }
        }

        return possible;
    }
}
