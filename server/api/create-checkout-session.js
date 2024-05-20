import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const { items } = body

    const userId = 1; // TODO: Implement user authentication

    const transformedItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }))

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'bancontact'],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
        metadata: { userId },
      })
      return { id: session.id }
    }
    catch (err) {
      event.res.statusCode = 500
      return { error: err.message }
    }

  }
  else {
    event.res.setHeader('Allow', 'POST')
    event.res.statusCode = 405
    return { error: 'Method Not Allowed' }
  }
})

