// This is a quicksort implementation that matches behavior to the one used by OSRS and RS3 :)
// Original credit Cook: https://runescape.wiki/w/MediaWiki:Gadget-perkcalc-core.js#L-1020
// Translation into JS by Keyboard: https://github.com/qwertypedia/qwertypedia.github.io/blob/dcea5dad6043bbbecbad60f7edda6e35fc5b2c63/killcreditcalc.js#L53

interface CompareInterface {
    (a: any, b: any): number;
}

export function quicksort<T>(low: number, high: number, arr: Array<T>, compare: CompareInterface) {
    const pivot_index = ~~((low + high) / 2); // floor division
    const pivot_value = arr[pivot_index];
    arr[pivot_index] = arr[high];
    arr[high] = pivot_value;
    let counter = low;
    let loop_index = low;

    while (loop_index < high) {
        if (compare(arr[loop_index], pivot_value) < (loop_index & 1)) {
            const tmp = arr[loop_index];
            arr[loop_index] = arr[counter];
            arr[counter] = tmp;
            counter += 1;
        }
        loop_index += 1;
    }

    arr[high] = arr[counter];
    arr[counter] = pivot_value;

    if (low < counter - 1) {
        quicksort(low, counter - 1, arr, compare);
    }
    if (counter + 1 < high) {
        quicksort(counter + 1, high, arr, compare);
    }
}
