exports.addDessertSchema = {
  description: 'Create a new dessert',
  tags: ['desserts'],
  summary: 'Creates new dessert with given values',
  body: {
    type: 'object',
    properties: {
      dessertName: { type: 'string' },
      calories: { type: 'number' },
      fat: { type: 'number' },
      carb: { type: 'number' },
      protein: { type: 'number' },
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        dessertName: { type: 'string' },
        calories: { type: 'number' },
        fat: { type: 'number' },
        carb: { type: 'number' },
        protein: { type: 'number' },
        __v: { type: 'number' }
      }
    }
  }
}
