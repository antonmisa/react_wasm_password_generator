## React wasm password generator

This is a showcase of React page with wasm binding rust password generation library (https://github.com/antonmisa/rust_password). Online password generation with different 3 passwords.

## Installation npm
```
npm install @antonmisa/rust-password-wasm --save
```

## Usage

```nodejs
import * as wasm from "rust-password-wasm";

export function calculate(length, num, spec, noUpper, allowRepeat) {
    const retval = wasm.get_next(length, num, spec, noUpper, allowRepeat);
}

export function calculate() {
    const retval = wasm.get_default();
}
```

## License

This code is licensed under the MIT license.
