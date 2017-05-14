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
  new Feature(atFeature++, 'action-report_problem', 'File a noise complaint', '...', 'file-complaint'),
  new Feature(atFeature++, 'action-markunread_mailbox', 'Send an anonymous postcard to your neighbhors', '...', 'send-postcard'),
  new Feature(atFeature++, 'action-question_answer', 'Chat with like-minded New Yorkers suffering from noise pollution', '...', 'chat'),
  new Feature(atFeature++, 'resource-face', 'Confront your neighbor', '...', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'resource-trending_up', 'See if your neighbhorhood is quieter / louder than normal', '...', 'data'),
  new Feature(atFeature++, 'resource-account_balance', 'Access city resources for dealing with noise', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'resource-sentiment_dissatisfied', 'Access resources for dealing with stress', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
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

function getViewer() {
  return lvarayut;
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

function addUser(geo, address) {
  console.log(geo, address);
  const newUser = new User(geo, address);
  users.push(newUser);
  return newUser;
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
  getViewer,
  getFeature,
  getFeatures,
  addFeature,
  getReport,
  getReports,
  addReport
};
