FROM node:argon

RUN mkdir -p /usr/src/website

COPY . /usr/src/website

RUN ./usr/src/website/npm install

# replace this with your application's default port
EXPOSE 8888

CMD['npm', 'start']