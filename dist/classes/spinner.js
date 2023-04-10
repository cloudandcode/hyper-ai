"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spinner = void 0;
const terminal_1 = require("../terminal");
class Spinner {
    constructor() {
        this.chars = ['-', '\\', '|', '/'];
        this.index = 0;
        this.term = terminal_1.getTerminal();
        // Awkward hack to prevent the spinner from rendering too early.
        setTimeout(() => this.start(), 200);
    }
    start() {
        this.interval = setInterval(() => {
            if (this.index > 0) {
                terminal_1.backspace();
            }
            this.write();
        }, 100);
    }
    stop() {
        clearInterval(this.interval);
        terminal_1.backspace();
    }
    write() {
        const char = this.chars[this.index++ % this.chars.length];
        this.term.write(`${char}`);
    }
}
exports.Spinner = Spinner;
