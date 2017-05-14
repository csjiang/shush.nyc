'use strict';

import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import MakeLob from 'lob';

const Lob = MakeLob(process.env.LOB_API_KEY);
let db;

export default function createApp(express) {
  express.use(bodyParser.urlencoded({ extended: true }));
  express.use(bodyParser.json());



  express.get('/api/building-info', (req, res, next) => {
    console.log('!!!!', req.query);
    if (db) {
      console.log('db?1', parseFloat(req.query.lat));
      db.collection('complaints').find({
        loc: {
          $geoWithin: {$centerSphere: [[ parseFloat(req.query.lat), parseFloat(req.query.lng) ], 1 / (3963.2*5) ]}
        },
        limit: 5,
      }, (e, resp) => {
        if (!e) {
          resp.count((err, docs) => {
            console.log('done', err, docs);
            res.send({err, docs});
          });
        } else {
          res.send({error: e});
        }
      })
    }
  });

  MongoClient.connect(process.env.DB_URL, (err, database) => {
    if (err) return console.log(err);
    db = database;

    express.post('/api/create-postcard', (req, res, next) => {
      const { address_line1, address_line2, address_city, address_zip, message, token, email } = req.body;

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
          address_line1: 'www.shush.nyc',
          address_state: 'NY',
          address_city: req.body.address_city,
          address_zip: req.body.address_zip,
        },
        size: '4x6',
        front: 'tmpl_ea477fd9a4036a1',
        message: req.body.message
      }, function (err, postcard) {
        if (err) {
          console.log(err);
          return res.json({ error: err });
        }

        res.json(postcard);

        return db.collection('postcards')
          .save(Object.assign({}, ...postcard, { token, email }), (err, result) => {
            //form validation on client-side
            if (err) return console.log(err);
          })
      });


    });

    express.post('/api/save-stripe-token', (req, res, next) => {
      console.log('stripe token', req.body)
      res.json(req.body);
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
