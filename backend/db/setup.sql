-- cockroach db supported pgsql commands for initial setup

CREATE DATABASE IF NOT EXISTS mern_chat_app;
USE mern_chat_app;

CREATE TABLE IF NOT EXISTS users(user_email TEXT PRIMARY KEY, user_password text NOT NULL, added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);



INSERT INTO users(user_email, user_password) VALUES ($1, $2) --CREATE NEW USER
INSERT INTO messages(sender, receiver, text_message) VALUES($1, $2, $3) --CREATE NEW MESSAGE
SELECT * FROM users WHERE user_email = $1 AND user_password = $2 --get users as per credentials
SELECT DISTINCT sender, receiver, sent_at FROM messages WHERE sender = $1 OR receiver = $2 ORDER BY sent_at DESC; 
SELECT message_id, sender, reveiver, text_message, sent_at FROM messages WHERE sender = $1 AND reveiver = $2 --fetch all chats history from the sender to the specific receiver