CREATE DATABASE amazon_clone;

CREATE TABLE product_categories(
    c_name VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    table_name VARCHAR(255) NOT NULL
);

COPY product_categories FROM 'C:\Users\Brook\Desktop\product_categories.csv' WITH CSV HEADER;



CREATE TABLE c_arts_crafts_and_sewing(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_automotive_parts_and_accessories(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_books(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_cds_and_vinyl(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_digital_music(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_electronics(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_handmade(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_home_and_kitchen(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_industrial_and_science(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);

CREATE TABLE c_tools_and_home_improvement(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    p_name VARCHAR(255) NOT NULL,
    img_1_path VARCHAR(255) NOT NULL,
    img_2_path VARCHAR(255),
    img_3_path VARCHAR(255),
    img_4_path VARCHAR(255),
    img_5_path VARCHAR(255)
);
