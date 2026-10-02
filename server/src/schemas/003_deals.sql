CREATE TABLE IF NOT EXISTS deals (
  id            integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company       text           NOT NULL CHECK (length(trim(company)) > 0),
  owner_id      integer        NOT NULL REFERENCES members (id) ON DELETE RESTRICT,
  source        text           NOT NULL
                CHECK (source IN ('Website', 'Referral', 'Outbound', 'Events', 'Partners')),
  value         numeric(12, 2) NOT NULL CHECK (value >= 0),
  stage         text           NOT NULL DEFAULT 'lead'
                CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost')),
  lost_at_stage smallint       CHECK (lost_at_stage BETWEEN 0 AND 3),
  created_at    timestamptz    NOT NULL DEFAULT now(),
  closed_at     timestamptz
);

CREATE INDEX IF NOT EXISTS deals_owner_id_idx ON deals (owner_id);

-- Closing a deal (won/lost) stamps closed_at once; reopening clears it.
-- lost_at_stage is only kept on lost deals.
CREATE OR REPLACE FUNCTION deals_track_close() RETURNS trigger AS $$
BEGIN
  IF NEW.stage IN ('won', 'lost') THEN
    NEW.closed_at := COALESCE(
      CASE WHEN TG_OP = 'UPDATE' AND OLD.stage IN ('won', 'lost') THEN OLD.closed_at END,
      now()
    );
  ELSE
    NEW.closed_at := NULL;
  END IF;

  IF NEW.stage <> 'lost' THEN
    NEW.lost_at_stage := NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER deals_track_close
  BEFORE INSERT OR UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION deals_track_close();
