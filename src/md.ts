type MarkdownBuilder = {
  add(line: string): MarkdownBuilder;
  addCodeBlock(code: string, lang?: string): MarkdownBuilder;
  toString(): string;
};

export const md = (): MarkdownBuilder => {
  const lines: string[] = [];

  const api: MarkdownBuilder = {
    add(line) {
      lines.push(line);
      return api;
    },

    addCodeBlock(code, lang = "") {
      lines.push(`\`\`\`${lang}\n${code}\n\`\`\``);
      return api;
    },

    toString() {
      return lines.join("\n");
    },
  };

  return api;
};
