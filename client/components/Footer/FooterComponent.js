import React from 'react';
import PropTypes from 'prop-types';
import { Footer as MDLFooter, FooterSection } from 'react-mdl';
import styles from './Footer.scss';

export default class Footer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
  };

  render() {
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          <span>Handcrafted with ♥ by <a href='https://github.com/iainnash'>@iainnash</a>, <a href='https://github.com/pmocal'>@pmocal</a>, and <a href='https://github.com/csjiang'>@csjiang</a> for the 2017 TechCrunch Disrupt NYC Hackathon. <a href='https://github.com/csjiang/shush.nyc'><i className='material-icons'>help outline</i></a></span>
        </FooterSection>
      </MDLFooter>
    );
  }
}
