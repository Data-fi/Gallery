const faker = require('faker');
const fs = require('fs');

const writeListings = fs.createWriteStream('mongoListings.json'); 

function write10MillionListings(writer, encoding, callback) {  //callback is the writer ran
  let counterListings = 10000000 //listing
  let listing_id = 1;
  let photo_id = 1; //to increment the ids
  function write() { //YOU'RE DEFINING IT
    let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
    do { 
      if (listing_id% 100000===0) {
        console.log((listing_id/10000000 * 100) + '%');
      }
      const data = {
        listing_id: listing_id,
        photos: [
          {
            photo_id: photo_id++,       //keys are strings so it'll know not to puy in num, value are variables
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       //keys are strings so it'll know not to puy in num, value are variables
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       //keys are strings so it'll know not to puy in num, value are variables
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       //keys are strings so it'll know not to puy in num, value are variables
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          },
          {
            photo_id: photo_id++,       //keys are strings so it'll know not to puy in num, value are variables
            photoURL: faker.image.nature(),
            caption: faker.lorem.sentences()
          }
        ]
      }
      counterListings--;
      listing_id++;
      let dataString = JSON.stringify(data);

      if (counterListings === 0) { //last time!
        writer.write(dataString, encoding, callback); 
      } else {
        ok = writer.write(dataString, encoding); //resume writing more
      }
    }

  while (counterListings > 0 && ok);
    if (counterListings > 0) {
      writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
    }
  }
write()
}
//While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

write10MillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
});

console.log('=====Data generated Mongo2 ====ç=')