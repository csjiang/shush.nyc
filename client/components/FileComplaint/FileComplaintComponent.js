import React, { Component } from 'react';
// import { Grid, Cell, Textfield, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import RemoteForm from '../RemoteForm/RemoteFormComponent';

export default class FileComplaint extends Component {
  render() {
    return (
      <Page heading='File an official noise complaint'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <RemoteForm />
        </div>
      </Page>
    );
  }
}
