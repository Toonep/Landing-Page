import CanvasWrapper from '@/components/CanvasWrapper';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import Pillars from '@/components/Pillars';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <CanvasWrapper />
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Pillars />
      </main>
      <Footer />
    </>
  );
}
