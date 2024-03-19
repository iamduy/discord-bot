export function config() {
  return {
    BOT_TOKEN: process.env.BOT_TOKEN || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    commands: {
      youtube: 'youtube',
      tiktok: 'tiktok',
    },
  };
}
