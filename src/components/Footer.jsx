export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="navbar__brand">
            <span className="navbar__paw" aria-hidden="true">🐾</span>
            PawTag<span className="navbar__brand-accent">3D</span>
          </a>
          <p>Custom 3D-printed keychains made from your pet's photo.</p>
        </div>

        <nav className="footer__cols">
          <div className="footer__col">
            <h4>Shop</h4>
            <a href="#how">How it works</a>
            <a href="#gallery">Gallery</a>
            <a href="#pricing">Pricing</a>
            <a href="#order">Create yours</a>
          </div>
          <div className="footer__col">
            <h4>Help</h4>
            <a href="#order">Track an order</a>
            <a href="#reviews">Reviews</a>
            <a href="mailto:hello@pawtag3d.com">Contact us</a>
          </div>
          <div className="footer__col">
            <h4>Follow</h4>
            <a href="#top">Instagram</a>
            <a href="#top">TikTok</a>
            <a href="#top">Facebook</a>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <p>© {year} PawTag 3D. Made with 🐾 for pet lovers everywhere.</p>
        <p className="footer__legal">
          <a href="#top">Privacy</a> · <a href="#top">Terms</a>
        </p>
      </div>
    </footer>
  );
}
