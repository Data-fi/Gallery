const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/photos');
mongoose.connect('mongodb://localhost/Gallery');

const db = mongoose.connection;

db.on('err', console.error.bind('err'));
db.once('open', () => {console.log('DB Connected')});

var listingSchema = new mongoose.Schema ({
  listing_id: {
    type: Number,
    required: true
  },
  photos: [{
    photo_id: {
    type: Number,
    required: true
    },
    photoUrl: {
    type: String,
    required: true 
    },
    caption: String 
  }]
});


var Listing = mongoose.model('Listing', listingSchema);

// var photoSchema = new mongoose.Schema ({
//     photo_id: {
//     type: Number,
//     required: true
//   },
//     photoUrl: {
//     type: String,
//     required: true 
//   },
//     caption: String 
// })
// var Photo = mongoose.model('Photo', photoSchema);



module.exports = Listing;
// module.exports = Photo;