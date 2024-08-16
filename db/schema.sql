-- Drop the database named 'blog_db' if it already exists.
-- This ensures that if the database exists, it is removed before creating a new one.
DROP DATABASE IF EXISTS blog_db;

-- Create a new database named 'blog_db'.
-- This command initializes a new, empty database with the specified name.
CREATE DATABASE blog_db;

-- Connect to the newly created database 'blog_db'.
-- The \c command is used to switch the database context in PostgreSQL.
-- After this command, all subsequent operations will be performed on 'blog_db'.
\c blog_db;
