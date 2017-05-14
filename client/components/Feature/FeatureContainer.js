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

function getZIP() {
  if (!localStorage.user_address) {
    return;
  }
  const {address} = JSON.parse(localStorage.user_address);
  return address.postal_code;
}

let atFeature = 0;
const features = [
  new Feature(atFeature++, 'action-report_problem', 'File a noise complaint', 'Easily and quickly file a 311 noise complaint at the city of New York', 'file-complaint'),
  new Feature(atFeature++, 'action-markunread_mailbox', 'Send an anonymous postcard', 'Send an anonymous postcard to multiple people in your building or neighbors with just a few clicks.', 'send-postcard'),
  new Feature(atFeature++, 'action-question_answer', 'Chat with residents nearby', 'Chat with like-minded New Yorkers suffering from noise pollution', `chat/zip-${getZIP()}`),
  new Feature(atFeature++, 'resource-face', 'Confront your neighbor', 'How to best approach your loud neighbor in person', 'http://www.wikihow.com/Deal-With-a-Noisy-Neighbour'),
  new Feature(atFeature++, 'resource-trending_up', 'See if your neighbhorhood is quieter / louder than normal', 'Compare noise complaints in a heat map', 'data'),
  new Feature(atFeature++, 'resource-account_balance', 'Access city resources', 'See what the city has published about noise and how to report and improve your quality of life in regards to noise.', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
  new Feature(atFeature++, 'resource-sentiment_dissatisfied', 'Resources for Feeling Stressed', 'Access resources for dealing with stress', 'http://www1.nyc.gov/nyc-resources/service/1197/noise-from-neighbor'),
];

export default class FeatureContainer extends React.Component {
  render() {
    return <FeatureComp features={features} />;
  }
}
