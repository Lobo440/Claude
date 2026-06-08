const steps = [
  {
    icon: '📸',
    title: 'Upload a photo',
    text: 'Send us a clear photo of your pet. A good side or front shot is all we need to capture their personality.',
  },
  {
    icon: '🎨',
    title: 'We sculpt the model',
    text: 'Our artists craft a detailed 3D model of your pet and share a preview for your approval before printing.',
  },
  {
    icon: '📦',
    title: 'Get your keychain',
    text: 'We print it in durable, full-color resin and ship it straight to your door, ready to clip onto anything.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Simple process</span>
          <h2 className="section__title">From photo to pocket in 3 steps</h2>
          <p className="section__lead">
            No design skills needed. You send the photo, we handle the magic.
          </p>
        </div>

        <ol className="how__steps">
          {steps.map((step, i) => (
            <li className="how__step card" key={step.title}>
              <span className="how__num">{i + 1}</span>
              <span className="how__icon" aria-hidden="true">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
