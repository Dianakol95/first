const unirest = require('unirest');

function sendOTP(phn, otp) {
  const req = unirest('POST', 'https://www.fast2sms.com/dev/bulkV2');

  const authKey =
    'JKZRDQ5fhosH2wPaNSM0G8xVWl4FubyernBU39YzEmgt7kcXApAw0aYZPqK29iOR7QlImGD48H6NLsoT';

  req.headers({
    authorization: authKey,
  });

  req.form({
    variables_values: otp,
    route: 'otp',
    numbers: phn,
  });

  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
}

module.exports = {
  sendOTP,
};
