import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import {Button, List, ListItem, ListItemContent, Textfield, ListItemAction} from 'react-mdl';
import Page from '../Page/PageComponent';
import styles from './Chat.scss';

const PUBLISH_KEY = 'pub-c-58f872c2-fa34-415e-b01c-234de2823c8b';
const SUBSCRIBE_KEY = 'sub-c-5bf84f44-3874-11e7-887b-02ee2ddab7fe';

if (!localStorage.chatUUID) {
  localStorage.setItem('chatUUID', uuidV1());
}

const pubnub = new PubNub({
    subscribeKey: 'sub-c-5bf84f44-3874-11e7-887b-02ee2ddab7fe',
    publishKey: 'pub-c-58f872c2-fa34-415e-b01c-234de2823c8b',
    uuid: localStorage.chatUUID,
});

export default class Chat extends Component {
  state = {
    message: '',
    chats: [],
    chatError: null,
    chatOk: null,
  }
  componentWillMount() {

    this.listener = pubnub.addListener({
      status: statusEvent => {
        if (statusEvent.category === "PNUnknownCategory") {
          this.setState({chatError: statusEvent.errorData.message, chatOk: false});
        } else {
          this.setState({chatOk: true});
        }
      },
      presence: presenceEvent => {
        console.log('has other users!', presenceEvent);
      },
      message: chat => {
        this.addChats([{entry: chat.message}]);
      }
    });
    pubnub.subscribe({
      channels: [this.getRoom()],
      withPresence: true,
    });
    pubnub.history({
      channel: this.getRoom(),
      count: 10,
    }, (status, response) => {
      this.addChats(response.messages);
    });
  }

  addChats(messages) {
    this.setState({chats: this.state.chats.concat(messages)});
  }

  componentWillUnmount() {
    pubnub.unsubscribe({
      channels: [this.getRoom()],
    });
  }

  getRoom() {
    return `chats-${this.props.params.room}`;
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
        id: uuidV1(),
      },
      channel: this.getRoom(),
    })
  }

  render() {
    return (
      <Page heading='Chat'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <List>
            {this.state.chats.map(chat => (chat.entry && (
              <ListItem key={chat.entry.id}>
                <ListItemContent className={chat.entry.chatUUID === localStorage.chatUUID ? styles.me : styles.notme} icon="person">
                  <div>
                    {chat.entry.text}
                  </div>
                </ListItemContent>
              </ListItem>
            )))}
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
