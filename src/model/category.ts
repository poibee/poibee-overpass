export class Category {
  constructor(public readonly key: string, public readonly osmCategory: string, public readonly osmValues: string[]) {}

  public query(): string {
    if (this.osmValues.length === 0) {
      return `"${this.osmCategory}"`;
    } else if (this.osmValues.length === 1) {
      return `"${this.osmCategory}"="${this.osmValues[0]}"`;
    }
    return `"${this.osmCategory}"~"${this.osmValues.join('|')}"`;
  }
}
