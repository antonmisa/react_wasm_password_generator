import * as wasm from "@antonmisa/rust-password-wasm";

export default function calculate(state) {
    const retval = wasm.get_next(state.length, state.num, state.spec, state.noUpper, state.allowRepeat);
    return retval;
}