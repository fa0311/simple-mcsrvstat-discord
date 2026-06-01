import { SlashCommandBuilder } from "discord.js";

export const slashCommands = [
  new SlashCommandBuilder()
    .setName("mcstatus")
    .setDescription("Show Minecraft server player count")
    .toJSON(),
];
