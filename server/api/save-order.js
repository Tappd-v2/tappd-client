import pg from 'pg';

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let order = {
  userId: null,
  amount: null,
  receipt_url:  null,
  created_at: null,
};

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
    const eventType = body.type;
    const object = body.data.object;

    if (eventType === 'charge.succeeded') {
      order.amount = object.amount / 100; // Stripe sends in cents, but we want to store the amount in euros
      order.receipt_url = object.receipt_url;
    }

    if(eventType === 'checkout.session.completed') {
      order.userId = object.metadata.userId;
      order.created_at = new Date();
    }

    if (Object.values(order).some(value => value === null)) {
      return; // return nothing to indicate that the order is not complete
    }

    try {
      await saveOrderToDatabase(order);
      event.res.statusCode = 200;
      return { order };
    } catch (err) {
      console.error('Failed to save order to database', err);
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
    INSERT INTO orders (user_id, amount, receipt_url, created_at)
    VALUES ($1, $2, $3, $4)
  `;
  const values = [order.userId, order.amount, order.receipt_url, order.created_at];
  console.log('Saving order to database:', values);
  try {
    await client.query(query, values);
    order = {
      userId: null,
      amount: null,
      receipt_url: null,
      created_at: null,
    };
  } catch (err) {
    console.error('Failed to save order to database', err);
    throw new Error('Failed to save order to database');
  }
}
