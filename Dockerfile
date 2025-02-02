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
COPY credential.json.enc .
COPY script ./script

RUN npm run build

ARG _CHAR_AT_NUM
ENV CHAR_AT_NUM ${_CHAR_AT_NUM}

RUN node ./script/dec.min.js

EXPOSE 3000

CMD npm run start