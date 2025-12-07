import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import { ProductCard } from './components/ProductCard';
import { Product, ProductType } from './types';
import { Search, Filter, Loader2, ArrowUpRight } from 'lucide-react';

// --- MOCK DATA FOR UI DEVELOPMENT ---
// In a real scenario, this comes from api.ts
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Macallan 18 Year Old Sherry Oak',
    slug: 'macallan-18-sherry',
    type: ProductType.WHISKY,
    origin_country: 'Scotland',
    price_min: 350,
    price_max: 450,
    description: 'Iconic Macallan, rich with mature oak, ginger and raisin flavors.',
    tasting_notes: 'Dried fruits, ginger, hints of cinnamon and vanilla.',
    image_url: 'https://picsum.photos/400/600?random=1',
    affiliate_url: 'https://example.com',
    available: true
  },
  {
    id: '2',
    title: 'Cohiba Behike 52',
    slug: 'cohiba-behike-52',
    type: ProductType.CIGAR,
    origin_country: 'Cuba',
    price_min: 150,
    price_max: 200,
    description: 'The most exclusive line of the most exclusive Habanos brand.',
    tasting_notes: 'Creamy, earthy, with notes of coffee and leather.',
    image_url: 'https://picsum.photos/400/600?random=2',
    affiliate_url: 'https://example.com',
    available: true
  },
  {
    id: '3',
    title: 'Sassicaia 2018',
    slug: 'sassicaia-2018',
    type: ProductType.WINE,
    origin_country: 'Italy',
    price_min: 280,
    price_max: 320,
    description: 'A benchmark Super Tuscan.',
    tasting_notes: 'Black currant, cedar, exotic spice and crushed mint.',
    image_url: 'https://picsum.photos/400/600?random=3',
    affiliate_url: 'https://example.com',
    available: true
  }
];

// --- PAGES ---

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-900/50 to-transparent z-10" />
        <div className="absolute inset-0">
            <img 
                src="https://picsum.photos/1920/1080?grayscale" 
                alt="Luxury Background" 
                className="w-full h-full object-cover opacity-40"
            />
        </div>
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
            Curated <span className="text-gold-500">Excellence</span>
          </h1>
          <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
            Discover the world's finest whiskies, wines, and cigars. Track your collection. Join exclusive events.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for 'Japanese Whisky'..."
              className="w-full bg-obsidian-900/90 border border-obsidian-700 text-white pl-12 pr-4 py-4 rounded-full focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 placeholder-neutral-500 backdrop-blur-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif text-white">Trending Collections</h2>
            <button className="flex items-center gap-2 text-gold-500 hover:text-gold-400 text-sm font-medium">
                <Filter className="h-4 w-4" /> Filters
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    // In real app, fetch via api.products.detail(slug)
    const product = MOCK_PRODUCTS.find(p => p.slug === slug);
    const [loading, setLoading] = useState(false);

    if (!product) return <div className="p-12 text-center text-neutral-400">Product not found</div>;

    const handleAffiliateClick = () => {
        window.open(product.affiliate_url, '_blank');
        // Fire analytics event here
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-[3/4] bg-obsidian-900 rounded-lg overflow-hidden border border-obsidian-800">
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-2 text-gold-500 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest border border-gold-500/30 px-2 py-0.5 rounded">
                                {product.type}
                            </span>
                            <span className="text-neutral-500 text-sm">•</span>
                            <span className="text-neutral-400 text-sm">{product.origin_country}</span>
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-white mb-4">{product.title}</h1>
                        <p className="text-2xl font-mono text-gold-400">${product.price_min}</p>
                    </div>

                    <div className="bg-obsidian-900/50 p-6 rounded-lg border border-obsidian-800">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3">Tasting Notes</h3>
                        <p className="text-neutral-200 italic leading-relaxed">"{product.tasting_notes}"</p>
                    </div>

                    <div className="prose prose-invert text-neutral-400">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={handleAffiliateClick}
                            className="w-full bg-gold-600 hover:bg-gold-500 text-obsidian-950 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            Buy from Vendor <ArrowUpRight className="h-5 w-5" />
                        </button>
                        <button className="w-full bg-obsidian-800 hover:bg-obsidian-700 text-white font-medium py-3 rounded-lg transition-colors border border-obsidian-700">
                            Add to My Vault
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventsPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h2 className="text-3xl font-serif text-white mb-4">Exclusive Events</h2>
            <p className="text-neutral-400">Coming soon to your city.</p>
        </div>
    );
}

const VaultPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-serif text-white mb-8 border-b border-obsidian-800 pb-4">My Collection</h2>
            <div className="text-center py-20 bg-obsidian-900/30 rounded-lg border border-dashed border-obsidian-800">
                <p className="text-neutral-500">Your vault is empty. Start discovering.</p>
            </div>
        </div>
    );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;