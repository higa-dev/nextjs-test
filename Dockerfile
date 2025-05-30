FROM 'node:latest'

WORKDIR /app

COPY package.json .
RUN npm install

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.js .
COPY postcss.config.js .

RUN npm run build

EXPOSE 3000

CMD npm run start