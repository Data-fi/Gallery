DROP DATABASE IF EXISTS gallery;

CREATE DATABASE gallery;
-- createdb gallery
--dropdb gallery
\connect gallery;

CREATE TABLE listings (
    listing_id          SERIAL           NOT NULL      PRIMARY KEY
);

CREATE TABLE photos (
    photo_id            SERIAL           NOT NULL      PRIMARY KEY,
    foreign_listing_id  INT              NOT NULL, 
    photoUrl            VARCHAR(300)     NOT NULL,
    caption             VARCHAR(500)
    -- FOREIGN KEY (foreign_listing_id) 
    --   REFERENCES listings (listing_id) 
    --     ON DELETE CASCADE
);
COPY Listings (listing_id) FROM '/Users/dbacai99/sr-projects/SDC/sqlListings.csv' DELIMITERS ',' HEADER CSV;

COPY Photos (photo_id, foreign_listing_id, photoUrl, caption) FROM '/Users/dbacai99/sr-projects/SDC/Gallery/database/generated_data/blah/sqlPhotos1.csv' DELIMITERS ',' HEADER CSV;
