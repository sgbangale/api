const request = require('../app/infra/routes/request'),
authentication =require('../app/infra/routes/authentication');

module.exports = [
  {'route':'request','routeObj':request},
  {'route':'account','routeObj':authentication}
];