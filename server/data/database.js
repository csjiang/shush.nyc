const uuidV1 = require('uuid/v1');

class User {
  constructor(id, name, username) {
    this.id = id;
    this.name = name;
    this.username = username;
  }
}

class Report {
  constructor(id, address /*, addressType, crossStreet1, crossStreet2, state, zip, borough, noiseType, location, locationType, description*/) {
    this.id = id;
    this.address = address;
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

const lvarayut = new User(1, 'Varayut Lerdkanlayanawat', 'lvarayut');

let atFeature = 0;
const features = [
  new Feature(atFeature++, 'action-report_problem', 'File a noise complaint', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'action-face', 'Confront your neighbor', '...', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'action-markunread_mailbox', 'Send an anonymous postcard to your neighbhors', '...', 'http://graphql.org'),
  new Feature(atFeature++, 'action-language', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
  new Feature(atFeature++, 'resource-language', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
];

/*
* Add feature in memory
*/

let reports = [];

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

function addReport(id, address) {
  const newReport = new Report(uuidV1(), address);
  reports.push(newReport);
  return newReport;
}

function getReport(id) {
  return reports.find(w => w.id === id);
}

function getReports() {
  return features;
}



export {
  User,
  Feature,
  Report,
  getUser,
  getFeature,
  getFeatures,
  addFeature,
  getReport,
  getReports,
  addReport
};
