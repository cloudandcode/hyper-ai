import path from 'path';
import { Terminal as Xterm } from 'xterm';
import { Spinner } from './spinner.class';
import { AI } from './ai.class';
import { Response } from '../interfaces';
import { FUNNY_DESCRIPTION, RISK_DESCRIPTION } from '../constants/risk.constant';

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

  public writeLine(text: string): void {
    this.clearLine();
    this.term.write(`${text}`);
    this.term.paste(`\r`);
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

  private async sendRequest(input: string): Promise<void> {
    try {
      this.showSpinner();
      const response: Response = await AI.sendRequest(this.shell, input);
      this.hideSpinner();
      this.writeResponse(response);
    } catch (error) {
      this.hideSpinner();
      this.writeLine(`\x1b[31mThere was an error executing the AI command.\x1b[0m`);
    }
  }

  private writeResponse(response: Response): void {
    const riskDescription = RISK_DESCRIPTION[response.risk]?.replace('%s', response.comment);
    const funnyDescription = response.funny ? FUNNY_DESCRIPTION[0].replace('%s', response.funny_description) : '';
    let comment: string;

    if (!response.command) {
      comment = funnyDescription || riskDescription;
    } else if (riskDescription) {
      comment = riskDescription;
      if (response.risk >= 9) {
        comment += '\x1b[31m Delete the notice to execute at your own risk.\x1b[0m';
      }
    } else if (funnyDescription) {
      comment = funnyDescription;
    }

    if (comment) {
      this.writeLine(`${comment}`);
    }
    if (response.command) {
      this.paste(response.command);
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
          this.sendRequest(this.getCommand());
        }
      }
    });
  }
}