import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";

export default function App() {
  return (
    <div
      dir="rtl"
      className="
w-full 
min-h-screen 
bg-neutral-900 
text-white 
font-sans
"
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}
