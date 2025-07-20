FROM node:14.18.0 AS server-build


WORKDIR /root/
COPY client/build/ ./client/build/
COPY mam/ ./mam/

COPY atlas/ ./atlas/
COPY package*.json ./
COPY services/ ./services/
RUN  npm install
COPY server.js ./
EXPOSE  3080
CMD ["node"  , "server.js"]
#FROM nginx:alpine
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#WORKDIR /app/
#ADD certs /etc/nginx/certs
#COPY ssl /etc/nginx/certs
#EXPOSE 443
#EXPOSE 80
#WORKDIR /usr/share/nginx/html
