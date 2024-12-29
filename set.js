const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0l4UjVWQ0haTmZJQ1cyMVFvaGgvWGZUMU5XM2pzN0lFODF4MnNMZVdtbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZW5lZTg5bFdtdGNKU1lISzZnMjZrYk9vTm5ERldMcHJZZ25ONHQ2enNqbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTNYZldsT2FpQTgyRmg0YlR6SjhDRzhYdVhPMFlaUEVzNUlZNXlIMTB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzOU4ySVRhYkVuWVBhTVFDNDNtS2pUZ2tXSXB4R1V2Z1o2cU5SV0JvM3pVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVQbEZlOTArUnFEUEdZYTgraXZaYmdkenhpQ2lIb0xTRUFyTXd0M0RNR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVZQ1BuQ2VzcXBDdHJBeGhMamFwZnd6YkR4MVlwVkNqSTZIbkRGaENPUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01YNjJzL0w4M1BFYjhzRDhTY0pXNEs4V2dFZk1mSjhqUmpka3JNZE8wVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUjJTNkF3eGFlNlQzK2FGRjEzSnF2WUJFUzM0WUczRHlvREs0WkJhd3ZCbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZROXY5L2ZVSW1pbys4cUd1NzJlejdMUlZFbE55b0puSGJ0VXJQZUxkaWg4bDdNOUFrdnpTM3RZS0dLUUQ1TTExL1hoRFpPWXYrMEs4VmFVWDl6N2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiJ5YktTME9NanZ2UTVBeUtnRFBCcXF0K0hnWFU0U3RJeDd4YU5xWWhFTDFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5MjFQRzQ2NFJhbVA5NGM3WWtpaWdnIiwicGhvbmVJZCI6IjlkNWEyNmQ3LTc5MGUtNGM1MC05YzUyLTA3ZmMxMmZjY2E1NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0cHkrQkQyVmNtaXh0bENzUjBSQnRVY2xYTnM9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVheWdFOTlyTFFtaGJLdVBCOFI0TmN2V05UWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0luRjZvQURFS2lweGJzR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNpb3gwbHBWRTVGRTI2S0kzeXFDeFRDWEpMVjk3N1I5YXNadDdnK1BKd2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImV3U3VjTEg2OWQyb1ZiR3VCRFgxSEs0MVpTL0ZNNmpSUU5PZTFZTzYxdEIrbjExZUJCY3FpMUlRbWpUb3dVbWNBeit3NGFkckVTZE53Wi9tVWh5cUFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSUzc2azB5SCtNNzN4N3FqWm9SWXVCWFhtVVhzVE5jWm5yd1RkQ3BLVHo2ZWMxcGY0MVVDTE84MUZlcHZQclR1SXdMYWVlN1VsdlNsMUZnVHprQ05qQT09In0sIm1lIjp7ImlkIjoiOTQ3Njg4MDY4NjU6NThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiWCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc2ODgwNjg2NTo1OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiSXFNZEphVlJPUlJOdWlpTjhxZ3NVd2x5UzFmZSswZldyR2JlNFBqeWNJIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1NDgwNDkxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxIWiJ9',
    PREFIXES: (process.env.PREFIX || '').split('.').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "zeeker",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94768806865",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Asia/Colombo',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
