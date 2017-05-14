import React, {Component} from 'react';
import {ProgressBar} from 'react-mdl';
import styles from './RemoteForm.scss';

const GET_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm?serviceName=NYPD+Noise+Neighbor';
const POST_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm';

const BOROUGH_MAP = {
  'MANHATTAN': '1-4X9-316',
  'BROOKLYN': '1-4X9-314',
  'BRONX': '1-4X9-313',
  'QUEENS': '1-4X9-315',
  'STATEN ISLAND': '1-4X9-318',
};


export default class RemoteFormComponent extends Component {
  state = {
    step: 0,
    formReady: false,
    formDone: false,
  }

  componentDidMount() {
    this.iframe.onload = this.frameLoaded;
    // this.tm = setTimeout(() => this.setState({formDone: true}), 20*1000));
  }

  componentWillUnmount() {
    // clearTimeout(this.tm);
  }

  frameLoaded = () => {
    console.log('frameLoaded')
    if (!this.state.formReady) {
      this.setState({formReady: true, step: 1});
    } else {
      if (this.state.step === 4) {
        this.setState({formDone: true});
      } else {
        this.setState({step: this.state.step + 1});
        this.props.onComplete && this.props.onComplete();
      }

    }
  }

  componentWillUpdate(_, nextState) {
    console.log('getting props', this.state, nextState);
    if (nextState.step <= 4 && this.state.step < nextState.step) {
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
      case 4: return {
        '_target4': '',
        'formFields.Personal Email Address': this.props.data.email,
        'formFields.Contact First Name': '',
        'formFields.Contact Last Name': '',
        'formFields.Contact Business Phone': '',
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

        {!this.state.formDone && <ProgressBar indeterminate />}
        <form className={styles.hidden} ref={form => this.form = form} encType='multipart/form-data' target="formposternnn" method="POST" action={POST_ACTION_URL}>
          {this.getThingsToPost().map(item =>
            <input type="hidden" key={item.name} name={item.name} value={item.value} />
          )}
          <input type="submit" />
        </form>
        <div className={this.state.formDone ? styles.formDone : styles.formLoading}>
          <iframe className={styles.formContainer} ref={iframe => this.iframe = iframe} id="formposternnn" name="formposternnn" src={GET_ACTION_URL}></iframe>
        </div>
      </div>
    )
  }
}
