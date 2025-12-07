
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import { ProductCard } from './components/ProductCard';
import { Product, ProductType } from './types';
import { Search, Filter, Loader2, ArrowUpRight, X } from 'lucide-react';
import { endpoints } from './services/api';

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
  },
  {
    id: '4',
    title: 'Yamazaki 12',
    slug: 'yamazaki-12',
    type: ProductType.WHISKY,
    origin_country: 'Japan',
    price_min: 200,
    price_max: 250,
    description: 'Pioneering Japanese single malt.',
    tasting_notes: 'Peach, pineapple, grapefruit, clove, candied orange.',
    image_url: 'https://picsum.photos/400/600?random=4',
    affiliate_url: 'https://example.com',
    available: true
  }
];

// --- PAGES ---

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter States
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({ min: 0, max: 2000 });

  // Extract unique origins for filter dropdown
  const origins = useMemo(() => {
    const allOrigins = MOCK_PRODUCTS.map(p => p.origin_country);
    return ['all', ...Array.from(new Set(allOrigins))];
  }, []);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || p.type === selectedType;
      const matchesOrigin = selectedOrigin === 'all' || p.origin_country === selectedOrigin;
      const matchesPrice = p.price_min >= priceRange.min && p.price_max <= priceRange.max;
      
      return matchesSearch && matchesType && matchesOrigin && matchesPrice;
    });
  }, [searchTerm, selectedType, selectedOrigin, priceRange]);

  return (
    <div className="space-y-12 pb-12 relative">
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

      {/* Main Content Area with Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Sidebar - Mobile Toggle / Desktop Sticky */}
          <div className={`
            fixed inset-y-0 left-0 z-40 w-80 bg-obsidian-900/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out border-r border-obsidian-800 p-6 overflow-y-auto
            lg:relative lg:transform-none lg:bg-transparent lg:border-none lg:w-64 lg:p-0 lg:block
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
             <div className="flex items-center justify-between mb-8 lg:hidden">
               <span className="text-xl font-serif text-white">Filters</span>
               <button onClick={() => setIsFilterOpen(false)}><X className="text-neutral-400" /></button>
             </div>

             <div className="space-y-8 sticky top-24">
                {/* Type Filter */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-4">Category</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={selectedType === 'all'}
                        onChange={() => setSelectedType('all')}
                        className="form-radio text-gold-500 bg-obsidian-900 border-obsidian-700 focus:ring-gold-500" 
                      />
                      <span className="text-neutral-300 group-hover:text-white transition-colors">All Categories</span>
                    </label>
                    {Object.values(ProductType).map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="type"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(type)}
                          className="form-radio text-gold-500 bg-obsidian-900 border-obsidian-700 focus:ring-gold-500" 
                        />
                        <span className="text-neutral-300 group-hover:text-white transition-colors capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Origin Filter */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-4">Origin</h3>
                  <select 
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full bg-obsidian-900 border border-obsidian-700 text-neutral-300 rounded p-2 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none"
                  >
                    <option value="all">All Countries</option>
                    {origins.filter(o => o !== 'all').map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gold-500 mb-4">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full bg-obsidian-900 border border-obsidian-700 text-neutral-300 rounded p-2 text-sm"
                      placeholder="Min"
                    />
                    <span className="text-neutral-500">-</span>
                    <input 
                      type="number" 
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full bg-obsidian-900 border border-obsidian-700 text-neutral-300 rounded p-2 text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif text-white">
                  {selectedType === 'all' ? 'Trending Collections' : `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Collection`}
                </h2>
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-gold-500 hover:text-gold-400 text-sm font-medium"
                >
                    <Filter className="h-4 w-4" /> Filters
                </button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-obsidian-800 rounded-lg">
                <p className="text-neutral-500">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedOrigin('all');
                    setPriceRange({ min: 0, max: 2000 });
                    setSearchTerm('');
                  }}
                  className="mt-4 text-gold-500 hover:text-gold-400 text-sm"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Overlay for mobile filter */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
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
