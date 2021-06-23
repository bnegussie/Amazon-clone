CREATE DATABASE amazon_clone;

CREATE TABLE product_categories(
    c_name VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    c_name_in_db VARCHAR(255) NOT NULL
);

COPY product_categories FROM 'C:\Users\Brook\Desktop\product_categories.csv' WITH CSV HEADER;


CREATE TABLE products(
    p_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    user_id UUID NOT NULL,
    seller_id VARCHAR(255) NOT NULL,
    p_brand_name VARCHAR(255) NOT NULL,
    p_title VARCHAR(255) NOT NULL,
    p_desc VARCHAR(255),
    p_price money NOT NULL,
    p_price_currency_symbol VARCHAR(10) NOT NULL,
    p_category VARCHAR(255) NOT NULL,
    p_available_quantities BIGINT NOT NULL,
    p_photo_1_path VARCHAR(255) NOT NULL,
    p_photo_1_public_path VARCHAR(255) NOT NULL,
    p_photo_2_path VARCHAR(255),
    p_photo_2_public_path VARCHAR(255),
    p_photo_3_path VARCHAR(255),
    p_photo_3_public_path VARCHAR(255),
    p_photo_4_path VARCHAR(255),
    p_photo_4_public_path VARCHAR(255),
    p_photo_5_path VARCHAR(255),
    p_photo_5_public_path VARCHAR(255),
    p_listing_created_date TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (p_category) REFERENCES product_categories(c_name)
);
