import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default defineEventHandler(async (event) => {
  console.log('event', event.req.method)
  if (event.req.method === 'GET') {
    try {
      const urlParams = new URLSearchParams(event.req.url.split('?')[1]); // Extract query parameters

      const sessionId = urlParams.get('session_id'); // Get the value of the 'session_id' parameter
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      return { session };
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
