import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)
    const { items } = body

    const transformedItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }))

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
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
