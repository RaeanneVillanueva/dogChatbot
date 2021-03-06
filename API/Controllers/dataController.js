'use strict';

var mongoose = require('mongoose');
var dogDescription = mongoose.model('dogDescription');

exports.processRequest = function (req, res) {
    if (req.body.queryResult.action == "dogBreed") {
        getDogDescription(req, res)
    }
};

function getDogDescription(req, res) {
    let breedSearched = req.body.queryResult &&
        req.body.parameters.queryResult &&
        req.body.parameters.breedSearched.queryResult ?
        req.body.parameters.breedSearched.queryResult : 'Unknown';

    dogDescription.findOne({
        dogBreed: {
            $regex: new RegExp(breedSearched, "i")
        }
    }, function (err, breedExists) {
        if (err) {
            return res.json({
                speech: 'Something went wrong!',
                fulfillmentText: 'Something went wrong!',
                source: 'dogDescription'
            });
        }

        if (breedExists) {
            return res.json({
                speech: breedExists.description,
                fulfillmentText: breedExists.description,
                source: 'dogDescription'
            });
        } else {
            return res.json({
               speech: 'I currently have no information about this breed',
               fulfillmentText: 'I currently have information about this breed',
               source: 'dogDescription'
            });
        }
    });
}
