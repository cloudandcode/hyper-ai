import { Terminal } from './terminal.class';

export class Spinner {
  private interval: ReturnType<typeof setInterval>;
  private chars = ['-', '\\', '|', '/'];
  private index = 0;

  constructor(private readonly term: Terminal) {
    // Awkward hack to prevent the spinner from rendering too early.
    setTimeout(() => this.start(), 200);
  }

  public start(): void {
    this.interval = setInterval(() => {
      if (this.index > 0) {
        this.term.backspace();
      }
      this.write();
    }, 100);
  }

  public stop(): void {
    clearInterval(this.interval);
    this.term.backspace();
  }

  private write(): void {
    const char = this.chars[this.index++ % this.chars.length];
    this.term.write(`${char}`);
  }
}