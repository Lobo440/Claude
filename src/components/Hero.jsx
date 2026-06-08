export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__badge">🐾 Handmade in 3D from your photo</span>
          <h1 className="hero__title">
            Your pet, forever <span className="text-gradient">in your pocket</span>
          </h1>
          <p className="hero__subtitle">
            Turn a favorite photo of your dog, cat — or any furry, feathery, scaly
            friend — into a beautifully detailed 3D-printed keychain. A tiny replica
            you'll carry every single day.
          </p>
          <div className="hero__actions">
            <a href="#order" className="btn btn--primary btn--lg">
              Create your keychain
            </a>
            <a href="#gallery" className="btn btn--ghost btn--lg">
              See examples
            </a>
          </div>
          <ul className="hero__trust">
            <li><strong>12,000+</strong> happy pets</li>
            <li><strong>4.9/5</strong> average rating</li>
            <li><strong>Free</strong> worldwide shipping</li>
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__keychain">
            <div className="hero__ring" />
            <div className="hero__charm">
              <span className="hero__pet">🐶</span>
            </div>
          </div>
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
      </div>
    </section>
  );
}
