import Reveal from './Reveal.jsx';

const reviews = [
  {
    text: 'It looks EXACTLY like my dog Biscuit, right down to the floppy ear. I tear up every time I grab my keys.',
    name: 'Sarah M.',
    pet: 'Biscuit the Beagle',
    avatar: '🐶',
  },
  {
    text: 'Ordered one after we lost our cat. Having a little Luna with me everywhere means more than I can say. Thank you.',
    name: 'James R.',
    pet: 'Luna the Tabby',
    avatar: '🐈',
  },
  {
    text: 'The quality blew me away — heavy, detailed, and the colors are perfect. Already ordered three more as gifts.',
    name: 'Priya K.',
    pet: 'Coco the Poodle',
    avatar: '🐩',
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials" id="reviews">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Loved by pet parents</span>
          <h2 className="section__title">12,000+ pets immortalized</h2>
        </Reveal>

        <div className="testimonials__grid">
          {reviews.map((r, i) => (
            <Reveal as="blockquote" className="review card" key={r.name} delay={i * 130}>
              <div className="review__stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="review__text">“{r.text}”</p>
              <footer className="review__author">
                <span className="review__avatar" aria-hidden="true">{r.avatar}</span>
                <span>
                  <strong>{r.name}</strong>
                  <span className="review__pet">{r.pet}</span>
                </span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
