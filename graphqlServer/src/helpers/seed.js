// Import external dependancies
const faker = require('faker')
const boom = require('boom')

// Import internal dependancies
const fastify = require('../server.js')

// Fake data
const dsst = [
	{
		name: 'Oreo',
	},
	{
		name: 'Nougat',
	},
	{
		name: 'Gingerbread',
	},
	{
		name: 'Honeycomb',
	},
	{
		name: 'KitKat',
	},
	
]

// Get Data Models
const Nutrition = require('../models/Nutrition')


const generateNutritionData = () => {
	let nutritionData = []
	let i = 0

	while (i < 4) {
		const nutritionObject = faker.random.arrayElement(dsst);
		const calories = faker.random.number({ min: 2, max: 500 })
		const fat = faker.random.number({ min: 2, max: 50 })
		const carb = faker.random.number({ min: 2, max: 100 })
		const protein = faker.random.number({ min: 2, max: 10 })

		const dessert = {
			dessertName: nutritionObject.name,
			calories,
			fat,
			carb,
			protein
		}

		nutritionData.push(dessert)
		i++
	}

	return nutritionData
}


fastify.ready().then(
	async () => {
		try {
			const desserts = await Nutrition.insertMany(generateNutritionData())

			console.log(`
      Data successfully added:
       
        - ${desserts.length} desserts added.
        
      `)
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)
