import Reveal from './Reveal.jsx';

const features = [
  {
    icon: '✨',
    title: 'Lifelike detail',
    text: 'Full-color resin printing captures fur patterns, markings, and that one-of-a-kind expression.',
  },
  {
    icon: '💪',
    title: 'Built to last',
    text: 'Tough, scratch-resistant resin and a solid metal ring stand up to keys, bags, and daily life.',
  },
  {
    icon: '👀',
    title: 'Preview before print',
    text: 'You approve a digital proof of the 3D model first — no surprises, total peace of mind.',
  },
  {
    icon: '🚚',
    title: 'Free fast shipping',
    text: 'Free worldwide delivery with tracking, typically arriving within 7–10 days of approval.',
  },
  {
    icon: '🐾',
    title: 'Any pet, any kind',
    text: 'Dogs, cats, birds, bunnies, reptiles — if you love them, we can sculpt them.',
  },
  {
    icon: '💝',
    title: 'The perfect gift',
    text: 'A heartfelt, personal present for pet parents — and a sweet way to remember a furry friend.',
  },
];

export default function Features() {
  return (
    <section className="section features">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Why PawTag 3D</span>
          <h2 className="section__title">Crafted with care, made to be carried</h2>
        </Reveal>

        <div className="features__grid">
          {features.map((f, i) => (
            <Reveal as="article" className="feature card" key={f.title} delay={(i % 3) * 110}>
              <span className="feature__icon" aria-hidden="true">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
