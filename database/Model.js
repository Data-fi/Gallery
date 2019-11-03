const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/photos');
mongoose.connect('mongodb://localhost/Gallery');

const db = mongoose.connection;

db.on('err', console.error.bind('err'));
db.once('open', () => {console.log('DB Connected')});

var photoSchema = new mongoose.Schema({
  photo_id: {
    type: Number,
    required: true
  },
  photoUrl: {
    type: String,
    required: true 
  },
  caption: String //if there's no caption then it's just NULL
});

var listingSchema = new mongoose.Schema ({
  listing_id: {
    type: Number,
    required: true
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Photo'
  }]
})
var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;