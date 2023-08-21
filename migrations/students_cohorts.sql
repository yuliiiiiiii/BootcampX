CREATE TABLE cohorts (
  id SERIAL PRIMARY KEY NOT NULL,
  -- NOT NULL means this field is mandentary
  name VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE CASCADE, 
  -- foreign key with cascade delete means if a recode in the parent table is deleted, then the corresponding records in this child tabel will automatically be deleted
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(32),
  github VARCHAR(255),
  start_date DATE,
  end_date DATE
);
