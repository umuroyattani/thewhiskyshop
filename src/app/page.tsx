import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import SpotlightBanner from "@/components/SpotlightBanner";
import BestSellers from "@/components/BestSellers";
import ArtOfWhisky from "@/components/ArtOfWhisky";
import FeaturedSelection from "@/components/FeaturedSelection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eaeaea] p-1.5 sm:p-2.5 md:p-3.5 flex justify-center">
      {/* Outer Webpage Canvas with Visible Rounded Border */}
      <main className="w-full max-w-[1500px] bg-white text-neutral-900 rounded-[20px] sm:rounded-[30px] md:rounded-[36px] border border-neutral-300/90 shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden">
        <Navbar />
        <Hero />
        <CategoryGrid />
        <SpotlightBanner />
        <BestSellers />
        <ArtOfWhisky />
        <FeaturedSelection />
        <Newsletter />
        <Footer />
        <CartDrawer />
      </main>
    </div>
  );
}
