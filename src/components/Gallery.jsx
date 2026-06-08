const samples = [
  { pet: '🐕', name: 'Max', breed: 'Golden Retriever' },
  { pet: '🐈', name: 'Luna', breed: 'Tabby Cat' },
  { pet: '🐩', name: 'Coco', breed: 'Poodle' },
  { pet: '🐰', name: 'Pepper', breed: 'Holland Lop' },
  { pet: '🐕‍🦺', name: 'Rocky', breed: 'German Shepherd' },
  { pet: '🐈‍⬛', name: 'Shadow', breed: 'Bombay Cat' },
  { pet: '🦜', name: 'Mango', breed: 'Conure' },
  { pet: '🐹', name: 'Biscuit', breed: 'Hamster' },
];

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Real keychains</span>
          <h2 className="section__title">A little fan club of finished pieces</h2>
          <p className="section__lead">
            Every keychain is one of a kind — just like its owner.
          </p>
        </div>

        <div className="gallery__grid">
          {samples.map((s) => (
            <figure className="gallery__item" key={s.name}>
              <div className="gallery__charm">
                <span aria-hidden="true">{s.pet}</span>
              </div>
              <figcaption>
                <strong>{s.name}</strong>
                <span>{s.breed}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
