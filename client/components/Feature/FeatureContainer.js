import React from 'react';
import FeatureComp from './FeatureComponent';

class Feature {
  constructor(id, type, name, description, url) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.description = description;
    this.url = url;
  }
}

let atFeature = 0;
const features = [
  new Feature(atFeature++, 'action-report_problem', 'File a noise complaint', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'action-face', 'Confront your neighbor', '...', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'action-markunread_mailbox', 'Send an anonymous postcard to your neighbhors', '...', 'http://graphql.org'),
  new Feature(atFeature++, 'action-language', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
  new Feature(atFeature++, 'resource-language', 'See if your neighbhorhood is quieter / louder than normal', '...', 'http://expressjs.com'),
];

export default class FeatureContainer extends React.Component {
  render() {
    return <FeatureComp features={features} />;
  }
}
