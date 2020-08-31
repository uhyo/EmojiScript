namespace ts {
    export const emojiToTokenObj: MapLike<EmojiSyntaxKind> = {
        // 🤔
        "\u{1f914}": SyntaxKind.ThinkingFaceEmoji,
        // 🤷
        "\u{1f937}": SyntaxKind.PersonShruggingEmoji,
        // 📜
        "\u{1f4dc}": SyntaxKind.ScrollEmoji,
        // 💈
        "\u{1f488}": SyntaxKind.BarbarPoleEmoji,
        // 👉
        "\u{1f449}": SyntaxKind.BackhandIndexPointingRightEmoji,
        // 🙇
        "\u{1f647}": SyntaxKind.PersonBowingEmoji,
    };

    /**
     * Map of simple replacements from emoji to other token.
     */
    export const emojiTokenReplace = new Map<EmojiSyntaxKind, TokenSyntaxKind>([
        [SyntaxKind.ThinkingFaceEmoji, SyntaxKind.IfKeyword],
        [SyntaxKind.PersonShruggingEmoji, SyntaxKind.ElseKeyword],
        [SyntaxKind.ScrollEmoji, SyntaxKind.FunctionKeyword],
        [SyntaxKind.BarbarPoleEmoji, SyntaxKind.ForKeyword],
        [SyntaxKind.BackhandIndexPointingRightEmoji, SyntaxKind.LetKeyword],
        [SyntaxKind.PersonBowingEmoji, SyntaxKind.SemicolonToken]
    ]);

    const charCodeToTokenObj = new Map(
        getEntries(emojiToTokenObj).map(([ch, token]) => [
            codePointAt(ch, 0), token
        ])
    );
    /* @internal */
    export function toEmojiToken(code: number): EmojiSyntaxKind | undefined {
        return charCodeToTokenObj.get(code);
    }

    const skinedEmojiTokenSet = new Set<SyntaxKind>(
        [
            SyntaxKind.PersonShruggingEmoji,
            SyntaxKind.BackhandIndexPointingRightEmoji,
            SyntaxKind.PersonBowingEmoji
        ]
    );
    /* @internal */
    export function isSkinedEmojiToken(token: SyntaxKind): boolean {
        return skinedEmojiTokenSet.has(token);
    }

    const genderedEmojiTokenSet = new Set<SyntaxKind>(
        [
            SyntaxKind.PersonShruggingEmoji,
            SyntaxKind.PersonBowingEmoji
        ]
    );
    /* @internal */
    export function isGenderedEmojiToken(token: SyntaxKind): boolean {
        return genderedEmojiTokenSet.has(token);
    }

    /**
     * Parse emoji extensions and returns the number of code units parsed.
     * @internal
     */
    export function scanEmojiExtension(token: SyntaxKind, text: string, pos: number): number {
        const initPos = pos;
        while (true) {
            // Scan skin tones
            if (isSkinedEmojiToken(token)) {
                const ch = codePointAt(text, pos);
                if (0x1f3fb <= ch && ch <= 0x1f3ff) {
                    // skin tokes
                    pos += 2;
                    continue;
                }
            }
            // Scan gender modifieres
            if (isGenderedEmojiToken(token)) {
                const ch = codePointAt(text, pos);
                // ZWJ
                if (ch === 0x200d) {
                    const ch2 = codePointAt(text, pos + 1);
                    if (ch2 === 0x2640 || ch2 === 0x2642) {
                        // female or male sign
                        const ch3 = codePointAt(text, pos + 2);
                        if (ch3 === 0xfe0f) {
                            // Variation Selector 16: emoji looking
                            pos += 3;
                        }
                        else {
                            pos += 2;
                        }
                        continue;
                    }
                }
            }
            break;
        }

        return pos - initPos;
    }
}
