CREATE TABLE IF NOT EXISTS invoices (
  id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  number     text           NOT NULL UNIQUE,
  customer   text           NOT NULL CHECK (length(trim(customer)) > 0),
  email      text           NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  amount     numeric(12, 2) NOT NULL CHECK (amount > 0),
  status     text           NOT NULL DEFAULT 'draft'
             CHECK (status IN ('draft', 'sent', 'overdue', 'paid', 'void')),
  issue_date date           NOT NULL DEFAULT current_date,
  due_date   date           NOT NULL,
  CONSTRAINT invoices_due_after_issue CHECK (due_date >= issue_date)
);

CREATE INDEX IF NOT EXISTS invoices_status_idx ON invoices (status);
CREATE INDEX IF NOT EXISTS invoices_issue_date_idx ON invoices (issue_date);

-- Number every new invoice INV-<issue year>-<id>, e.g. INV-2026-0042.
CREATE OR REPLACE FUNCTION invoices_assign_number() RETURNS trigger AS $$
BEGIN
  NEW.number := 'INV-' || to_char(NEW.issue_date, 'YYYY') || '-' || lpad(NEW.id::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER invoices_assign_number
  BEFORE INSERT ON invoices
  FOR EACH ROW EXECUTE FUNCTION invoices_assign_number();
