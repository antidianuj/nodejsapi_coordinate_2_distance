const fsp = require('fs').promises;
const fs = require('fs');
const schema=require('../utilities/Validation/schema');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');


exports.postAnalytics = catchAsync(async(req, res, next) => {
    const {ip,coordinates}=req.body;
    const validator=await schema.validateAsync(req.body);
    let reportAnalytics=[];
  if (fs.existsSync(`${__dirname}/storeAnalytics.json`)) {
// If the file exists, reads the file
  const reportFile = await fsp.readFile(`${__dirname}/storeAnalytics.json`, 'utf-8')
reportAnalytics = JSON.parse(reportFile)
} else {

   return ('File does not exist');
}
reportAnalytics.push({...req.body,createdAt:new Date()})
await fsp.writeFile(`${__dirname}/storeAnalytics.json`, 'utf-8')
 res.status(201).json({
        status: 'success',
        data: {
            message: 'IP and Coordinates successfully taken'
        }
    }) 

});