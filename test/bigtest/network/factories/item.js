import faker from 'faker';

import Factory from './application';

export default Factory.extend({
  title: faker.company.catchPhrase(),
  barcode: () => Math.floor(Math.random() * 9000000000000) + 1000000000000,
  status: {
    name: 'Available'
  },
});
