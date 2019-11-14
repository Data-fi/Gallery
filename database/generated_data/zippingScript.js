var fs = require('fs');
var zlib = require('zlib');
var gzip = zlib.createGzip();
var Readable = require('stream').Readable;

// compressing song csv// 
fs.createReadStream('sqlListings.csv').pipe(gzip).pipe(fs.createWriteStream('sqlListings.csv.gz'));
fs.createReadStream('sqlPhotos1.csv').pipe(gzip).pipe(fs.createWriteStream('sqlPhotos1.csv.gz'));