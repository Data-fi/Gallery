const faker = require('faker');
const fs = require('fs');
const seed = require('./seedHelpers.js')
// const zlib = require('zlib');

const writePhotos = fs.createWriteStream('./database/generated_data/photos.csv'); //saves the file handle created, you are saving the data from this string to a csv file
writePhotos.write('Id,Photo,Caption\n', 'utf8'); //coloumn headings. language 
//you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

function write100MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
  let i = 100 // 100000000
  let id = 0; //to increment the ids
  function write() { 
    let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
    do {
      i -= 1;
      photo_id += 1;
      const photo = faker.image.city();
      const caption = faker.lorem.sentences();
      const listing_id = seed.getRandomInt(1,100)
      const data = `${photo_id},${photo},${caption},${listing_id}\n`;
      if (i === 0) { //when c
        writer.write(data, encoding, callback);   //this is NOT the write function you are in but a JAVASCRIPT method.
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding); //??????????
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

write100MillionPhotos(writePhotos, 'utf-8', () => {
  writePhotos.end();
});

console.log("data scripting Photos done")


const writeListings = fs.createWriteStream('./database/generated_data/listings.csv'); //saves the file handle created, you are saving the data from this string to a csv file
writeListings.write('Id\n', 'utf8'); //coloumn headings. language 
//you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

function write10MillionListings(writer, encoding, callback) {  //callback is the writer ran
  //let i = 100000000;
  let i = 100 // count down
  let id = 0; //to increment the ids
  function write() { 
    let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
    do {
      i -= 1;
      id += 1;
      const data = `${id}\n`;
      if (i === 0) { //when c
        writer.write(data, encoding, callback);   //this is NOT the write function you are in but a JAVASCRIPT method.
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding); //??????????
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

write10MillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
});

console.log("data scripting Listings done")