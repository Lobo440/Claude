import { useEffect, useState } from 'react';

const links = [
  { href: '#how', label: 'How it works' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#reviews', label: 'Reviews' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand">
          <span className="navbar__paw" aria-hidden="true">🐾</span>
          PawTag<span className="navbar__brand-accent">3D</span>
        </a>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#order" className="btn btn--primary navbar__cta" onClick={() => setOpen(false)}>
            Create yours
          </a>
        </nav>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
