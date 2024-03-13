import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.messages = True
intents.guilds = True

bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'We have logged in as {bot.user}')

@bot.command()
async def ticket(ctx):
    guild = ctx.guild
    author = ctx.author

    # Create a new text channel for the ticket
    overwrites = {
        guild.default_role: discord.PermissionOverwrite(read_messages=False),
        author: discord.PermissionOverwrite(read_messages=True, send_messages=True)
    }
    channel = await guild.create_text_channel(f'ticket-{author.name}', overwrites=overwrites)

    # Send a message to the channel to let the user know their ticket has been created
    await channel.send(f'Hello {author.mention}, your ticket has been created. A moderator will be with you shortly.')

bot.run('BOT_TOKENİNİ_GİR')
