FROM node:14

WORKDIR /usr/app

COPY package.json .

RUN npm i --quiet

COPY . .

RUN npm install pm2 -g

RUN pm2 install pm2-logrotate

RUN pm2 set pm2-logrotate:max_size 5M

EXPOSE 3300

CMD ["pm2-runtime", "src/index.js", "--name", "mazola_api", "--time"]