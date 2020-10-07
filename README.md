
# EmojiScript

A fork of [TypeScript](https://www.typescriptlang.org/) with Emoji support.

## Example

```ts
📜fizzbuzz(n: 📊): 🕳️ {
  💈(👉🏻i = 0; i⏮️n; i🎂) {
    🤔(i🍕⠏ 🤝 0) {
      console.log("FizzBuzz")🙇‍♂️
    } 🤷🤔(i🍕⠃ 🤝🏽 0) {
      console.log("Fizz")🙇🏽‍♀️
    } 🤷🏿‍♂️🤔(i🍕⠅ 🤝🏿 0) {
      console.log("Buzz")🙇🏿‍♀️
    } 🤷🏻‍♂️ {
      console.log(i)🙇🏼‍♂️
    }
  }
}

fizzbuzz(⠃⣨)🙇‍♀️
```

## Docs

### Emoji Aliases

| Emoji | Token |
| ----- | ----- |
| 🤔 | `if` |
| 🤷 | `else` |
| 📜 | `function` |
| 💈 | `for` |
| 👉 | `let` |
| 🙇 | `;` |
| ➕ | `+` |
| ➖ | `-` |
| ✖️ | `*` |
| ➗️ | `/` |
| 🍕️ | `%` |
| 🤝 | `===` |
| ⏮️ | `<=` |
| ⏪ | `<` |
| ⏩ | `>` |
| ⏭️ | `>=` |
| 🎂 | `++` |
| 🕳️ | `void` |
| 📰 | `string` |
| 📊 | `number` |
| ☯️ | `boolean` |

### Additional Syntaxes

| Syntax | Meaning |
| ------ | ------- |
| `‼️ expr` | Converts given `expr` to a Boolean. |

### Braille Numeric Literal

EmojiScript supports **Braille Numeric Literals** for specifying integers in base-256 system, using Braille characters (⠀, ⠁, ⠂, ⠃, ..., ⣾, ⣿).

Examples:

| Braille Syntax | Resulting Number |
| -------------- | ---------------- |
| ⠀ | 0 |
| ⠃ | 3 |
| ⣿ | 255 |
| ⠃⣨ | 1000 |


## Express Yourself with Code.

EmojiScript supports all skin tones and genders available as emoji.

🤷🏻‍♂️🤷‍♂️🤷🏼‍♂️🤷🏽‍♂️🤷🏾‍♂️🤷🏿‍♂️🤷🏻‍♀️🤷‍♀️🤷🏼‍♀️🤷🏽‍♀️🤷🏾‍♀️🤷🏿‍♀️

## License

All credit goes to Microsoft, founder of TypeScript.
