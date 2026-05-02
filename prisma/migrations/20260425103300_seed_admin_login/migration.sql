INSERT INTO "Admin" ("id", "username", "password")
VALUES (
  'admin-seed-berubat',
  'admin',
  '$2b$12$1dP5jRZILkWdrNjcwrC1RetbhCtKxAdCAy8BOKv.CqRc30RCTluZy'
)
ON CONFLICT ("username")
DO UPDATE SET
  "password" = EXCLUDED."password";
