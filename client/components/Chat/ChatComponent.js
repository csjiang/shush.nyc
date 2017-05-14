import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import {Button, List, ListItem, ListItemContent, Textfield, ListItemAction} from 'react-mdl';
import Page from '../Page/PageComponent';
import swearjar from 'swearjar';
import styles from './Chat.scss';

const PUBLISH_KEY = 'pub-c-58f872c2-fa34-415e-b01c-234de2823c8b';
const SUBSCRIBE_KEY = 'sub-c-5bf84f44-3874-11e7-887b-02ee2ddab7fe';

const MAX_MESSAGES = 10;


const wordlist = [
  'eggy',
  'wat',
  'solid',
  'nice'
];


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
    onlineUsers: 1,
    chatOk: null,
  }
  componentWillMount() {
    console.log('unmount?')
    if (this.props.params.room) {
      if (this.props.params.room.indexOf('zip-') !== 0) {
        localStorage.setItem('chatRoom', this.props.params.room)
      }
    }
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
        this.setState({onlineUsers: presenceEvent.occupancy})
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
    const chats = this.state.chats.concat(messages).slice(-1 * MAX_MESSAGES);
    this.setState({chats});
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
        time: new Date().getTime(),
      },
      channel: this.getRoom(),
    });
    this.setState({message: ''});
  }

  render() {
    return (
      <Page heading='Chat'>
        <div style={{ width: '70%', margin: 'auto' }}>
          <div>{this.state.onlineUsers} {this.state.onlineUsers === 1 ? 'exasperated New Yorker is' : 'exasperated New Yorkers are'} online right now</div>
          <List>
            {this.state.chats.map(chat => (chat.entry && (
              <ListItem key={chat.entry.id}>
                <ListItemContent className={chat.entry.chatUUID === localStorage.chatUUID ? styles.me : styles.notme} icon="person">
                  <div>
                    {swearjar.censor(chat.entry.text)}
                  </div>
                </ListItemContent>
              </ListItem>
            )))}
          </List>
          <form onSubmit={this.send}>
            <Textfield
              label="Message"
              value={this.state.message}
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
