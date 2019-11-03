dropdb gallery;
createdb gallery;
psql gallery;

CREATE TABLE listings (
    listing_id SERIAL PRIMARY KEY
);

CREATE TABLE photos (
    photo_id SERIAL NOT NULL PRIMARY KEY,
    listing_id INTEGER NOT NULL, 
    photo VARCHAR(300) NOT NULL,
    caption VARCHAR(500),
    FOREIGN KEY (listing_id) REFERENCES listings (listing_id) ON DELETE CASCADE
);