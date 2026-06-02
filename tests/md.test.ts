import { expect, test } from "vitest";
import { md } from "../src/md.js";

test("MarkdownBuilder builds markdown lines", () => {
  const markdown = md()
    .add("# Server Status")
    .addCodeBlock("online: true", "yaml")
    .toString();

  expect(markdown).toBe("# Server Status\n```yaml\nonline: true\n```");
});
