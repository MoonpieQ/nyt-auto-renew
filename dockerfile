FROM node:21

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright
RUN npx playwright install-deps chromium

# Copy script
COPY index.js .

# Set the entrypoint to the Node.js executable
ENTRYPOINT ["node", "index.js"]

# Default parameters
CMD ["email", "pwd", "code"]