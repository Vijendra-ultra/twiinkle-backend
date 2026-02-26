import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    host: "localhost",
    port: 5432,
    user: "app_user",
    password: "BahubaliJaiHo@8792239654",
    database: "app_db",
    ssl: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
