import Relay from 'react-relay';
import Splash from './SplashComponent';

export default Relay.createContainer(Splash, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        features(first: 20) {
          edges {
            node {
              id
              name
              type
              description
              url
            }
          }
        }
      }`
  }
});
