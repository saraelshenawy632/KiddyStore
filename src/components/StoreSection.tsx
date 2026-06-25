import { useState } from "react";
import { Heart, Star, ShoppingBag, CheckCircle } from "lucide-react";

interface StoreProps {
  products: any[]; // استقبال المنتجات ديناميكياً
  onAddToCart: (product: any) => void;
}

export default function StoreSection({ products, onAddToCart }: StoreProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("الكل");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id],
    );
  };

  const handleCartClick = (product: any) => {
    onAddToCart(product);
    setToastMessage(`تم إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts =
    activeCategory === "الكل"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const categories = ["الكل", "حديثي ولادة", "أولاد", "بنات"];

  return (
    <section
      id="products"
      className="py-16 px-3 sm:px-6 md:px-12 max-w-7xl mx-auto relative bg-neutral-950 text-white"
    >
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-white text-neutral-950 px-5 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-3 animate-bounce text-sm sm:text-base">
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-1">
        <div className="text-right">
          <span className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-widest block mb-1">
            اكتشفي تشكيلتنا
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            الأكثر مبيعاً هذا الأسبوع
          </h2>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-2 justify-start mb-8 overflow-x-auto pb-2 scrollbar-none px-1"
        dir="rtl"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${activeCategory === cat ? "bg-white text-black shadow-lg scale-105" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {filteredProducts.map((product) => {
          const isFavorite = favorites.includes(product.id);
          return (
            <div
              key={product.id}
              className="group bg-neutral-900/40 rounded-xl p-3 sm:p-4 border border-neutral-900 hover:border-neutral-800 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-3 flex items-center justify-center bg-white p-2 sm:p-4 shadow-inner">
                <img
                  src={product.src}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transform transition duration-500 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500";
                  }}
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 left-2 p-1.5 bg-neutral-950/40 hover:bg-neutral-950 rounded-full text-white transition-all z-10 backdrop-blur-sm"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
                  />
                </button>
              </div>

              <div className="text-right flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-neutral-400 bg-neutral-900/60 px-1.5 py-0.5 rounded">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 text-[10px] sm:text-xs font-bold">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>4.9</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base md:text-lg mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-2 leading-relaxed min-h-[2rem] sm:min-h-[2.25rem]">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 sm:mt-5">
                  <span className="font-black text-white text-sm sm:text-base md:text-lg">
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleCartClick(product)}
                    className="p-2 sm:p-2.5 bg-white text-black hover:bg-neutral-200 rounded-lg sm:rounded-xl transition-all active:scale-95 flex items-center justify-center"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}