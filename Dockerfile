FROM node:argon

ENV appDir /usr/src/website

RUN mkdir -p ${appDir}

COPY . ${appDir}

WORKDIR ${appDir}

RUN ./alt/global-setup/install-global-prod-dep.sh

RUN npm install

RUN npm run build4Production

# replace this with your application's default port
EXPOSE 8888

CMD ["npm", "run", "run4Production"]

