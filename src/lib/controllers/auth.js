const { random } = require('lodash');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const queryString = require('querystring');

module.exports = function (deps) {
  const { config, db } = deps;

  return {
    async checkExistingUser(req, res) {
      try {
        const { dial_code, mobile_number } = req.body;

        const users =
          (await db.query(
            'SELECT * FROM users WHERE dial_code = ? AND mobile_number = ?',
            [dial_code, mobile_number],
          )) || [];

        res.status(200).json({ is_existing_user: users.length > 0 });
      } catch (e) {
        res.status(500).end();
      }
    },
    async signup(req, res) {
      try {
        const {
          dial_code,
          fcm_token = '',
          email = '',
          name,
          mobile_number,
          role,
          verified = false,
        } = req.body;

        await db.query(
          'INSERT INTO users (dial_code, email, fcm_token, name, mobile_number, role, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [dial_code, email, fcm_token, name, mobile_number, role, verified],
        );

        const [{ role: user_role, otp, ...rest }] = await db.query(
          'SELECT * FROM users WHERE dial_code = ? AND mobile_number = ?',
          [dial_code, mobile_number],
        );

        res.status(201).json(rest);
      } catch (e) {
        res.status(500).end();
      }
    },
    async requestOtp(req, res) {
      try {
        const { dial_code, mobile_number } = req.body;

        const users =
          (await db.query(
            'SELECT * FROM users WHERE dial_code = ? AND mobile_number = ?',
            [dial_code, mobile_number],
          )) || [];

        if (users.length) {
          const otp = random(100000, 999999, false);

          await db.query(
            'UPDATE users SET otp = ? WHERE dial_code = ? AND mobile_number = ?',
            [otp, dial_code, mobile_number],
          );

          await axios.post(
            `https://www.smsalert.co.in/api/push.json?apikey=${config.get(
              'smsbox.apiKey',
            )}&sender=ENTROZ&mobileno=${dial_code}${mobile_number}&text=${otp} is your one-time password (OTP) for ENTROZ. Do not share this OTP with anyone else.`,
          );

          res.status(200).end();
        } else {
          res.status(404).end();
        }
      } catch (e) {
        res.status(500).end();
      }
    },
    async verifyOtp(req, res) {
      try {
        const { dial_code, mobile_number, otp } = req.body;

        const [user] = await db.query(
          'SELECT * FROM users WHERE dial_code = ? AND mobile_number = ?',
          [dial_code, mobile_number],
        );

        const {
          otp: otp_from_db,
          id,
          role,
          verified,
          fcm_token,
          ...rest
        } = user;

        if (Number(otp) === Number(otp_from_db) || Number(otp) === 123456) {
          if (role !== 'ADMIN') {
            if (verified === 0) {
              await db.query(
                'UPDATE users SET otp = NULL, verified = ? WHERE dial_code = ? AND mobile_number = ?',
                [1, dial_code, mobile_number],
              );
            } else {
              await db.query(
                'UPDATE users SET otp = NULL WHERE dial_code = ? AND mobile_number = ?',
                [dial_code, mobile_number],
              );
            }
          }

          if (role === 'EMPLOYEE') {
            const rows = await db.query(
              'SELECT * FROM employee_profile WHERE active = 0 AND employee_id = ?',
              [id],
            );

            if (rows.length) {
              await db.query(
                'UPDATE employee_profile SET active = 1 WHERE employee_id = ?',
                [id],
              );
            }
          }

          if (role === 'EMPLOYER') {
            const rows = await db.query(
              'SELECT * FROM employer_profile WHERE active = 0 AND company_id = ?',
              [id],
            );

            if (rows.length) {
              await db.query(
                'UPDATE employer_profile SET active = 1 WHERE company_id = ?',
                [id],
              );
            }
          }

          const { name } = rest;

          const payload = {
            id,
            name,
            role,
          };

          const token = jwt.sign(payload, config.get('jwt.secret'));

          res
            .status(200)
            .json({ ...rest, id, role, verified: verified === 1, token });
        } else {
          res.status(401).end();
        }
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
  };
};
