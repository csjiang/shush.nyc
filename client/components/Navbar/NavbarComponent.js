import React from 'react';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer } from 'react-mdl';
import styles from './Navbar.scss';

export default class Navbar extends React.Component {
  getZIP() {
    if (!localStorage.user_address) {
      return;
    }
    const {address} = JSON.parse(localStorage.user_address);
    return address.postal_code;
  }

  render() {
    const title = 'shush.nyc';
    return (
      <Layout className={styles.root}>
        <Header title={<Link to='/home'>{title}</Link>} scroll>
          <Navigation>
            {this.getZIP() && <Link to={`/chat/zip-${this.getZIP()}`}>Area Talk</Link>}
            <Link to='/file-complaint'>File Complaint</Link>
            {localStorage.chatRoom && <Link to={`/chat/${localStorage.chatRoom}`}>Building Chat</Link>}
            <Link to='/send-postcard'>Send Postcard</Link>
          </Navigation>
        </Header>
        <Drawer title={<Link to='/' style={{ fontSize: '1.5em' }}>{title}</Link>} className='mdl-layout--small-screen-only'>
          <Navigation>
            <Link to='/signup'>Sign up</Link>
            <Link to='/login'>Login</Link>
          </Navigation>
        </Drawer>
        {this.props.children}
      </Layout>
    );
  }
}
