"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const spinner_class_1 = require("./spinner.class");
const ai_class_1 = require("./ai.class");
const path_1 = __importDefault(require("path"));
const risk_constant_1 = require("../constants/risk.constant");
class Terminal {
    constructor(term, shell) {
        this.term = term;
        this.shell = path_1.default.basename(shell);
        this.setEvents();
    }
    clearLine() {
        this.term.write('\x1b[2K\r');
    }
    ;
    backspace() {
        this.term.write('\b \b');
    }
    ;
    pad(n) {
        for (let i = 0; i < n; i++) {
            this.term.write(' ');
        }
    }
    ;
    unpad(n) {
        for (let i = 0; i < n; i++) {
            this.backspace();
        }
    }
    ;
    paste(text) {
        this.term.paste(text);
    }
    write(text) {
        this.term.write(text);
    }
    showSpinner() {
        this.spinner = new spinner_class_1.Spinner(this);
    }
    hideSpinner() {
        this.spinner.stop();
    }
    getLine() {
        const lineNumber = this.term.buffer.active.cursorY + this.term.buffer.active.baseY;
        return this.term.buffer.active.getLine(lineNumber).translateToString(true);
    }
    getInput() {
        return this.getLine().replace(this.shellPrompt, '').trim();
    }
    getCommand() {
        return this.getInput().replace('#', '').trim();
    }
    isAICommand(input) {
        return input[0] === '#';
    }
    sendAIRequest(input) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.showSpinner();
                const result = yield ai_class_1.AI.sendRequest(this.shell, input);
                const risk = (_a = risk_constant_1.RISK_DESCRIPTION[result.risk]) === null || _a === void 0 ? void 0 : _a.replace('%s', result.risk_description);
                this.hideSpinner();
                if (risk) {
                    this.clearLine();
                    this.term.write(`${risk}`);
                    this.term.paste(`\r`);
                }
                this.paste(result.command);
            }
            catch (error) {
                this.hideSpinner();
                this.clearLine();
                this.term.write(`\x1b[31mThere was an error executing the AI command.\x1b[0m`);
                this.term.paste(`\r`);
            }
        });
    }
    setShellPrompt() {
        if (!this.shellPrompt) {
            this.shellPrompt = this.getLine().slice(0, -1);
        }
    }
    setEvents() {
        this.term.onData(() => {
            this.setShellPrompt();
        });
        this.term.onKey(({ key }) => {
            if (key === '\r') {
                if (this.isAICommand(this.getInput())) {
                    this.sendAIRequest(this.getCommand());
                }
            }
        });
    }
}
exports.Terminal = Terminal;
