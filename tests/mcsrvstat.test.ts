import { test } from "vitest";
import { fetchMinecraftStatus } from "../src/mcsrvstat.js";

test("fetchMinecraftStatus", async () => {
  const _ = await fetchMinecraftStatus("hypixel.net");
});
