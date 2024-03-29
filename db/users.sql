-- To allow us to utilize the UUID:
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id UUID DEFAULT uuid_generate_v4() UNIQUE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_pwd VARCHAR(255) NOT NULL,
    user_access_token VARCHAR(1023),
    user_refresh_token VARCHAR(255),
    seller_id VARCHAR(255),
    PRIMARY KEY (user_id)
);
