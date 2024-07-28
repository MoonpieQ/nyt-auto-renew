FROM node:21

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright
RUN npx playwright install-deps chromium

# Copy script
COPY script.js .

# Run the script
CMD ["node", "script.js"]