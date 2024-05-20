import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
    client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'')
      .then(res => {
        console.log('Tables:', res.rows.map(row => row.table_name).join(', '));
      })
      .catch(err => {
        console.error('Failed to query PostgreSQL database', err);
      });
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL database', err);
  });

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    try {
      const items = await client.query('SELECT * FROM items')
      const categories = await client.query('SELECT * FROM categories')
      return { items: items.rows, categories: categories.rows };
    } catch (err) {
      event.res.statusCode = 500;
      return { error: err.message };
    }
  } else {
    event.res.setHeader('Allow', 'GET');
    event.res.statusCode = 405;
    return { error: 'Method Not Allowed' };
  }
});
