import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { config } from './config.js';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(config().BOT_TOKEN);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('messageCreate', function (message) {
  console.log(message.content);
});

client.on('messageCreate', function (message) {
  // to reply after user asked
  if (message.author.bot) return;
  message.reply({ content: 'Hello From Bot' });
});

const commands = [
  {
    name: config().commands.youtube,
    description: 'Gives info link youtube',
  },
  {
    name: config().commands.tiktok,
    description: 'Gives info link tiktok',
  },
];

client.on('interactionCreate', async (interaction) => {
  // to reply after interaction with (/)
  const { commands } = config();
  if (!interaction.isChatInputCommand()) return;
  switch (interaction.commandName) {
    case commands.youtube:
      await interaction.reply('https://www.youtube.com/');
      return;
    case commands.tiktok:
      await interaction.reply('https://www.tiktok.com/');
      return;
    default:
      break;
  }
});

try {
  console.log('Started refreshing application (/) commands.');
  await rest.put(Routes.applicationCommands(config().CLIENT_ID), {
    body: commands,
  });
  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error('error', error);
}

client.login(config().BOT_TOKEN);
