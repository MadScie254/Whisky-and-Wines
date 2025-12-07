import React from 'react';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-obsidian-900 border border-obsidian-800 rounded-lg overflow-hidden hover:border-gold-500/50 transition-all duration-300">
      <div className="aspect-[3/4] overflow-hidden bg-obsidian-950">
        <img 
          src={product.image_url} 
          alt={product.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gold-400 border border-gold-500/20 uppercase">
          {product.type}
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-serif font-medium text-white group-hover:text-gold-400 transition-colors truncate">
            {product.title}
          </h3>
        </div>
        
        <p className="text-sm text-neutral-400 line-clamp-2">
          {product.tasting_notes}
        </p>

        <div className="pt-4 flex items-center justify-between border-t border-obsidian-800 mt-4">
          <span className="text-gold-500 font-mono text-sm">
            ${product.price_min} - ${product.price_max}
          </span>
          <a 
            href={`#/product/${product.slug}`}
            className="text-xs uppercase tracking-widest text-neutral-300 hover:text-white flex items-center gap-1"
          >
            View <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};