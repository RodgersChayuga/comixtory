import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' })

export async function createCheckoutSession(amount: number) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'HekaHeka Comic NFT'
                    },
                    unit_amount: amount
                },
                quantity: 1
            }
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mint?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/mint?canceled=true`
    })
    return session.url
}