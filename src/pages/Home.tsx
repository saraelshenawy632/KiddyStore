import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import HeroSection from "../components/HeroSection";
import StoreSection from "../components/StoreSection";
import FooterSection from "../components/FooterSection";
import Cart, { CartItem } from "../components/cart";
import Checkout from "../components/Checkout";
import WhyUsSection from "../components/WhyUsSection";

type ActiveView = "hero" | "store" | "why-us";

export default function Home() {
  const [view, setView] = useState<ActiveView>("hero");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleExplore = () => {
    setView("store");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBackToHero = () => {
    setView("hero");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addToCart = (product: {
    id: number;
    name: string;
    price: string;
    src: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
      return acc + numericPrice * item.quantity;
    }, 0);
    return `${total} ج.م`;
  };

  const handleOrderSuccess = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setOrderSuccess(true);
  };

  return (
    <main className="w-full relative bg-neutral-950 min-h-screen overflow-x-hidden">
      {orderSuccess ? (
        <div className="fixed inset-0 bg-neutral-950 z-50 flex flex-col items-center justify-center p-6 text-white text-center">
          <CheckCircle className="w-14 h-14 text-emerald-500 animate-bounce mb-6" />
          <h1 className="text-3xl font-black mb-3">تم استلام طلبك بنجاح! </h1>
          <button
            onClick={() => {
              setOrderSuccess(false);
              setView("hero");
            }}
            className="bg-white text-black font-black px-8 py-4 rounded-xl"
          >
            العودة للتسوق
          </button>
        </div>
      ) : (
        <>
          {view === "hero" && (
            <HeroSection
              onExplore={handleExplore}
              cartCount={totalItems}
              onOpenCart={() => setIsCartOpen(true)}
              onScrollToWhyUs={() => {
                setView("why-us");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            />
          )}

          {view === "store" && (
            <div className="animate-fadeIn">
              <header className="w-full flex items-center justify-between px-6 md:px-12 py-6 border-b border-neutral-900 sticky top-0 bg-neutral-950/90 backdrop-blur-md z-40">
                <button
                  onClick={handleBackToHero}
                  className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all border border-neutral-800"
                  dir="rtl"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>العودة للرئيسية</span>
                </button>

                <button
                  onClick={() => {
                    setView("why-us");
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  className="text-white font-semibold text-sm hover:opacity-70 transition hidden sm:block"
                >
                  لماذا نحن؟
                </button>

                <div
                  onClick={() => setIsCartOpen(true)}
                  className="relative cursor-pointer p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                </div>
              </header>

              <StoreSection onAddToCart={addToCart} />
              <FooterSection />
            </div>
          )}

          {view === "why-us" && (
            <div className="animate-fadeIn min-h-screen flex flex-col justify-between">
              <div>
                <header className="w-full flex items-center justify-between px-6 md:px-12 py-6 border-b border-neutral-900 sticky top-0 bg-neutral-950/90 backdrop-blur-md z-40">
                  <button
                    onClick={handleBackToHero}
                    className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all border border-neutral-800"
                    dir="rtl"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>العودة للرئيسية</span>
                  </button>
                  <span className="text-xl font-black text-white tracking-wider hidden sm:block">
                    KIDDYVIBE
                  </span>
                </header>

                <WhyUsSection />
              </div>

              <FooterSection />
            </div>
          )}

          {/* المكونات العائمة (السلة والدفع) */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            setCartItems={setCartItems}
            onCheckoutOpen={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />
          <Checkout
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            cartItems={cartItems}
            totalPrice={calculateTotalPrice()}
            onOrderSuccess={handleOrderSuccess}
          />
        </>
      )}
    </main>
  );
}
