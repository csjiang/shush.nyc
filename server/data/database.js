class User {
  constructor(id, name, username, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.website = website;
  }
}

class Feature {
  constructor(id, type, name, description, url) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}

const lvarayut = new User(1, 'Varayut Lerdkanlayanawat', 'lvarayut', 'https://github.com/lvarayut/relay-fullstack');

let atFeature = 0;
const features = [
  new Feature(atFeature++, 'action', 'File a noise complaint', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'action', 'Confront your neighbor', '...', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'action', 'Send an anonymous postcard to your neighbhors', '...', 'http://graphql.org'),
  new Feature(atFeature++, 'action', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
  new Feature(atFeature++, 'resource', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
];

/*
* Add feature in memory
*/

function addFeature(name, type, description, url) {
  const newFeature = new Feature(curFeatures, type, name, description, url);
  features.push(newFeature);
  newFeature.id = atFeature++;
  atFeature += 1;
  return newFeature;
}


function getUser(id) {
  return id === lvarayut.id ? lvarayut : null;
}

function getFeature(id) {
  return features.find(w => w.id === id);
}

function getFeatures() {
  return features;
}

export {
  User,
  Feature,
  getUser,
  getFeature,
  getFeatures,
  addFeature
};
