/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */
import request from 'request';
'use strict';

// Gets a list of Things
export function init(req, res) {
  if(req.session && req.session.userInfo)
    res.status(200).json(req.session.userInfo);
  else
    res.status(200).json(null);
}

export function edit(req, res) {
  if(!req.session || !req.session.apiPassword)
    return res.status(403).json("Not currently logged in");
  let options = {
    rejectUnauthorized: false,
    url: 'http://dev.parkingpanda.com/api/v2/users/' + req.session.userid,
    method: 'PUT',
    contentType: 'application/json',
    headers: {
      Authorization: req.session.apiPassword
    },
    json: req.body
  };

  request(options, (error, response, body) => {
    if(!body) 
      return res.status(response.statusCode).json(`Error Code: ${response.statusCode}`);
    if(!body.success || !body.data){
      let errorMessage = body.message || 'Edit failed but no error message was received';
      return res.status(response.statusCode).json(errorMessage);
    }
    let data = {
      email: body.data.email,
      firstName: body.data.firstName,
      lastName: body.data.lastName,
      receiveEmail: body.data.receiveEmail,
      phone: body.data.phone,
      receiveSmsNotifications: body.data.receiveSmsNotifications,
    };
    req.session.userInfo = data;
    res.status(response.statusCode).json(data);
  });
}
