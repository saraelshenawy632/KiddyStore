import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  src: string;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCheckoutOpen: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  setCartItems,
  onCheckoutOpen,
}: CartProps) {
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => {
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
      return acc + numericPrice * item.quantity;
    }, 0);
    return total > 0 ? `${total} ج.م` : "٠ ج.م";
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-neutral-950 border-l border-neutral-800/60 z-50 shadow-2xl flex flex-col justify-between transition-transform duration-500 text-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        <div className="p-6 md:p-8 border-b border-neutral-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-white" />
            <h2 className="text-xl md:text-2xl font-black tracking-wide">
              حقيبة التسوق
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-neutral-900 rounded-full transition border border-neutral-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-none">
          {cartItems.length === 0 ? (
            <div className="text-center py-32 flex flex-col items-center justify-center gap-4">
              <ShoppingCart className="w-12 h-12 text-neutral-600 stroke-[1.5]" />
              <p className="text-neutral-400 font-bold text-lg">
                حقيبتك فارغة تماماً الآن..
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-neutral-900/40 p-4 rounded-2xl border border-neutral-900"
              >
                <div className="w-24 h-24 bg-neutral-900 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500";
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between flex-grow py-1">
                  <div>
                    <h4 className="font-black text-base line-clamp-1 text-white">
                      {item.name}
                    </h4>
                    <span className="text-sm text-neutral-400 font-bold block mt-1">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-900 px-3 py-1.5 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="hover:text-white text-neutral-400 font-bold p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-base font-black w-6 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="hover:text-white text-neutral-400 font-bold p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 p-2 hover:bg-neutral-900 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 md:p-8 border-t border-neutral-900 bg-neutral-950">
            <div className="flex items-center justify-between mb-6">
              <span className="text-neutral-400 font-bold text-lg">
                المجموع الإجمالي:
              </span>
              <span className="text-white font-black text-2xl tracking-tight">
                {calculateTotal()}
              </span>
            </div>
            <button
              onClick={onCheckoutOpen}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-neutral-200 transition duration-300 text-center text-base md:text-lg shadow-xl"
            >
              إتمام الشراء والطلب
            </button>
          </div>
        )}
      </div>
    </>
  );
}
