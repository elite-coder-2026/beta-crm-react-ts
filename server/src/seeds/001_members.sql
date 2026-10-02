INSERT INTO members (name, email, role, status) VALUES
  ('Ava Thompson',  'ava@example.com',  'Admin',     'active'),
  ('Liam Carter',   'liam@example.com', 'Sales',     'active'),
  ('Noah Patel',    'noah@example.com', 'Support',   'pending'),
  ('Mia Rodriguez', 'mia@example.com',  'Marketing', 'inactive')
ON CONFLICT (email) DO NOTHING;
