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
      let range = req.query.range ? parseInt(req.query.range) : 100;
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

  express.post('/api/save-stripe-token', (req, res, next) => {
    if (db) {
      db.collection('transactions')
      .save(req.body, (err, result) => {
        if (err) return res.json({ error: err });
        console.log('saved transaction to database');
        res.json(req.body);
      });
    } else return res.json({ error: 'Database error... please try again later :('})
  });

    express.post('/api/create-postcard', (req, res, next) => {
      if (db) {

        const { address_line1, address_line2, address_city, address_zip, message, token, email } = req.body;
        console.log(token, 'token')

        db.collection('transactions')
          .findOne({
          'id': token }, (err, doc) => {
            if (err) res.json({ error: err });
            console.log('doc', doc)

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
              front: 'tmpl_630385b1a7f0c24',
              message: req.body.message
            }, function (err, postcard) {
              if (err) {
                console.log(err);
                return res.json({ error: err });
              }
              console.log('postcard', postcard)

              return db.collection('postcards')
                .save(Object.assign({}, ...postcard, { token, email }), (err, result) => {
                  console.log('result', result);
                  //form validation on client-side
                  if (err) return res.json({ error: err });
                  res.json(postcard);
                })
            });
        })
      } else return res.json({ error: 'Database error... please try again later :('})
    });

  MongoClient.connect(process.env.DB_URL, (err, database) => {
    if (err) return console.log(err);
    db = database;

  });
}
