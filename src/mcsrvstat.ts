import { z } from "zod";

const statusSchema = z.object({
  online: z.boolean(),
  players: z
    .object({
      online: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
});

export type MinecraftStatus = z.infer<typeof statusSchema>;

export const fetchMinecraftStatus = async (
  ip: string,
): Promise<MinecraftStatus> => {
  const response = await fetch(
    `https://api.mcsrvstat.us/3/${encodeURIComponent(ip)}`,
  );

  if (!response.ok) {
    throw new Error(`mcsrvstat returned ${response.status}`);
  }

  return statusSchema.parse(await response.json());
};
