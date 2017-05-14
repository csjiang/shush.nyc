'use strict';

import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import MakeLob from 'lob';

const Lob = MakeLob(process.env.LOB_API_KEY);
let db;

export default function createApp(express) {
  express.use(bodyParser.urlencoded({ extended: true }));
  express.use(bodyParser.json());

  MongoClient.connect(process.env.DB_URL, (err, database) => {
    if (err) return console.log(err);
    db = database;

    express.post('/api/create-postcard', (req, res, next) => {
      const { address_line1, address_line2, address_city, address_zip, message } = req.body;
      console.log(req.body);

      Lob.postcards.create({
        to: {
          address_state: 'NY',
          name: 'My Dear Neighbor',
          address_line1: req.body.address_line1,
          address_line2: req.body.address_line2,
          address_city: req.body.address_city,
          address_zip: req.body.address_zip,
        },
        from: {
          name: 'A concerned neighbor',
          address_line1: 'https://shush.nyc',
          address_state: 'NY',
          address_city: req.body.address_city,
          address_zip: req.body.address_zip,
        },
        size: '4x6',
        front: '<html style="padding: 1in; font-size: 50;">Test</html>',
        message: req.body.message
      }, function (err, postcard) {
        if (err) {
          console.log(err);
          return res.send({ error: err });
        }
        console.log('Postcard to ' + postcard.to.name + ' sent! View it here: ' + postcard.url, ' Your postcard will be delivered on ' + postcard.expected_delivery_date);

        return db.collection('postcards')
          .save(postcard, (err, result) => {
            //form validation on client-side
            if (err) return console.log(err);
            console.log(result, 'saved to database');
            res.send(postcard);
          });
      });
    });
    // express.post('create-address', (req, res, next) => {
    //   db.collection('addresses').save(req.body, (err, result) => {
    //     //form validation on client-side
    //     if (err) return res.send({ error: err });

    //     console.log('saved address to database');
    //     res.send(result);
    //   });
    // });
  });
}
