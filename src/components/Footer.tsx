export default function Footer() {
  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-800 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-[0.2em] font-bold text-obsidian-800 select-none block uppercase">
            THE WHISKY SHOP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-xs">
          <div>
            <h5 className="font-serif text-sm text-white uppercase tracking-wider mb-4">Cellar</h5>
            <ul className="space-y-2">
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Speyside Single Malts</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Islay Peated Expressions</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Japanese Whiskies</a></li>
              <li><a href="#collections" className="hover:text-gold-400 transition-colors">Rare Vintage Allocations</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm text-white uppercase tracking-wider mb-4">Concierge</h5>
            <ul className="space-y-2">
              <li><a href="#craftsmanship" className="hover:text-gold-400 transition-colors">Corporate Gifting & Engraving</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Nairobi Express Dispatch</a></li>
              <li><a href="#craftsmanship" className="hover:text-gold-400 transition-colors">Tasting Masterclasses</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Private Cellar Consultation</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-serif text-sm text-white uppercase tracking-wider mb-4">Payment Support</h5>
            <div className="space-y-2 text-gray-400">
              <p>• Safaricom M-Pesa STK Direct</p>
              <p>• Visa, Mastercard, American Express</p>
              <p>• Pesapal Secure Gateway</p>
            </div>
          </div>

          <div>
            <h5 className="font-serif text-sm text-white uppercase tracking-wider mb-4">Legal</h5>
            <p className="text-[11px] leading-relaxed text-gray-500">
              Strictly for individuals aged 18 and older. Excessive consumption of alcohol is harmful to your health. Please drink responsibly.
            </p>
          </div>
        </div>

        <div className="border-t border-obsidian-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-600 gap-4">
          <p>© {new Date().getFullYear()} The Whisky Shop Kenya. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">TERMS OF USE</a>
            <a href="#" className="hover:text-gray-400 transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-gray-400 transition-colors">CONTACT</a>
          </div>
          <p>Crafted with Next.js 15 & Luxury Headless Commerce</p>
        </div>
      </div>
    </footer>
  );
}
