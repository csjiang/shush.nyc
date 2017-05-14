'use strict';

import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Lob from 'lob';

const Lob = Lob(process.env.LOB_API_KEY);
let db;

export default function createApp(express, port) {
  express.use(bodyParser.urlencoded({ extended: true }));

  MongoClient.connect(process.env.DB_URL, (err, database) => {
    if (err) return console.log(err);
    db = database;

    express.post('/create-postcard', (req, res, next) => {
      db.collection('postcards').save(req.body, (err, result) => {
        //form validation on client-side
        if (err) return console.log(err);
        console.log(result, 'saved to database');

        Lob.postcards.create({
          to: {
            name: 'filler',
            address_line1: 'filler',
            address_line2: 'filler',
            address_city: 'filler',
            address_state: 'filler',
            address_zip: 'filler',
          },
          from: {
            name: 'A concerned neighbor via shush.nyc',
            address_city: 'New York',
            address_state: 'NY',
            address_zip: 'filler',
            address_country: 'US'
          },
          size: '4x6',
          front: '<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}</html>',
          back: '<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>',
          message: 'trollolol'
        }, function (err, postcard) {
          if (err) {
            console.log(err);
            return res.send({ error: err });
          }
          console.log('Postcard to ' + postcard.to.name + ' sent! View it here: ' + postcard.url, ' Your postcard will be delivered on ' + postcard.expected_delivery_date);
          res.send(postcard);
        });
      });
    });

    express.post('create-address', (req, res, next) => {
      db.collection('addresses').save(req.body, (err, result) => {
        //form validation on client-side
        if (err) return res.send({ error: err });

        console.log('saved address to database');
        res.send(result);
      });
    });

    express.listen(port, () => {
      console.log(`server is listening intently on port ${port}!`);
    });
  });
}
