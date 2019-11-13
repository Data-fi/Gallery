const faker = require('faker');
const fs = require('fs');

// //==================================================== ORIGINAL PHOTOS AND CAPTIONS DATA TO RECYCLE : START ===================================================================
// var photos1000 = [];
// const generateOriginalPhotos = (num) => {
//   for (var i = 0; i < num; i++) {
//     photos1000.push(faker.image.city());
//     console.log(i)
//   }
// }
// generateOriginalPhotos(1000);

// var captions1000 = [];
// const generateOriginalCaptions = (num) => {
//   for (var i = 0; i < num; i++) {
//     captions1000.push(faker.lorem.sentences());
//     console.log(i)
//   }
// }
// generateOriginalCaptions(1000);

// //==================================================== ORIGINAL PHOTOS AND CAPTIONS DATA TO RECYCLE : END ===================================================================


var counterListings = 2; //listings   //don't need one for photos bc it'll just increment until listings is done
var listing_id = 1; //listing always start at 1
var photo_id = 1
var containerOfListings = [];
var photos = [];

while (counterListings > 0) {
  for (var i = 0; i <2; i++) {
    photos.push({
      photo_id: photo_id,       //keys are strings so it'll know not to puy in num, value are variables
      photoURL: faker.image.nature(),
      caption: faker.lorem.sentences()
    });
    photo_id++;
  }
  containerOfListings.push({
    listing_id: listing_id,
    photos: photos
  })
  photos = []; //must reset this or else you're going to keep adding to same photo array hundreds of times. it won't even go to the next listing number
  counterListings--;
  listing_id++;
}
console.log(containerOfListings)

// var jsonContent = JSON.stringify(containerOfListings);
// fs.writeFile("mongoDataSeed.json", jsonContent, 'utf8', function (err) {
//   if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//   }
//   console.log('========MONGO JSON DATA GENERATION COMPLETED========')
// })


// sudo mongoimport -d gallery -c gallery --type json --jsonArray --file mongoJson.json