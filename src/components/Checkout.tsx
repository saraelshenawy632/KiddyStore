import { useState } from "react";
import { ArrowRight, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { CartItem } from "./cart";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: string;
  onOrderSuccess: () => void;
}

export default function Checkout({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  onOrderSuccess,
}: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("الرجاء ملء الحقول الأساسية (الاسم، الهاتف، العنوان)");
      return;
    }
    onOrderSuccess();
  };

  return (
    <div
      className="fixed inset-0 bg-neutral-950 z-50 overflow-y-auto text-white p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10 border-b border-neutral-900 pb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-xl font-bold text-sm transition"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للسلة</span>
        </button>
        <h1 className="text-xl md:text-3xl font-black">إتمام الطلب والدفع</h1>
        <span className="text-xl font-black tracking-wider text-neutral-400 hidden sm:block">
          KIDDYVIBE
        </span>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 space-y-6 bg-neutral-900/40 p-6 md:p-8 rounded-3xl border border-neutral-900"
        >
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-neutral-800 pb-3">
            <Truck className="w-5 h-5 text-neutral-400" />
            <span>بيانات الشحن والتوصيل</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-neutral-400 mb-2">
                الاسم بالكامل *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition"
                placeholder="اسم المستلم ثلاثي"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-400 mb-2">
                رقم الهاتف *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-left focus:outline-none focus:border-white transition"
                placeholder="01xxxxxxxxx"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-2">
                  المحافظة / المدينة
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition"
                  placeholder="القاهرة، الإسكندرية..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-400 mb-2">
                  العنوان بالتفصيل *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition"
                  placeholder="اسم الشارع، رقم المبنى، الدور"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-400 mb-2">
                ملاحظات إضافية مع الشحن (اختياري)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition resize-none"
                placeholder="أي تعليمات خاصة بمندوب الشحن..."
              />
            </div>
          </div>

          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-neutral-800 pb-3 pt-4">
            <CreditCard className="w-5 h-5 text-neutral-400" />
            <span>طريقة الدفع</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 ${paymentMethod === "cod" ? "border-white bg-neutral-900" : "border-neutral-800 bg-transparent"}`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-white" : "border-neutral-600"}`}
              >
                {paymentMethod === "cod" && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm">الدفع عند الاستلام (كاش)</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  ادفع نقداً فور استلام الشحنة
                </p>
              </div>
            </div>
            <div
              onClick={() => setPaymentMethod("card")}
              className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-center gap-4 ${paymentMethod === "card" ? "border-white bg-neutral-900" : "border-neutral-800 bg-transparent"}`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-white" : "border-neutral-600"}`}
              >
                {paymentMethod === "card" && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-bold text-sm">الدفع بالبطاقة الائتمانية</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  فيزا أو ماستركارد آمن 100%
                </p>
              </div>
            </div>
          </div>
        </form>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-neutral-900 space-y-4">
            <h3 className="font-bold text-lg border-b border-neutral-800 pb-3">
              ملخص الفاتورة
            </h3>
            <div className="max-h-[200px] overflow-y-auto space-y-3 pr-1 scrollbar-none">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-sm text-neutral-300"
                >
                  <span className="line-clamp-1 font-medium">
                    {item.name}{" "}
                    <span className="text-xs text-neutral-500">
                      ×{item.quantity}
                    </span>
                  </span>
                  <span className="font-bold flex-shrink-0 ml-2">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <hr className="border-neutral-850" />
            <div className="flex justify-between text-neutral-400 text-sm">
              <span>تكلفة المنتجات</span>
              <span className="font-bold text-white">{totalPrice}</span>
            </div>
            <div className="flex justify-between text-neutral-400 text-sm">
              <span>مصاريف الشحن</span>
              <span className="text-emerald-400 font-bold">
                شحن مجاني لفترة محدودة
              </span>
            </div>
            <hr className="border-neutral-850" />
            <div className="flex justify-between text-lg font-black">
              <span>الإجمالي الكلي:</span>
              <span className="text-xl text-white tracking-tight">
                {totalPrice}
              </span>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-neutral-200 transition text-center text-base mt-4 shadow-xl"
            >
              تأكيد وإرسال الطلب مجاناً
            </button>
          </div>
          <div className="flex items-center gap-3 justify-center text-neutral-500 text-xs font-bold">
            <ShieldCheck className="w-5 h-5 text-neutral-600" />
            <span>تسوق آمن مشفر 100% وحماية كاملة لبياناتك</span>
          </div>
        </div>
      </div>
    </div>
  );
}
