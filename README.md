# Gallery

## Description
The gallery and carousel component for a vacation stay room booking service. 

## Table of Contents
1. Description
2. Related Projeects
3. Requirements
4. Installing Dependencies
5. API DOCUMENTATION

## Related Projects
  - https://github.com/Data-fi/Recomendations.git
  - https://github.com/Data-fi/reviews.git
  - https://github.com/Data-fi/Calendar-Jimmy.git

## Requirements
- Node 
- npm 

### Installing Dependencies
From within the root directory

Update later

## API DOCUMENTATION
NOTE: document key: * means field is REQUIRED. All else is optional.

1. GET
''' /listings/:Id/photos'''
Fetch all photos for listings with specified listing ID from database
''' 
INPUT: JSON data type
  {}

OUTPUT: JSON data type, array of objects
  [
    {
     _id: Number
     Photo: Url String,
     Caption: String
    }, {...}
  ]
  
   or Error message 
'''

2. POST
'''/listings/:Id/photos'''
Add photo to photos collection/table and reference to photos array for current listing ID into database. 
Can only add one photo at a time. Refactor in the future for multiple photos in future versions if need be.
Listing Id is not needed in the input because the path is already telling server which specific LOCATION in databse to add to.
''' 
INPUT: JSON data type
  {
   Photo: Url String *,
   Caption: String
  }
  
OUTPUT: Text data type
Status code 200 or Error message
  
'''

3. PUT: Text data type
'''/photos/:Id'''
Update photo with this photo Id within current listing to another reference number. 
''' 
INPUT: JSON data type
  {
   listing_id: Number *,
   photo_id: Number *, 
   newURL: URL string *
   caption: string
  {

OUTPUT: Text data type
Status code 200 or Error message
'''

4. DELETE: Text datatype
'''/photos/:Id'''
Delete photo with this Id REFERENCE in this specific listing. Leave original photo in tact. 
''' 
INPUT:
  {
   listing_id: Number *,
   photo_id: Number *
   
  {

OUTPUT: Status code 200 or Error message

'''
