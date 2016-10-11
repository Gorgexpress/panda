import request from 'request';

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */
'use strict';

// Gets a list of Things
export function login(req, res) {
  if(!req.body || !req.body.email || !req.body.password)
    return res.status(400).json("Missing email and/or password in request body");
  let buffer = new Buffer(req.body.email + ':' + req.body.password);
  let auth = 'Basic ' + buffer.toString('base64');
  let options = {
    rejectUnauthorized: false,
    url: 'http://dev.parkingpanda.com/api/v2/users',
    method: 'GET',
    contentType: 'application/json',
    headers: {
      Authorization: auth
    },
    json: true
  };
  request(options, (error, response, body) => {
    if(!body)
      return res.status(response.statusCode).json(`Error Code: ${response.statusCode}`);
    if(!body.success || !body.data) {
      let errorMessage = body.message || "Error attempting to login but no error message received";
      return res.status(403).json(errorMessage);
    }
    else {
      buffer = new Buffer(body.data.email + ':' + body.data.apiPassword);
      req.session.apiPassword = 'Basic ' + buffer.toString('base64');
      req.session.userid = body.data.id;
      let data = {
        email: body.data.email,
        firstName: body.data.firstName,
        lastName: body.data.lastName,
        receiveEmail: body.data.receiveEmail,
        phone: body.data.phone,
        receiveSmsNotifications: body.data.receiveSmsNotifications,
      };
      req.session.userInfo = data;
      res.status(200).json(data);
    }
  });
}

export function logout(req, res) {
  if(!req.session)
    return res.status(500).json({});
  req.session.destroy();
  res.status(200).json({});

}
