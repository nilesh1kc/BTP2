const catchAsync = require("../utils/catchAsync");
const road = require('./../models/roadModel')
exports.getMap = catchAsync(async (req, res, next) => {
    const rds = await road.find({
        score: { $gt: 0 }
    }).select({ location: 1, score: 1, _id: 0 })
    res.status(200).json({
        status: "success",
        message: "Query executed successfully",
        data: rds
    })
});

exports.updateMap = catchAsync(async (req, res, next) => {
    // console.log(req.body)
    // if(req.body.frequency){
    //     console.log('Entered')
    // }
    // return res.status(200)
    let { location, radius, similarity, type, frequency } = req.body;
    let [lng, lat] = location.coordinates
    radius = radius * 0.001
    type = type - 1
    let rd = await road.findOne({
        location: { $geoWithin: { $centerSphere: [[lng * 1, lat * 1], radius] } }
    })
    if (!rd) {
        // console.log("Creating new doc")
        rd = await road.create({ location });

        // res.status(200).json({
        //     status : "success",
        //     message : "Doc created ",
        //     data : doc
        // })
    }
    // else{
    // console.log(similarity)
    // console.log(rd)
    if (similarity) {
        rd.similarity[type] = similarity
    }
    if (frequency) {
        rd.frequency[type] = frequency
    }
    await rd.save();
    res.status(201).json({
        status: "success",
        message: "Data added into DB successfully",
        data: rd
    })
    // }
});