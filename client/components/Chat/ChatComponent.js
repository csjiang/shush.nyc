import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import {List, ListItem, ListItemContent} from 'react-mdl';
import Page from '../Page/PageComponent';

const PUBLISH_KEY = 'pub-c-58f872c2-fa34-415e-b01c-234de2823c8b';
const SUBSCRIBE_KEY = 'sub-c-5bf84f44-3874-11e7-887b-02ee2ddab7fe';

const pubnub = new PubNub({
    subscribeKey: 'sub-c-5bf84f44-3874-11e7-887b-02ee2ddab7fe',
    publishKey: 'pub-c-58f872c2-fa34-415e-b01c-234de2823c8b',
});

export default class Chat extends Component {
  state = {
    message: '',
    chats: [],
    chatError: null,
  }
  componentWillMount() {
    if (!localStorage.chatUUID) {
      localStorage.setItem('chatUUID', uuidV1());
    }
    pubnub.addListener({
      status: statusEvent => {
        if (statusEvent.category === "PNUnknownCategory") {
          this.setState({chatError: statusEvent.errorData.message});
        }
      }
    })
  }

  updateMessage = (e) => {
    this.setState({message: e.target.value});
  }

  send = e => {
    e.preventDefault();
    pubnub.publish({
      message: {
        chatUUID: localStorage.chatUUID,
        text: this.state.message,
      },
      channel: this.props.params.room,
    })
  }

  render() {
    return (
      <Page heading='Chat'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <List>
            {this.state.chats.map(chat => (
              <ListItem>
                <ListItemContent icon="person">
                  Testing
                </ListItemContent>
              </ListItem>
            ))}
          </List>
          <form onSubmit={this.send}>
            <Textfield
              label="Message"
              floatingLabel={true}
              onChange={this.updateMessage}
            />
            <Button onClick={this.send}>Send</Button>
          </form>
        </div>
      </Page>
    );
  }
}
