// External Dependancies
const mongoose = require('mongoose')
// const ObjectId = mongoose.Schema.Types.ObjectId

const nutritionSchema = new mongoose.Schema({
	dessertName: String,
	calories: Number,
	fat: Number,
	carb: Number,
	protein: Number,
})

module.exports = mongoose.model('Dessert', nutritionSchema)
