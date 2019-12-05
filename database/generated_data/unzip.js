const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const unzipper = function(inpPath, outPath, callback) {
  const gunzip = zlib.createGunzip();
  const inp = fs.createReadStream(path.resolve(__dirname, inpPath));
  const out = fs.createWriteStream(path.resolve(__dirname, outPath));
    
  inp.pipe(gunzip)
    .on('error', () => {
     console.log('error unzipping', error)
    })
    .pipe(out)
    .on('error', () => {
    // handle error
    })
    .on('finish', () => { //'end' is called automatically when read ends
      inp.destroy();
      out.destroy();
      callback();
    })
};

unzipper('sqlListings.csv.gz', 'sqlListings.csv', () => {
  unzipper('sqlPhotos1.csv.gz', 'sqlPhotos1.csv', () => {});
});