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
  if (event.req.method === 'POST') {
    const body = await readBody(event);

    try {
      const order = {
        name: body.data.object.billing_details.name,
        email: body.data.object.billing_details.email,
        amount: body.data.object.amount,
        receipt_url: body.data.object.receipt_url,
        created_at: new Date(),
      }
      await saveOrderToDatabase(order);
      event.res.json({ message: 'Order created successfully' });
    } catch (err) {
      event.res.statusCode = 500;
      return { error: err.message };
    }
  } else {
    event.res.setHeader('Allow', 'POST');
    event.res.statusCode = 405;
    return { error: 'Method Not Allowed' };
  }
});

async function saveOrderToDatabase(order) {
  const query = `
    INSERT INTO orders (name, email, amount, receipt_url, created_at)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [order.name, order.email, order.amount, order.receipt_url, order.created_at];
  try {
    await client.query(query, values);
  } catch (err) {
    console.error('Failed to save order to database', err);
    throw new Error('Failed to save order to database');
  }
}
