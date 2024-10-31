# PLPA BOT

**PLPA AIRDROP** :
🔔Mini App Airdrop PALAPA $PLPA

📌Listing 13 Nov

- Regist Bittime With Email : Here (https://www.bittime.com/register?inviteCode=QGLGAH)
- Join Palapa Mini App : Start Bot (https://t.me/plpa_tap_to_earn_bot/PLPATapTapHero?startapp=ELEHEAZQQH)
- Click Profile
- Complete Task
- TapTap 

- **Done**

## Join My Telegram Channel

Join here
[**JOIN**](https://t.me/AirdropInsiderID).

## Prerequisite

- Git
- Node JS
- TELEGRAM_APP_ID & TELEGRAM_APP_HASH Get it from [Here](https://my.telegram.org/auth?to=apps) (REQUIRED IF YOU WANT USE SESSIONS)

## BOT FEATURE

- Multi Account With Proxy Support
- Support Telegram Sessions and Telegram Query (Query May Expired)
- Auto Complete Some Misisons
- Auto Tap

## Setup & Configure BOT

### Linux & MAC OS

1. clone project repo
   ```
   git clone https://github.com/airdropinsiders/PLPA-Bot.git
   ```
   and cd to project dir
   ```
   cd PLPA-Bot
   ```
2. Run
   ```
   npm install && npm i telegram@2.22.2 && npm run setup
   ```
3. Run
   ```
   mkdir -p accounts
   ```
4. (If You Use Telegram Sessions) To configure the app Configure APP ID and Hash, run
   ```
   nano config/config.js
   ```
   and add your telegram app id and hash there.
5. (If You Use Proxy) To configure the app, run
   ```
   nano config/proxy_list.js
   ```
   and add your proxy list there, use http proxy
6. to start the app run
   ```
   npm run start
   ```

### Windows

1. Open your `Command Prompt` or `Power Shell`.
2. Clone project repo
   ```
   git clone https://github.com/airdropinsiders/PLPA-Bot.git
   ```
   and cd to project dir
   ```
   cd PLPA-Bot
   ```
3. Run
   ```
   npm install && npm i telegram@2.22.2 && npm run setup
   ```
4. Navigate to `PLPA-Bot` directory.
5. Make new folder named `accounts`.
6. If you want to use Telegram Session, Navigate to `config` folder configure APP ID and HASH on `config.js`.
7. If you want to use Proxy, Open and configure `proxy_list.js`.
8. Now back to the `PLPA-Bot` folder
9.  To start the app open your `Command Prompt` or `Power Shell` again and run
    ```
    npm run start
    ```

## Setup Accounts

1. Run bot `npm run start`
2. Choose option `1` to create account
3. Choose account type `Query` or `Sessions`
4. `Session` Type
   1. Enter Account Name
   2. Enter your phone number starting with countrycode ex : `+628xxxxxxxx`
   3. You will be asked for verification code and password (if any)
   4. Start The bot Again after account creation complete
5. `Query` Type
   1. Enter Account Name
   2. Enter Telegram Query (you can get query by opening bot app on browser > inspect element > storage / application > session storage > telegram init params > copy tg web app data value)
   3. Start The bot Again after account creation complete
6. after bot started choose option 3 start bot

## Session Troubleshoot

If you asked to enter phone number again after sessions creation, it mean session not initialized correctly, try to delete the created sessions.

Example Case

- example you already have 1 session (sessionA) and all good when you run bot. After that you create another session, but when you run bot, the bot asked to enter phone number again, so the problem is on (sessionB), to fix it just remove the `accounts/sessionB` folder and re create it or just delete all folder inside `accounts` directory with prefix `sessions-`.

## Query Troubleshoot

if your bot get eror, with some error code `401` it mean your query expired, go get new query and run bot again and choose option `4` for query modification.

## Note

Don't use bot with `session` type if you using telegram account that bought from someone because it can make your telegram account deleted. instead of using `session` type, use `query` type.

This bot can use Telegram Query and Telegram Sessions. if you want to use sessions, and ever use one of my bot that use telegram sessions, you can just copy the `accounts` folder to this bot. Also for the telegram APP ID and Hash you can use it from another bot. If you want to use Telegram Query, get your query manually.

if you got error `Invalid ConstructorId` try to run this `npm i telegram@2.22.2`

## CONTRIBUTE

Feel free to fork and contribute adding more feature thanks. To get original unencrypted code just Join my channel and DM me, original code (index.js and src folder) are Obfuscated during build