namespace ts {
    /* @internal */
    export const codePointAt: (s: string, i: number) => number = (String.prototype as any).codePointAt ? (s, i) => (s as any).codePointAt(i) : function codePointAt(str, i): number {
        // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
        const size = str.length;
        // Account for out-of-bounds indices:
        if (i < 0 || i >= size) {
            return undefined!; // String.codePointAt returns `undefined` for OOB indexes
        }
        // Get the first code unit
        const first = str.charCodeAt(i);
        // check if it’s the start of a surrogate pair
        if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) { // high surrogate and there is a next code unit
            const second = str.charCodeAt(i + 1);
            if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            }
        }
        return first;
    };

}
