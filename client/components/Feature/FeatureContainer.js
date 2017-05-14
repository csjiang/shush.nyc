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
  new Feature(atFeature++, 'action-report_problem', 'File a noise complaint', '...', 'file-complaint'),
  new Feature(atFeature++, 'action-markunread_mailbox', 'Send an anonymous postcard to your neighbhors', '...', 'send-postcard'),
  new Feature(atFeature++, 'action-question_answer', 'Chat with like-minded New Yorkers suffering from noise pollution', '...', 'chat'),
  new Feature(atFeature++, 'resource-face', 'Confront your neighbor', '...', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'resource-trending_up', 'See if your neighbhorhood is quieter / louder than normal', '...', 'data'),
  new Feature(atFeature++, 'resource-account_balance', 'Access city resources for dealing with noise', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'resource-sentiment_dissatisfied', 'Access resources for dealing with stress', '...', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
];

export default class FeatureContainer extends React.Component {
  render() {
    return <FeatureComp features={features} />;
  }
}
