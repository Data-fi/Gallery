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


const writePhotos1 = fs.createWriteStream('./database/generated_data/sqlPhotos1.csv'); //is a writestream or just stream
//Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
//saves the file handle created, you are saving the data from this string to a csv file
writePhotos1.write('Photo_Id,foreign_listing_id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
//you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
  let i = 100000000
  // let j = 999 
  let j = 999
  let listing_id = 1;
  let photo_id = 0; //to increment the ids
  function write() { //YOU'RE DEFINING IT
    let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
    do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

      i -= 1;
      j = (i % 1000 === 0) ? 999 : j - 1;
      if (i%1000000 === 0) {
        console.log(i) //just for your recording
      } 
      // if (i%100 ===0) {
      //   listing_id++;
      // }//all the thousands are undefined.. so move this down to after listing is already used for the 1000 before incrementing
      //j=(j? j-1: 1000);
      
      photo_id += 1;
      const foreign_listing_id = listing_id //number to listings is less than number of photos
      const photoUrl = photos1000[j];
      const caption = captions1000[j];
      const data = `${photo_id},${foreign_listing_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
      if (i%10 ===0) {  //100M photos divide by 10M listings = 10 phtos per listing)
        listing_id++;
      }//all the thousands are undefined
      if (i === 0) { //last time!
        writer.write(data, encoding, callback); 
        // console.log(data)   //this is NOT the write function you are in but a JAVASCRIPT method.
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding); //resume writing more
        // console.log(data)  //??????????
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
    }
  }
write()
}
//While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

write10MillionPhotos(writePhotos1, 'utf-8', () => {
  writePhotos1.end();
});

console.log("data scripting Photos1 done")

// //==================================================== #2 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos2 = fs.createWriteStream('./database/generated_data/sqlPhotos2.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos2.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 1000 // 
//   let j = 99 
//   let photo_id = 10000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j = (i % 100 === 0) ? 99 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
     
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more

//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos2, 'utf-8', () => {
//   writePhotos2.end();
// });

// console.log("data scripting Photos2 done")

// //==================================================== #3 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos3 = fs.createWriteStream('./database/generated_data/sqlPhotos3.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos3.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 1000 // 
//   let j = 100 
//   let photo_id = 2000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j = (i % 1000 === 0) ? 100 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
  
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos3, 'utf-8', () => {
//   writePhotos3.end();
// });

// console.log("data scripting Photos3 done")

// //==================================================== #4 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos4 = fs.createWriteStream('./database/generated_data/sqlPhotos4.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos4.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 30000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos4, 'utf-8', () => {
//   writePhotos4.end();
// });

// console.log("data scripting Photos4 done")

// //==================================================== #5 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos5 = fs.createWriteStream('./database/generated_data/sqlPhotos5.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos5.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 40000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos5, 'utf-8', () => {
//   writePhotos5.end();
// });

// console.log("data scripting Photos5 done")

// //==================================================== #6 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos6 = fs.createWriteStream('./database/generated_data/sqlPhotos6.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos6.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 50000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos6, 'utf-8', () => {
//   writePhotos6.end();
// });

// console.log("data scripting Photos6 done")

// //==================================================== #7 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos7 = fs.createWriteStream('./database/generated_data/sqlPhotos7.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos7.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 60000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos7, 'utf-8', () => {
//   writePhotos7.end();
// });

// console.log("data scripting Photos7 done")


// //==================================================== #8 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos8 = fs.createWriteStream('./database/generated_data/sqlPhotos8.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos8.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 70000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos8, 'utf-8', () => {
//   writePhotos8.end();
// });

// console.log("data scripting Photos8 done")


// //==================================================== #9 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos9 = fs.createWriteStream('./database/generated_data/sqlPhotos9.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos9.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 80000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
      
//       if(i % 10000 === 0){
        
//       }
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos9, 'utf-8', () => {
//   writePhotos9.end();
// });

// console.log("data scripting Photos9 done")


// //==================================================== #10 FUNCTION TO GENERATE CSV DATA FOR PHOTOS : START ===================================================================
// const writePhotos10 = fs.createWriteStream('./database/generated_data/sqlPhotos10.csv'); //is a writestream or just stream
// //Writable streams are an abstraction for a destination to which data is written. https://nodejs.org/api/stream.html#stream_class_stream_writable
// //saves the file handle created, you are saving the data from this string to a csv file
// writePhotos10.write('Photo_Id,Photo,Caption\n', 'utf8'); //Foreign_Listing_Id//stream.write (which comes with fs after you create stream //coloumn headings. language 
// //you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

// function write10MillionPhotos(writer, encoding, callback) {  //callback is the writer ran
//   let i = 10000000 // 
//   let j = 1000 
//   let photo_id = 90000000; //to increment the ids
//   function write() { //YOU'RE DEFINING IT
//     let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
//     do {  //DO WHILE: DOES 1 ITERATION AND WHILE IS CONDITION FOR SUBSEQUENT ITERATIONS

//       i -= 1;
//       j= (i % 1000 === 0) ? 1000 : j - 1; //all the thousands are undefined
//       //j=(j? j-1: 1000);
//       photo_id += 1;
//       // const foreign_listing_id = seed.getRandomInt(1,100) //number to listings is less than number of photos
//       const photoUrl = photos1000[j];
//       const caption = captions1000[j];
//       const data = `${photo_id},${photoUrl},${caption}\n`;   //${foreign_listing_id}
//       if (i === 0) { //last time!
//         writer.write(data, encoding, callback); 
//       } else {
// // see if we should continue, or wait
// // don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding); //resume writing more
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
// // had to stop early!
// // write some more once it drains
//       writer.once('drain', write); //If a call to stream.write(chunk) returns false, the 'drain' event will be emitted when it is appropriate to resume writing data to the stream.
//     }
//   }
// write()
// }
// //While a stream is not draining, calls to write() will buffer chunk, and return false. Once all currently buffered chunks are drained (accepted for delivery by the operating system), the 'drain' event will be emitted. It is recommended that once write() returns false, no more chunks be written until the 'drain' event is emitted. 

// write10MillionPhotos(writePhotos10, 'utf-8', () => {
//   writePhotos10.end();
// });

// console.log("data scripting Photos10 done")


//==================================================== FUNCTION TO GENERATE CSV DATA FOR PHOTOS : END ===================================================================

//==================================================== FUNCTION TO GENERATE CSV DATA FOR LISINGS : START ===================================================================
const writeListings = fs.createWriteStream('./database/generated_data/sqlListings.csv'); 
writeListings.write('Id\n', 'utf8'); //coloumn headings. language 
//you can create you data as JSON objects and convert them to CSV with any number of npm modules bit it's easier to create the data as comma separated values from the get-go

function write10MillionListings(writer, encoding, callback) {  //callback is the writer ran
  //let i = 100000000;
  let i = 10000000 // count down
  let listing_id = 0; //to increment the ids
  function write() { 
    let ok = true; //ok to write because buffer/memory hasn't reached highWaterMark yet
    do {
      
      i -= 1;
      listing_id += 1;
      const data = `${listing_id}\n`;
      if (i === 0) { //when c
        writer.write(data, encoding, callback); 
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
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

//==================================================== FUNCTION TO GENERATE CSV DATA FOR LISTINGS : END ===================================================================

