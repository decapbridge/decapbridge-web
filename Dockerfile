FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN ./run build

FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/run ./run

EXPOSE 8080

CMD ["./run", "start"]
