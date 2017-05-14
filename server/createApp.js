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
      let range = req.query.range ? parseInt(req.query.range) : 80;
      if (range > 150) {
        range = 150;
      }
      console.log('db?1', parseFloat(req.query.lat));
      db.collection('complaints').find({
        loc: { $nearSphere: { $maxDistance: range, $geometry: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}}}
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

  express.get('/api/complaints', (req, res, next) => {
    console.log('!!!!', req.query);
    if (db) {
      db.collection('complaints').find({}, {limit: 100}, (e, resp) => {
        if (!e) {
          resp.toArray((err, docs) => {
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
