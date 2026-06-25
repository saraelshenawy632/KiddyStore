import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { CartItem } from "./components/cart";

export interface ProductItem {
  _id?: string;
  id: number;
  name: string;
  price: string;
  description: string;
  src: string;
  bg: string;
  category: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // جلب المنتجات من سيرفر Vercel الأونلاين المربوط بـ Atlas
  useEffect(() => {
    fetch("https://kiddyvibe-backend.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product: { id: number; name: string; price: string; src: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-950 flex flex-col items-center justify-center text-white font-sans gap-4">
        <div className="w-12 h-12 border-4 border-neutral-800 border-t-white rounded-full animate-spin"></div>
        <span className="text-sm font-bold text-neutral-400 tracking-wide animate-pulse">
          جاري تحميل عالم طفلك... 
        </span>
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full min-h-screen bg-neutral-900 text-white font-sans">
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              products={products} 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              addToCart={addToCart} 
              totalItems={totalItems} 
              totalPrice={calculateTotalPrice()} 
            />
          } 
        />
        <Route 
          path="/products" 
          element={
            <Products 
              products={products} 
              cartItems={cartItems} 
              setCartItems={setCartItems} 
              addToCart={addToCart} 
              totalItems={totalItems} 
              totalPrice={calculateTotalPrice()} 
            />
          } 
        />
      </Routes>
    </div>
  );
}