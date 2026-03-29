FROM node@sha256:cf38e1f3c28ac9d81cdc0c51d8220320b3b618780e44ef96a39f76f7dbfef023

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 3000

CMD ["npx", "http-server", "-o", "landPage.html", "-p", "3000", "-a", "0.0.0.0"]
