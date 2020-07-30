// External Dependancies
const boom = require('boom')

// Get Data Models
const Dessert = require('../models/Nutrition')

// Get all desserts
exports.getDesserts = async () => {
	try {
		const desserts = await Dessert.find()
		return desserts
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Add a new desserts
exports.addDessert = async (req, reply) => {
	try {
		const dessert = new Dessert(req.body)
		return dessert.save()
	} catch (err) {
		throw boom.boomify(err)
	}
}

// Update an existing Dessert
exports.updateDessert = async req => {
	try {
		const id = req.params === undefined ? req.id : req.params.id
		const updateData = req.params === undefined ? req : req.params
		const update = await Dessert.findByIdAndUpdate(id, updateData, { new: true })
		return update
	} catch (err) {
		throw boom.boomify(err)
	}
}

// // Delete a dessert
// exports.deleteDessert = async req => {
// 	try {
// 		const id = req.params === undefined ? req.id : req.params.id
// 		const dessert = await Dessert.findByIdAndRemove(id)
// 		return dessert
// 	} catch (err) {
// 		throw boom.boomify(err)
// 	}
// }

// Remove a new desserts
exports.deleteDessert = async (req, reply) => {
	try {
		if(req.body && req.body.id && req.body.id.length > 0){
			return await Promise.all(
				req.body.id.map(async (item) => {
				  await Dessert.findByIdAndRemove(item);
			}));
		}
	} catch (err) {
		throw boom.boomify(err)
	}
}
