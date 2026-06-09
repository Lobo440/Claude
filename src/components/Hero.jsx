import useCountUp from '../hooks/useCountUp.js';

function Stat({ end, suffix = '', label }) {
  const [ref, value] = useCountUp(end);
  return (
    <li ref={ref}>
      <strong>
        {value.toLocaleString()}
        {suffix}
      </strong>
      {label}
    </li>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Drifting paw prints in the background */}
      <div className="paws" aria-hidden="true">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span className={`paws__item paws__item--${i}`} key={i}>
            🐾
          </span>
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__badge">🐾 Handmade in 3D from your photo</span>
          <h1 className="hero__title">
            Your pet, forever <span className="text-gradient shimmer">in your pocket</span>
          </h1>
          <p className="hero__subtitle">
            Turn a favorite photo of your dog, cat — or any furry, feathery, scaly
            friend — into a beautifully detailed 3D-printed keychain. A tiny replica
            you'll carry every single day.
          </p>
          <div className="hero__actions">
            <a href="#order" className="btn btn--primary btn--lg btn--shine">
              Create your keychain
            </a>
            <a href="#gallery" className="btn btn--ghost btn--lg">
              See examples
            </a>
          </div>
          <ul className="hero__trust">
            <Stat end={12000} suffix="+" label="happy pets" />
            <Stat end={49} label="★ avg (of 50)" />
            <Stat end={100} suffix="%" label="free shipping" />
          </ul>
        </div>

        <div className="hero__art" aria-hidden="true">
          <div className="hero__keychain">
            <div className="hero__ring" />
            <div className="hero__charm">
              <span className="hero__pet">🐶</span>
              <span className="hero__sparkle hero__sparkle--1">✨</span>
              <span className="hero__sparkle hero__sparkle--2">✨</span>
            </div>
          </div>
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
      </div>

      <a href="#how" className="hero__scroll" aria-label="Scroll to learn more">
        <span className="hero__mouse" />
      </a>
    </section>
  );
}
