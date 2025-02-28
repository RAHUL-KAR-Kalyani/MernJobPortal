const multer=require('multer')

const storage=multer.memoryStorage()

const singleUpload=multer({storage}).single("file")     // to upload image or any file

module.exports ={singleUpload}