npm install

concurrently --raw "tsc -w" "pm2 start pm2.json --no-daemon"
