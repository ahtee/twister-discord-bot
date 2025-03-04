import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { env } from 'process';

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];  

const rest = new REST({ version: '10' }).setToken(env.BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
}

client.on(Events.ClientReady, readyClient => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
});
  
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});
  
client.login(env.BOT_TOKEN);