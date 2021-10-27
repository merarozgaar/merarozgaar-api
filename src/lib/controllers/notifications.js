const axios = require('axios');
const notificationClient = require('../../utils/notificationClient');

module.exports = function (deps) {
  const { config, db } = deps;

  return {
    async getNotifications(req, res) {
      try {
        const { id } = req.user;

        const rows = await db.query(
          'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
          [id],
        );

        res.status(200).json(rows);
      } catch (e) {
        res.status(500).end();
      }
    },
    async create(req, res) {
      try {
        const { id } = req.user;

        const { user_id, title, body, type } = req.body;

        const rows = await db.query('SELECT * FROM users WHERE id = ?', [
          Number(user_id),
        ]);

        console.log(req.body);

        if (rows.length) {
          const { fcm_token } = rows[0];

          const { insertId } = await db.query(
            'INSERT INTO notifications (body, created_by, title, type, user_id) VALUES (?, ?, ?, ?, ?)',
            [body, id, title, type, user_id],
          );

          const { data } = await notificationClient.post('', {
            to: fcm_token,
            data: { id: insertId },
            notification: {
              body,
              title,
            },
            priority: 'high',
          });

          console.log(data);
        }

        res.status(200).end();
      } catch (e) {
        console.log(e);
        res.status(500).end();
      }
    },
    async updateToken(req, res) {
      try {
        const { id } = req.user;

        const { token } = req.body;

        await db.query('UPDATE users SET fcm_token = ? WHERE id = ?', [
          token,
          id,
        ]);

        res.status(200).end();
      } catch (e) {
        res.status(500).end();
      }
    },
  };
};
