// Import our Controllers
const dessertController = require('../controllers/dessertController')

// Import Swagger documentation
 const documentation = require('./documentation/dessertApi')

const routes = [
  {
    method: 'GET',
    url: '/api/desserts',
    handler: dessertController.getDesserts
  },
  {
    method: 'POST',
    url: '/api/desserts',
    handler: dessertController.addDessert,
    schema: documentation.addDessertSchema
  },
  {
    method: 'PUT',
    url: '/api/desserts/:id',
    handler: dessertController.updateDessert
  },
  {
    method: 'DELETE',
    url: '/api/desserts',
    handler: dessertController.deleteDessert
  }
]

module.exports = routes
