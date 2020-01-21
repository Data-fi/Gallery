const faker = require('faker');
const fs = require('fs');


var counterListings = 2; 
var listing_id = 1; 
var photo_id = 1
var containerOfListings = [];
var photos = [];

while (counterListings > 0) {
  for (var i = 0; i <2; i++) {
    photos.push({
      photo_id: photo_id,      
      photoURL: faker.image.nature(),
      caption: faker.lorem.sentences()
    });
    photo_id++;
  }
  containerOfListings.push({
    listing_id: listing_id,
    photos: photos
  })
  photos = []; 
  counterListings--;
  listing_id++;
}
console.log(containerOfListings)

