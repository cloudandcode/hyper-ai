import { Terminal as Xterm } from 'xterm';
import { Spinner } from './spinner.class';
import { AI } from './ai.class';
import { Command } from '../interfaces';
import path from 'path';
import { RISK, RISK_DESCRIPTION } from '../constants/risk.constant';

export class Terminal {
  term: Xterm;
  shell: string;
  shellPrompt: string;
  spinner: Spinner;

  constructor(term: Xterm, shell: string) {
    this.term = term;
    this.shell = path.basename(shell);
    this.setEvents();
  }

  public clearLine(): void {
    this.term.write('\x1b[2K\r');
  };
  
  public backspace(): void {
    this.term.write('\b \b');
  };
  
  public pad(n: number): void {
    for (let i = 0; i < n; i++) {
      this.term.write(' ');
    }
  };
  
  public unpad(n: number): void {
    for (let i = 0; i < n; i++) {
      this.backspace();
    }
  };

  public paste(text: string): void {
    this.term.paste(text);
  }

  public write(text: string): void {
    this.term.write(text);
  }

  public showSpinner(): void {
    this.spinner = new Spinner(this);
  }

  public hideSpinner(): void {
    this.spinner.stop();
  }

  public getLine(): string {
    const lineNumber = this.term.buffer.active.cursorY + this.term.buffer.active.baseY;

    return this.term.buffer.active.getLine(lineNumber).translateToString(true);
  }

  public getInput(): string {
    return this.getLine().replace(this.shellPrompt, '').trim();
  }

  public getCommand(): string {
    return this.getInput().replace('#', '').trim();
  }

  private isAICommand(input: string): boolean{
    return input[0] === '#';
  }

  private async sendAIRequest(input: string): Promise<void> {
    try {
      this.showSpinner();
      const result: Command = await AI.sendRequest(this.shell, input);
      const risk = RISK_DESCRIPTION[result.risk]?.replace('%s', result.risk_description);

      this.hideSpinner();

      if (risk) {
        this.clearLine();
        this.term.write(`${risk}`);
        this.term.paste(`\r`);
      }

      this.paste(result.command);
    } catch (error) {
      this.hideSpinner();
      this.clearLine();
      this.term.write(`\x1b[31mThere was an error executing the AI command.\x1b[0m`);
      this.term.paste(`\r`);
    }
  }

  private setShellPrompt(): void {
    if (!this.shellPrompt) {
      this.shellPrompt = this.getLine().slice(0, -1);
    }
  }

  private setEvents(): void {
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