import { ShieldCheck, Truck, Sparkles, Headphones } from "lucide-react";

export default function WhyUsSection() {
  const features = [
    {
      id: 1,
      icon: <Sparkles className="w-8 h-8 text-white stroke-[1.5]" />,
      title: "خامات قطنية 100%",
      description:
        "ننتقي أقمشتنا بعناية فائقة لتناسب بشرة أطفالكم الناعمة وتتحمل كثرة الحركة والغسيل دون تغيير.",
    },
    {
      id: 2,
      icon: <Truck className="w-8 h-8 text-white stroke-[1.5]" />,
      title: "شحن سريع وآمن",
      description:
        "نلتزم بتوصيل طلباتكم حتى باب المنزل في أسرع وقت ممكن مع إمكانية المعاينة والقياس قبل الاستلام.",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-8 h-8 text-white stroke-[1.5]" />,
      title: "ضمان الاستبدال المرن",
      description:
        "لأن رضاكم هو غايتنا، نوفر سياسة استبدال واسترجاع مرنة وسهلة خلال 14 يوماً من استلام الطلب.",
    },
    {
      id: 4,
      icon: <Headphones className="w-8 h-8 text-white stroke-[1.5]" />,
      title: "دعم متواصل 24/7",
      description:
        "فريق خدمة العملاء لدينا مستعد دائماً للإجابة على استفساراتكم ومساعدتكم في اختيار المقاسات المناسبة.",
    },
  ];

  return (
    <section
      className="w-full bg-neutral-950 py-24 px-6 md:px-12 border-t border-neutral-900 relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs md:text-sm font-black tracking-[0.2em] text-neutral-500 uppercase">
            KIDDYVIBE EXPERIENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            لماذا تتسوقين من{" "}
            <span className="underline underline-offset-8 decoration-white/20">
              كيدي فايب؟
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="group relative bg-neutral-900/30 border border-neutral-900 hover:border-neutral-800/80 rounded-2xl p-6 md:p-8 transition-all duration-500 backdrop-blur-xl flex flex-col items-start gap-5 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                <div className="group-hover:scale-90 transition-transform duration-550 group-hover:[&_svg]:text-black">
                  {item.icon}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-black text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-400 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
