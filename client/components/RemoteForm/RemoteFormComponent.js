import React, {Component} from 'react';


const GET_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm?serviceName=NYPD+Noise+Neighbor';
const POST_ACTION_URL = 'https://www1.nyc.gov/apps/311universalintake/form.htm';

export default class RemoteFormComponent {

  componentDidMount() {
    this.refs.iframe.onload = this.frameLoaded;
  }

  frameLoaded = () => {
    if (!this.state.formReady) {
      this.setState({formReady: true, formStep: 1});
    } else {

    }
  }

  componentWillReceieveProps(_, nextState) {
    if (this.state.step === 1 && nextState.step === 2) {
      this.form.submit();
    }
  }

  getPostMap(){
  if (this.state.step === 1) {
      return {
        _target: 1,
      };
    } else {
      return {};
    }
  }

  getThingsToPost() {
    const postMap = this.getPostMap();
    const toPost = [];
    for (const mapKey of Object.keys(postMap)) {
      toPost.append({name: mapKey, value: postMap[mapKey]});
    }
    return toPost;
  }

  componentWillUnmount(){
    this.refs.iframe.onload = () => {};
  }

  render() {
    return (
      <div>
        <form ref={form => this.form = form} enctype='multipart/form-data' target="formposternnn" method="POST" action={POST_ACTION_URL}>
          {this.getThingsToPost().map(item =>
            <input type="hidden" key={item.name} name={item.name} value={item.value} />
          )}

          <input type="submit" />
        </form>
        <iframe ref={iframe => this.iframe = iframe} id="formposternnn" src={GET_ACTION_URL}></iframe>
      </div>
    )
  }
}
