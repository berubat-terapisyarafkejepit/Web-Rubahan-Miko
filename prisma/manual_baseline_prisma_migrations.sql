-- Baseline when Prisma migrate commands hit advisory-lock timeouts on Neon pooler.
-- Run once after prisma db execute applied init + seed SQL.

CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" VARCHAR(36) PRIMARY KEY NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "finished_at" TIMESTAMP,
    "migration_name" VARCHAR(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMP,
    "started_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "_prisma_migrations" (
    "id",
    "checksum",
    "finished_at",
    "migration_name",
    "logs",
    "rolled_back_at",
    "started_at",
    "applied_steps_count"
)
SELECT
    gen_random_uuid()::text,
    '50085857f6f56888f0a10d5b08fc9323648ba53908ad582f80f6d0bc43df3512',
    NOW(),
    '20260328101256_init',
    NULL,
    NULL,
    NOW(),
    1
WHERE NOT EXISTS (
    SELECT 1 FROM "_prisma_migrations" WHERE "migration_name" = '20260328101256_init'
);

INSERT INTO "_prisma_migrations" (
    "id",
    "checksum",
    "finished_at",
    "migration_name",
    "logs",
    "rolled_back_at",
    "started_at",
    "applied_steps_count"
)
SELECT
    gen_random_uuid()::text,
    '1100a787944468a72dffb55300a6c6c5ab049e4e608d99234f9c9e5630aaf811',
    NOW(),
    '20260425103300_seed_admin_login',
    NULL,
    NULL,
    NOW(),
    1
WHERE NOT EXISTS (
    SELECT 1 FROM "_prisma_migrations" WHERE "migration_name" = '20260425103300_seed_admin_login'
);
