import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, CheckCircle } from "lucide-react";
import StoreSection from "../components/StoreSection";
import FooterSection from "../components/FooterSection";
import Cart, { CartItem } from "../components/cart";
import Checkout from "../components/Checkout";

export default function ProductsPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

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
    <div className="w-full min-h-screen bg-neutral-950 text-white relative">
      {orderSuccess ? (
        <div className="fixed inset-0 bg-neutral-950 z-50 flex flex-col items-center justify-center p-6 text-white text-center animate-fadeIn">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
            <CheckCircle className="w-14 h-14 text-emerald-500 animate-bounce" />
          </div>
          <h1 className="text-3xl font-black mb-3">تم استلام طلبك بنجاح! 🎉</h1>
          <p
            className="text-neutral-400 font-medium max-w-md mb-8 leading-relaxed"
            dir="rtl"
          >
            شكراً لثقتك بنا، سيقوم أحد ممثلي خدمة العملاء بالتواصل معك هاتفياً
            عبر الرقم المسجل لتأكيد وتجهيز الشحن خلال 24 ساعة.
          </p>
          <button
            onClick={() => setOrderSuccess(false)}
            className="bg-white text-black font-black px-8 py-4 rounded-xl hover:bg-neutral-200 transition"
          >
            العودة للمتجر
          </button>
        </div>
      ) : (
        <>
          <header className="w-full flex items-center justify-between px-6 md:px-12 py-6 border-b border-neutral-900 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 hover:bg-neutral-900 rounded-full transition flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
              <span className="text-xl font-black tracking-wider">
                KIDDYVIBE
              </span>
            </div>

            <div
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:scale-105 transition active:scale-95"
            >
              <ShoppingBag className="text-white" />
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </div>
          </header>

          <main className="py-8">
            <StoreSection onAddToCart={addToCart} />
          </main>

          <FooterSection />

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
    </div>
  );
}
