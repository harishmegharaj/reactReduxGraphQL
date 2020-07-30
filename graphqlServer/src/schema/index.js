// Import External Dependancies
const graphql = require('graphql')

// Destructure GraphQL functions
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

// Import Controllers
const dessertController = require('../controllers/dessertController')

// Define Object Types

const dessertType = new GraphQLObjectType({
	name: 'Dessert',
	fields: () => ({
		_id: { type: GraphQLID },
		dessertName: { type: GraphQLString },
		calories: { type: GraphQLInt },
		fat: { type: GraphQLInt },
		carb: { type: GraphQLInt },
		protein: { type: GraphQLInt }
	})
})


// Define Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// dessert: {
		// 	type: dessertType,
		// 	args: { id: { type: GraphQLID } },
		// 	async resolve(parent, args) {
		// 		return await dessertController.getSingleDessert(args)
		// 	}
		// },
		desserts: {
			type: new GraphQLList(dessertType),
			async resolve(parent, args) {
				return await dessertController.getDesserts()
			}
		}
	}
})

// Define Mutations
const Mutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addDessert: {
			type: dessertType,
			args: {
				dessertName: { type: new GraphQLNonNull(GraphQLString) },
				calories: { type: GraphQLInt },
				fat: { type: GraphQLInt },
				carb: { type: GraphQLInt },
				protein: { type: GraphQLInt },
			},
			async resolve(parent, args) {
				const data = await dessertController.addDessert(args)
				return data
			}
		},
		editDessert: {
			type: dessertType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				dessertName: { type: new GraphQLNonNull(GraphQLString) },
				calories: { type: new GraphQLNonNull(GraphQLInt) },
				fat: { type: new GraphQLNonNull(GraphQLInt) },
				carb: { type: new GraphQLNonNull(GraphQLInt) },
				protein: { type: new GraphQLNonNull(GraphQLInt) },
				
			},
			async resolve(parent, args) {
				const data = await dessertController.updateDessert(args)
				return data
			}
		},
		deleteDessert: {
			type: dessertType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) }
			},
			async resolve(parent, args) {
				const data = await dessertController.deleteDessert(args)
				return data
			}
		}
	}
})

// Export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})
