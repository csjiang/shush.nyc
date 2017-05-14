import Relay from 'react-relay';

class AddUserMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { addUser }
    `;
  }

  getVariables() {
    return {
      geo: this.props.geo,
      address: this.props.address,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on Add {
        featureEdge,
        viewer { features }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'features',
      edgeName: 'featureEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default AddFeatureMutation;
