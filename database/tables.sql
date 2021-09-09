CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

/*------------------------------- [CREATE USERS TABLE] -------------------------------*/

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "age" INT NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/*------------------------------- [CREATE BOOKS TABLE] -------------------------------*/

CREATE TABLE "books" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "price" INT NOT NULL,
    "quantity" INT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    "deleted_at" TIMESTAMPTZ
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "books"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

/*------------------------------- [CREATE BOOKS SALES TABLE] -------------------------------*/

CREATE TABLE "book_sales" (
    "id" SERIAL PRIMARY KEY,
    "book_id" INT NOT NULL,
    "user_id" INT NOT NULL,
    "quantity" INT NOT NULL,
    "total_price" INT NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE "book_sales" ADD FOREIGN KEY ("book_id") REFERENCES "books"("id");
ALTER TABLE "book_sales" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id");