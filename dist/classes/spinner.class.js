"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
class Spinner {
    constructor(term) {
        this.term = term;
        this.chars = ['-', '\\', '|', '/'];
        this.index = 0;
        // Awkward hack to prevent the spinner from rendering too early.
        setTimeout(() => this.start(), 200);
    }
    start() {
        this.interval = setInterval(() => {
            if (this.index > 0) {
                this.term.backspace();
            }
            this.write();
        }, 100);
    }
    stop() {
        clearInterval(this.interval);
        this.term.backspace();
    }
    write() {
        const char = this.chars[this.index++ % this.chars.length];
        this.term.write(`${char}`);
    }
}
exports.Spinner = Spinner;
