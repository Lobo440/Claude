import { useState } from 'react';

export default function OrderCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real store this would upload the photo and start checkout.
    setSubmitted(true);
  };

  return (
    <section className="section order" id="order">
      <div className="container">
        <div className="order__card card">
          <div className="order__copy">
            <span className="eyebrow eyebrow--light">Start your keychain</span>
            <h2 className="order__title">Ready to meet your mini pet?</h2>
            <p className="order__lead">
              Upload a photo and tell us a little about your furry friend. We'll send a
              free 3D preview within 48 hours — no payment until you love it.
            </p>
            <ul className="order__perks">
              <li>✅ Free 3D proof before you pay</li>
              <li>✅ 100% happiness guarantee</li>
              <li>✅ Free worldwide shipping</li>
            </ul>
          </div>

          {submitted ? (
            <div className="order__success">
              <span className="order__success-icon" aria-hidden="true">🎉</span>
              <h3>Pawesome — request received!</h3>
              <p>
                Thanks! Our artists will review {fileName ? `“${fileName}”` : 'your photo'} and
                email you a free 3D preview within 48 hours.
              </p>
              <button className="btn btn--ghost" onClick={() => setSubmitted(false)}>
                Submit another pet
              </button>
            </div>
          ) : (
            <form className="order__form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" type="text" required placeholder="Jordan Doe" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="pet">Pet's name &amp; type</label>
                <input id="pet" name="pet" type="text" placeholder="Max, Golden Retriever" />
              </div>
              <div className="field">
                <label htmlFor="photo" className="field__file">
                  <span>{fileName || 'Upload a photo of your pet'}</span>
                  <span className="field__file-btn">Choose file</span>
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="field__file-input"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                />
              </div>
              <button type="submit" className="btn btn--primary btn--lg btn--block">
                Get my free 3D preview
              </button>
              <p className="order__fineprint">
                No payment required now. We'll only charge you once you approve the design.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
