FROM node:lts-slim as prod

WORKDIR /app

COPY src/ /app/src
COPY static/ /app/static
COPY .eslintignore /app/.eslintignore
COPY .eslintrc.cjs /app/.eslintrc.cjs
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY postcss.config.js /app/postcss.config.js
COPY svelte.config.js /app/svelte.config.js
COPY tailwind.config.js /app/tailwind.config.js
COPY tsconfig.json /app/tsconfig.json
COPY vite.config.js /app/vite.config.js

RUN npm install

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev"]