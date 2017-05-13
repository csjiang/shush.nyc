/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import styles from './Feature.scss';

export default class Feature extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Page heading='Take action'>
          <Grid>
            {this.props.viewer.features.edges.map((edge) => {
              if (edge.node.type !== 'action') {
                return;
              }

              return (
                <Cell col={4} key={edge.node.id}>
                  <Card className={styles.card}>
                    <CardTitle expand className={styles.image} style={{ backgroundImage: `url('')` }} />
                    <CardActions className={styles.name}>
                      <Button colored href={edge.node.url}>{edge.node.name}</Button>
                    </CardActions>
                    <CardText className={styles.description}>
                      {edge.node.description}
                    </CardText>
                  </Card>
                </Cell>
              );
            })}
          </Grid>
        </Page>
        <Page heading='Resources'>
          <Grid>
            {this.props.viewer.features.edges.map((edge) => {
              if (edge.node.type !== 'resource') {
                return;
              }

              return (
                <Cell col={4} key={edge.node.id}>
                  <Card className={styles.card}>
                    <CardTitle expand className={styles.image} style={{ backgroundImage: `url('')` }} />
                    <CardActions className={styles.name}>
                      <Button colored href={edge.node.url}>{edge.node.name}</Button>
                    </CardActions>
                    <CardText className={styles.description}>
                      {edge.node.description}
                    </CardText>
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
