import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function FooterSection() {
  return (
    <>
      <section
        id="features"
        className="bg-neutral-950 py-20 px-6 md:px-12 border-t border-neutral-900"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="p-4 bg-neutral-900 rounded-2xl text-white">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">خامات آمنة 100%</h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              جميع ملابسنا مصنوعة من القطن العضوي الفاخر الخالي من المواد
              الكيميائية لحماية بشرة طفلك الحساسة.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="p-4 bg-neutral-900 rounded-2xl text-white">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">شحن سريع ومجاني</h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              نوفر لكِ خدمة شحن سريعة وموثوقة لجميع المحافظات، مع شحن مجاني
              للطلبات فوق 1000 ج.م.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="p-4 bg-neutral-900 rounded-2xl text-white">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              استبدال واسترجاع مرن
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              المقاس مطلعش مظبوط؟ مفيش مشكلة، يمكنك الاستبدال أو الاسترجاع بكل
              سهولة خلال 14 يوماً من الاستلام.
            </p>
          </div>
        </div>
      </section>

      <footer
        className="bg-neutral-950 py-12 px-6 md:px-12 border-t border-neutral-900 text-neutral-500 text-sm"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right">
            <span className="text-white font-black text-xl block mb-2 tracking-wider">
              KIDDYVIBE
            </span>
            <p className="max-w-xs text-neutral-400 text-xs sm:text-sm leading-relaxed">
              نصنع بكل حب قطع ملابس فريدة تجمع بين الراحة المطلقة والأناقة
              العصرية لأطفالكم.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-medium text-xs sm:text-sm">
            <button
              type="button"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <button
              type="button"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              الشروط والأحكام
            </button>
            <button
              type="button"
              className="hover:text-white transition-colors duration-200 cursor-pointer"
            >
              الدعم الفني
            </button>
          </div>

          <p className="text-xs font-mono tracking-wide text-neutral-600">
            © 2026 KIDDYVIBE. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </>
  );
}
