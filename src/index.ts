import { Client, Events, GatewayIntentBits } from "discord.js";
import { slashCommands } from "./commands.js";
import { env } from "./env.js";
import { fetchMinecraftStatus } from "./mcsrvstat.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, async (readyClient) => {
  await readyClient.application.commands.set(slashCommands);
  console.log(`Discord app ready: ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "mcstatus") {
    await interaction.deferReply();

    try {
      const status = await fetchMinecraftStatus(env.MINECRAFT_IP);

      if (!status.online) {
        await interaction.editReply(`${env.MINECRAFT_IP} is offline.`);
        return;
      }

      const { online, max, list } = status.players;

      let content = `Players: ${online}/${max}`;
      if (list && list.length > 0) {
        content += `\n\`\`\`\n${list.join("\n")}\n\`\`\``;
      }

      await interaction.editReply(content);
    } catch (error) {
      console.error(error);
      await interaction.editReply("Failed to fetch Minecraft server status.");
    }
  }
});

await client.login(env.DISCORD_TOKEN);
