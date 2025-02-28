const DataUriParser = require('datauri/parser')
const path = require('path')

const getDataUri = (file) => {
    const parser = new DataUriParser();

    // const extName = path.extname(file.originalname);
    // no need to call toString(). path.extname() already returns a string.

    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

module.exports = getDataUri;