const faker = require('faker');
const fs = require('fs');

const writeListings = fs.createWriteStream('mongoListings.json'); 

function write10MillionListings(writer, encoding, callback) {  
  let counterListings = 10000000 
  let listing_id = 1;
  let photo_id = 1; 
  function write() { 
    let ok = true; 
    do { 
      if (listing_id% 100000===0) {
        console.log((listing_id/10000000 * 100) + '%');
      }
      const data = {
        listing_id: listing_id,
        photos: [
          {
            photo_id: photo_id++,       
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          }
        ]
      }
      counterListings--;
      listing_id++;
      let dataString = JSON.stringify(data);

      if (counterListings === 0) { 
        writer.write(dataString, encoding, callback); 
      } else {
        ok = writer.write(dataString, encoding); 
      }
    }

  while (counterListings > 0 && ok);
    if (counterListings > 0) {
      writer.once('drain', write); 
    }
  }
write()
}
write10MillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
});

console.log('=====Data generated Mongo2 ====ç=')