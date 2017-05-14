import React, {Component} from 'react';


const GET_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm?serviceName=NYPD+Noise+Neighbor';
const POST_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm';

const BOROUGH_MAP = {
  'MANHATTAN': '1-4X9-316',
  'BROOKLYN': '1-4X9-314',
  'BRONX': '1-4X9-313',
  'QUEENS': '1-4X9-315',
  'STATEN_ISLAND': '1-4X9-318',
};


export default class RemoteFormComponent extends Component {
  state = {
    step: 0,
    formReady: false,
  }

  componentDidMount() {
    this.iframe.onload = this.frameLoaded;
  }

  frameLoaded = () => {
    if (!this.state.formReady) {
      this.setState({formReady: true, step: 1});
    } else {
      this.setState({step: this.state.step + 1})
    }
  }

  componentWillReceieveProps(_, nextState) {
    if (this.state.step < nextState.step) {
      setTimeout(() => this.form.submit(), 221);
    }
  }

  getPostMap() {
    switch (this.state.step) {
      case 1: return {
        _target1: 'START',
      };
      case 2: return {
        // 'formFields.Location Type': '1-6VO-1495',
        // 'formFields.Address Type': '__Street',
        'formFields.Complaint Type': '1-6VL-200',
        'formFields.Descriptor 1': '1-6VN-314',
        'formFields.Complaint Details': this.props.data.complaint_details,
        'formFields.Date/Time of Occurrence': this.props.data.time_occurrence, // '05/03/2017 08:54:44 PM'
        'formFields.ATTRIB_46': '',
        '_target2': '',
      };
      case 3: return {
        'formFields.Location Type': '1-6VO-1495',
        'formFields.Address Type': '__Street',
        'formFields.Incident Borough 6': BOROUGH_MAP[this.props.data.borough.toUpperCase()],
        'formFields.Incident Address Number': this.props.data.address_number,
        'formFields.Incident Street Name': this.props.data.street_name,
        'formFields.Location Details': this.props.data.location_details,
        '_target3': '',
      };
      default: return {};
    }
  }

  getThingsToPost() {
    const postMap = this.getPostMap();
    const toPost = [];
    for (const mapKey of Object.keys(postMap)) {
      toPost.push({name: mapKey, value: postMap[mapKey]});
    }
    return toPost;
  }

  componentWillUnmount() {
    this.refs.iframe.onload = () => {};
  }

  render() {
    return (
      <div>
        <form ref={form => this.form = form} encType='multipart/form-data' target="formposternnn" method="POST" action={POST_ACTION_URL}>
          {this.getThingsToPost().map(item =>
            <input type="hidden" key={item.name} name={item.name} value={item.value} />
          )}
          <input type="submit" />
        </form>
        <iframe ref={iframe => this.iframe = iframe} id="formposternnn" name="formposternnn" src={GET_ACTION_URL}></iframe>
      </div>
    )
  }
}
