import strategy from 'react-validatorjs-strategy';

const validatorTypes = strategy.createSchema(

  // Rules
  {
    name: 'required|min:3|max:30',
    price: 'numeric',
    weight: 'numeric',
  },

  // Messages
  {
    'required.name': 'You must specify the product name',
    'min.name': 'Name must be not shorter than 3',
    'max.name': 'Name must be not longer than 30',
    numeric: 'This is not a number',
  },
);