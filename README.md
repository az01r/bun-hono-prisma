To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

Stack

Bun: Ultra-fast runtime and package manager.

Hono: Web Framework, it provides the routing and middleware layer.

Prisma: Handles your database schema, migrations, and ORM queries.

Zod: Validates incoming request data (body, params, query).


Prisma migration

```sh
docker compose exec app bunx prisma migrate dev --name init
```
