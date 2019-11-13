module.exports = {
  getRandomInt: function(min, max) {
    return min + Math.floor(Math.random() * Math.floor(max-min));
  }
  // fasterRandomForListings: function (numOfListings, numOfPhotos) {  //number of listings you have in your db, right now it's just 2
  //   const i = numOfListings;
  //   const obj = {}; //objs aren't ordered so it'll randomize itself
  //   const arrOfRandomListingIds =[];
  //   while (i > 0) {
  //     //just add in all numbers and then add to an arr obj with numb 1-10 random
  //     obj[toString(i)] = i;
  //     i++;
  //   }
  //   //only need 1 number to return for each photo's foreign key
  //   const j = numOfPhotos;
  //   while (numOfPhotos > 0) {
  //     arrOfRandomListingIds.push
  //   }
  //   Object.keys(obj)[0]
  //   }
  // },
  // randomNumberOfPhotos: function (num) {  //number of photos you're working with 900

  // }
}

