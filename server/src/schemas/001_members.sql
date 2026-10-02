CREATE TABLE IF NOT EXISTS members (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       text        NOT NULL CHECK (length(trim(name)) > 0),
  email      text        NOT NULL UNIQUE CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  role       text        NOT NULL CHECK (length(trim(role)) > 0),
  status     text        NOT NULL DEFAULT 'active'
             CHECK (status IN ('active', 'inactive', 'pending')),
  created_at timestamptz NOT NULL DEFAULT now()
);
