const plans = [
  {
    name: 'Single Pup',
    price: '24.99',
    blurb: 'One pet, one keychain.',
    features: ['1 custom keychain', 'Full-color resin', 'Digital proof', 'Free shipping'],
    cta: 'Order one',
    featured: false,
  },
  {
    name: 'Dynamic Duo',
    price: '44.99',
    blurb: 'Two best friends, together.',
    features: [
      '2 custom keychains',
      'Full-color resin',
      'Digital proof',
      'Free express shipping',
      'Gift wrapping included',
    ],
    cta: 'Most popular',
    featured: true,
  },
  {
    name: 'Whole Pack',
    price: '59.99',
    blurb: 'The entire furry family.',
    features: [
      '3 custom keychains',
      'Full-color resin',
      'Digital proof',
      'Free express shipping',
      'Gift wrapping included',
    ],
    cta: 'Order the pack',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Pricing</span>
          <h2 className="section__title">Pick your pack</h2>
          <p className="section__lead">
            Simple pricing, free shipping on every order. No hidden fees.
          </p>
        </div>

        <div className="pricing__grid">
          {plans.map((plan) => (
            <article
              className={`plan card ${plan.featured ? 'plan--featured' : ''}`}
              key={plan.name}
            >
              {plan.featured && <span className="plan__badge">Best value</span>}
              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__blurb">{plan.blurb}</p>
              <p className="plan__price">
                <span className="plan__currency">$</span>
                {plan.price}
              </p>
              <ul className="plan__features">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#order"
                className={`btn btn--lg ${plan.featured ? 'btn--primary' : 'btn--ghost'}`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
