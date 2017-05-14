/* eslint-disable global-require */
import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import BuildingStatsContainer from './BuildingStatsContainer';
import styles from './Feature.scss';

export default class Feature extends React.Component {

  render() {
    return (
      <div>
        <div className={styles.greeting}>
          <h1 className={styles.logotext}>Shush.NYC</h1>
          <p className={styles.tagline}>i ♥ my neighbors, they’re so sweet</p>
        </div>
        <Page heading='Your neighbhorhood'>
          <BuildingStatsContainer />
        </Page>
        <Page heading='Take action'>
          <Grid>
            {this.props.features.map((edge) => {
              if (edge.type.indexOf('action') !== 0) {
                return;
              }

              return (
                <Cell col={4} key={edge.id}>
                  <Card shadow={0} className={styles.card + ' ' + edge.type}>
                    <CardTitle expand className={styles.image}>
                      <i className={`material-icons ${styles.icon}`}>{edge.type.replace('action-', '')}</i>
                    </CardTitle>
                    <CardText className={styles.description}>
                      {edge.description}
                    </CardText>
                    <CardActions className={styles.name}>
                      <Button colored href={edge.url}>{edge.name}</Button>
                    </CardActions>
                  </Card>
                </Cell>
              );
            })}
          </Grid>
        </Page>
        <Page heading='Resources'>
          <Grid>
            {this.props.features.map((edge) => {
              if (edge.type.indexOf('resource') !== 0) {
                return;
              }

              return (
                <Cell col={4} key={edge.id}>
                  <Card shadow={0} className={styles.card}>
                    <CardTitle expand className={styles.image}>
                      <i className={`material-icons ${styles.icon}`}>{edge.type.replace('resource-', '')}</i>
                    </CardTitle>
                    <CardText className={styles.description}>
                      {edge.description}
                    </CardText>
                    <CardActions className={styles.name}>
                      <Button colored href={edge.url}>{edge.name}</Button>
                    </CardActions>
                  </Card>
                </Cell>
              );
            })}
          </Grid>
        </Page>
      </div>
    );
  }
}
