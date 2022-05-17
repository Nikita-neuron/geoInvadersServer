const Region = require('../models/region');

const { validationResult } = require('express-validator');

class RegionsController {

  async getRegions(req, res) {
    try {
      const regions = await Region.find();
      res.json(regions);
    } catch(e) {
      console.log(e);
    }   
  }

  async addRegion(req, res) {
    try {
      const {username, latitude, longitude, rgb} = req.body;
      await Region.findOne({latitude, longitude}, (e, candidate) => {
        if (candidate) {
            candidate.username = username;
            candidate.rgb = rgb;
            candidate.save();
        }
        else {
            const region = new Region({username, latitude, longitude, rgb});
            region.save();
        }
        return res.json({message: "Add successful"});
      });
    } catch(e) {
      console.log(e);
    }   
  }

  async editRegion(req, res) {
    try {
      const {username, latitude, longitude, rgb} = req.body;
      
      await Region.find({latitude, longitude}, (e, region) => {
        if (!region) {
          console.log(e);
          return res.status(400).json({message: "Region is not found"});
        }

        region.username = username;
        region.rgb = rgb;
        region.save();
        return res.json({massege: "Edit successful"});
      });

    } catch(e) {
      console.log(e);
    }   
  }

  async removeRegion(req, res) {
    try {
      const {username, latitude, longitude, rgb} = req.body;

      await Region.remove({latitude, longitude}, function (err, result) {
        if (err){
          console.log(err);
          return res.status(400).json({message: "Delete error"});
        }else{
          console.log("Result :", result);
          return res.json({message: "Delete successful"});
        }
      });
    } catch(e) {
      console.log(e);
    }     
  }

}

module.exports = new RegionsController();