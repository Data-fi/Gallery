DROP DATABASE IF EXISITS gallery;
CREATE DATABASE gallery;
use gallery;

DROP 

CREATE TABLE listings (
    id    SERIAL      PRIMARY KEY
);


CREATE TABLE photos (
    photo_id     SERIAL        NOT NULL      PRIMARY KEY,
    listing_id   INT           NOT NULL, 
    photo        VARCHAR(300)  NOT NULL,
    caption      VARCHAR(500),
    FOREIGN KEY (listing_id) 
      REFERENCES listings (listing_id) 
        ON DELETE CASCADE
);