import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import SpotlightBanner from "@/components/SpotlightBanner";
import BestSellers from "@/components/BestSellers";
import ArtOfWhisky from "@/components/ArtOfWhisky";
import FeaturedSelection from "@/components/FeaturedSelection";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian-900 text-gray-200">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <SpotlightBanner />
      <BestSellers />
      <ArtOfWhisky />
      <FeaturedSelection />
      <Testimonials />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </main>
  );
}
