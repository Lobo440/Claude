import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Gallery from './components/Gallery.jsx';
import Features from './components/Features.jsx';
import Pricing from './components/Pricing.jsx';
import Testimonials from './components/Testimonials.jsx';
import OrderCTA from './components/OrderCTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Gallery />
        <Features />
        <Pricing />
        <Testimonials />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
