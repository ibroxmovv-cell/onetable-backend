CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE,
  phone VARCHAR UNIQUE,
  password_hash VARCHAR,
  name VARCHAR,
  role VARCHAR DEFAULT 'customer',
  preferred_language VARCHAR DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'pending',
  name_en VARCHAR, name_ru VARCHAR, name_uz VARCHAR,
  description_en TEXT, description_ru TEXT, description_uz TEXT,
  address VARCHAR, lat NUMERIC, lng NUMERIC,
  price_category VARCHAR,
  cuisine TEXT[],
  opening_hours JSONB,
  images JSONB,
  premium_until TIMESTAMPTZ,
  has_english_menu BOOLEAN DEFAULT false,
  tourist_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR,
  capacity INT,
  is_active BOOLEAN DEFAULT true,
  layout_meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  reservation_id UUID,
  gateway VARCHAR,
  amount INT,
  currency VARCHAR,
  status VARCHAR,
  transaction_reference VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  table_id UUID REFERENCES tables(id),
  date DATE,
  start_time TIME,
  end_time TIME,
  guests INT,
  status VARCHAR DEFAULT 'pending_payment',
  deposit_amount INT,
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  restaurant_id UUID REFERENCES restaurants(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  restaurant_id UUID REFERENCES restaurants(id),
  rating SMALLINT,
  text_en TEXT, text_ru TEXT, text_uz TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
