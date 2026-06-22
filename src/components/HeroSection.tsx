import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "../data/products";

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(#n)' opacity='0.06'/></svg>`;
const GRAIN_URI = `data:image/svg+xml;base64,${btoa(GRAIN_SVG)}`;

interface HeroProps {
  onExplore: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToWhyUs: () => void;
}

type Role = "center" | "left" | "right" | "back";
type Direction = "next" | "prev";

function getRole(index: number, activeIndex: number): Role {
  if (index === activeIndex) return "center";
  if (index === (activeIndex + 3) % 4) return "left";
  if (index === (activeIndex + 1) % 4) return "right";
  return "back";
}

function getRoleStyle(role: Role, isMobile: boolean): React.CSSProperties {
  const transition =
    "transform 700ms cubic-bezier(0.25,1,0.5,1), opacity 700ms ease";
  const base: React.CSSProperties = {
    position: "absolute",
    aspectRatio: "0.65 / 1",
    transition,
    willChange: "transform,opacity",
  };

  switch (role) {
    case "center":
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.2 : 1.4})`,
        opacity: 1,
        zIndex: 20,
        left: "50%",
        height: isMobile ? "50%" : "72%",
        bottom: isMobile ? "28%" : "12%",
      };
    case "left":
      return {
        ...base,
        transform: "translateX(-50%) scale(.85)",
        opacity: 0.5,
        zIndex: 10,
        left: isMobile ? "15%" : "26%",
        height: isMobile ? "32%" : "48%",
        bottom: "20%",
      };
    case "right":
      return {
        ...base,
        transform: "translateX(-50%) scale(.85)",
        opacity: 0.5,
        zIndex: 10,
        left: isMobile ? "85%" : "74%",
        height: isMobile ? "32%" : "48%",
        bottom: "20%",
      };
    case "back":
      return {
        ...base,
        transform: "translateX(-50%) scale(.7)",
        opacity: 0,
        zIndex: 5,
        left: "50%",
        height: "30%",
        bottom: "20%",
      };
  }
}

export default function HeroSection({
  onExplore,
  cartCount,
  onOpenCart,
  onScrollToWhyUs,
}: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimating = useRef(false);
  const timer = useRef<any>(null);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const navigate = useCallback((dir: Direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveIndex((prev) =>
      dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4,
    );
    setTimeout(() => {
      isAnimating.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      navigate("next");
    }, 3000);
    return () => clearInterval(timer.current);
  }, [navigate]);

  const currentProduct = PRODUCTS[activeIndex];

  return (
    <section
      style={{
        backgroundColor: currentProduct.bg,
        transition: "background-color 700ms ease",
      }}
      className="relative w-full h-screen overflow-hidden select-none"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          pointerEvents: "none",
          backgroundImage: `url("${GRAIN_URI}")`,
        }}
      />

      <header className="absolute top-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-6 z-40 gap-4 md:gap-0">
        <div className="w-full md:w-auto flex items-center justify-between">
          <span className="text-xl md:text-2xl font-black text-white tracking-wider">
            KIDDYVIBE
          </span>

          <div
            onClick={onOpenCart}
            className="relative md:hidden cursor-pointer hover:scale-105 transition active:scale-95"
          >
            <ShoppingBag className="text-white w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-black rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </div>
        </div>

        <nav className="flex gap-6 md:gap-8 text-white font-semibold text-sm md:text-base bg-white/5 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-6 py-2 md:p-0 rounded-full border border-white/10 md:border-none">
          <button className="hover:opacity-70 transition">الرئيسية</button>
          <button onClick={onExplore} className="hover:opacity-70 transition">
            وصلنا حديثاً
          </button>
          <button
            onClick={onScrollToWhyUs}
            className="hover:opacity-70 transition"
          >
            لماذا نحن؟
          </button>
        </nav>

        <div
          onClick={onOpenCart}
          className="hidden md:relative md:block cursor-pointer hover:scale-105 transition active:scale-95"
        >
          <ShoppingBag className="text-white" />
          <span className="absolute -top-2 -right-2 bg-white text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
            {cartCount}
          </span>
        </div>
      </header>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {PRODUCTS.slice(0, 4).map((item, index) => {
          const role = getRole(index, activeIndex);
          return (
            <div
              key={item.id}
              style={getRoleStyle(role, isMobile)}
              className="flex items-end justify-center"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-28 md:bottom-10 right-6 md:right-12 z-40 text-right">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentProduct.category}
        </span>
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => navigate("prev")}
            className="border border-white text-white rounded-full p-3 hover:bg-white/10 transition"
          >
            <ArrowRight />
          </button>
          <button
            onClick={() => navigate("next")}
            className="border border-white text-white rounded-full p-3 hover:bg-white/10 transition"
          >
            <ArrowLeft />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-10 left-6 md:left-12 z-40 w-[calc(100%-3rem)] md:w-auto">
        <button
          onClick={onExplore}
          className="group relative overflow-hidden w-full md:w-auto bg-white/10 border border-white/30 backdrop-blur-xl px-8 py-4.5 md:px-10 md:py-5 rounded-2xl text-xl md:text-2xl font-black text-white flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:border-white/50 active:scale-[0.97]"
        >
          <span
            className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none"
            style={{ animationDuration: "1.5s" }}
          />

          <span className="tracking-widest drop-shadow-sm">DISCOVER IT</span>
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 animate-pulse group-hover:-translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
}
