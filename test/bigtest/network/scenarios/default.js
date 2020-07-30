/* istanbul ignore file */

// default scenario is used during `yarn start --mirage`
export default function defaultScenario(server) {
  server.create('instance-type', {
    name: 'still image',
    code: 'sti',
    source: 'rdacarrier',
  });
  server.create('instance-type', {
    name: 'computer dataset',
    code: 'cod',
    source: 'rdacarrier',
  });
  server.create('contributor-name-type', { name: 'Personal name' });
  server.create('contributor-name-type', { name: 'Corporate name' });
  server.create('contributor-name-type', { name: 'Meeting name' });
}
