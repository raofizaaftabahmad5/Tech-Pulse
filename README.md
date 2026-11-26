# Tech Pulse

Tech blog with a public comment section (Node + Express).

## Run locally
    npm install
    npm start        # http://localhost:3000

## Deploy
1. Push this folder to a GitHub repo.
2. On render.com: New > Web Service > connect the repo.
3. Build command: `npm install`  Start command: `npm start`
4. Open the URL Render gives you.

Note: Render's free plan wipes local files on restart/redeploy, so comments reset.
To keep them, add a Render Disk and set env var DATA_FILE=/data/comments.json
(or move comments to a free database later).

Wix cannot run Node servers. Host on Render, then (optional) connect a domain you bought on Wix.
Edit the articles in public/index.html. Check facts before publishing.
