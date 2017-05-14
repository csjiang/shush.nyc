const request = require('request-promise');

const TEST_ADDRESS_DATA = {
  'formFields.Location Type': '1-6VO-1495',
  'formFields.Address Type': '__Street',
  'formFields.Complaint Type': '1-6VL-200',
  'formFields.Descriptor 1': '1-6VN-314',
  'formFields.Complaint Details': 'adsf',
  'formFields.Date/Time of Occurrence': '05/03/2017 08:54:44 PM',
  'formFields.ATTRIB_46': '',
  '_target2': '',
};

const BOROUGH_MAP = {
  'MANHATTAN': '1-4X9-316',
  'BROOKLYN': '1-4X9-314',
  'BRONX': '1-4X9-313',
  'QUEENS': '1-4X9-315',
  'STATEN_ISLAND': '1-4X9-318',
};


function checkAddress(borough, buildingNumber, streetName) {
  const data = {};
  for (const key of Object.keys(TEST_ADDRESS_DATA)) {
    data[key] = TEST_ADDRESS_DATA[key];
  }
  if (!BOROUGH_MAP[borough]) {
    throw new Error(
      'Incorrect Borough, correct boroughs: ' + Object.keys(BOROUGH_MAP).join(', ')
    );
  }

  data['formFields.Incident Borough 6'] = BOROUGH_MAP[borough];
  data['formFields.Incident Address Number'] = buildingNumber;
  data['formFields.Incident Street Name'] = streetName;
  data['formFields.Location Details'] = '';
  data['_target3'] = '';

  const cookieJar = request.jar();
  request.get({
    url: 'https://www1.nyc.gov/apps/311universalintake/form.htm?serviceName=NYPD+Noise+Neighbor',
    jar: cookieJar,
  }).then(response => {
    console.log('has cookie response: ', response);
    return request.post({
      url: 'https://www1.nyc.gov/apps/311universalintake/form.htm',
      formData: data,
      jar: cookieJar,
    });
  }).then(response => {
    console.log('has form response', response);
  }).catch(err => {
    console.error('has error!!!', err);
  });
}

module.exports = {
  checkAddress: checkAddress,
};
