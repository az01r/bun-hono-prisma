# --- Base Stage ---
FROM oven/bun:latest AS base
WORKDIR /app
COPY package.json bun.lock ./
EXPOSE 3000

# --- Development Stage ---
FROM base AS development
RUN bun install --frozen-lockfile
COPY . .
CMD ["bun", "run", "dev"]

# --- Build Stage ---
FROM base AS build
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# --- Production Stage ---
FROM base AS production
RUN bun install --frozen-lockfile --production
COPY --from=build /app/dist ./dist
CMD ["bun", "run", "start"]