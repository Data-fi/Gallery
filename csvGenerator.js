const faker = require('faker');
const fs = require('fs');
const seed = require('./seedHelpers.js')
// const zlib = require('zlib');


//==================================================== ORIGINAL PHOTOS AND CAPTIONS DATA TO RECYCLE : START ===================================================================
var photos1000 = [];
const generateOriginalPhotos = (num) => {
  for (var i = 0; i < num; i++) {
    photos1000.push(faker.image.city());
    // console.log(i)
  }
}
generateOriginalPhotos(1000); //1000

var captions1000 = [];
const generateOriginalCaptions = (num) => {
  for (var i = 0; i < num; i++) {
    captions1000.push(faker.lorem.sentences());
    // console.log(i)
  }
}
generateOriginalCaptions(1000);

//==================================================== ORIGINAL PHOTOS AND CAPTIONS DATA TO RECYCLE : END ===================================================================

//==================================================== #1 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================


const writePhotos1 = fs.createWriteStream('./database/generated_data/sqlPhotos1.csv'); 

writePhotos1.write('Photo_Id,foreign_listing_id,Photo,Caption\n', 'utf8'); 
function write10MillionPhotos(writer, encoding, callback) {  
  let i = 100000000
  // let j = 999 
  let j = 999
  let listing_id = 1;
  let photo_id = 0; 
  function write() { 
    let ok = true; 
    do { 
      i -= 1;
      j = (i % 1000 === 0) ? 999 : j - 1;
      if (i%1000000 === 0) {
        console.log(i) 
      } 
      photo_id += 1;
      const foreign_listing_id = listing_id 
      const photoUrl = photos1000[j];
      const caption = captions1000[j];
      const data = `${photo_id},${foreign_listing_id},${photoUrl},${caption}\n`;   
      if (i%10 ===0) {  
        listing_id++;
      }
      if (i === 0) { 
        writer.write(data, encoding, callback); 
      
      } else {
        ok = writer.write(data, encoding); 
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write); 
    }
  }
write()
}

write10MillionPhotos(writePhotos1, 'utf-8', () => {
  writePhotos1.end();
});

console.log("data scripting Photos1 done")


//==================================================== FUNCTION TO GENERATE CSV DATA FOR LISINGS : START ===================================================================
const writeListings = fs.createWriteStream('./database/generated_data/sqlListings.csv'); 
writeListings.write('Id\n', 'utf8'); 

function write10MillionListings(writer, encoding, callback) {  
  //let i = 100000000;
  let i = 10000000 
  let listing_id = 0; 
  function write() { 
    let ok = true; 
    do {
      
      i -= 1;
      listing_id += 1;
      const data = `${listing_id}\n`;
      if (i === 0) { 
        writer.write(data, encoding, callback); 
      } else {

        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {

      writer.once('drain', write);
    }
  }
write()
}

write10MillionListings(writeListings, 'utf-8', () => {
  writeListings.end();
});

console.log("data scripting Listings done")

//==================================================== FUNCTION TO GENERATE CSV DATA FOR LISTINGS : END ===================================================================

