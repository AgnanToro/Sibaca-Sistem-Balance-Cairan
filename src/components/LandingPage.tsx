import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Activity, Droplet, Pill, Apple, GlassWater, Syringe,
  Droplets, Wind, Toilet, FlaskConical, Calculator, Scale,
  PlusCircle, MinusCircle, Equal, FileSpreadsheet, ShieldCheck,
  HeartPulse, Stethoscope, ArrowRight, CheckCircle2, ClipboardList,
  TrendingUp, Database, LineChart, Sparkles,
} from "lucide-react";

/* ---------- Loading splash ---------- */
function Splash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      onAnimationComplete={(d: any) => { if (d?.opacity === 0) {/* noop */} }}
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-200"
        >
          <Droplet className="h-10 w-10 text-white" />
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-emerald-400"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.div>
        <p className="font-semibold tracking-wide text-emerald-700">SIBACA</p>
      </div>
    </motion.div>
  );
}

/* ---------- Floating background icons ---------- */
function FloatingIcons() {
  const icons = [Droplet, HeartPulse, Stethoscope, Activity, Syringe, Pill, FlaskConical, Droplets];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map((Icon, i) => {
        const left = (i * 13 + 7) % 95;
        const top = (i * 23 + 11) % 90;
        const dur = 8 + (i % 5) * 2;
        return (
          <motion.div
            key={i}
            className="absolute text-emerald-500/15"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -25, 0], x: [0, 12, 0], rotate: [0, 8, 0] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            <Icon className="h-10 w-10 md:h-14 md:w-14" />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("id-ID"));
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: "easeOut" });
    const unsub = rounded.on("change", setVal);
    return () => { controls.stop(); unsub(); };
  }, [inView, to, mv, rounded]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Section wrapper with fade-up ---------- */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Dashboard mock for hero ---------- */
function DashboardMock() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-md rounded-3xl border border-emerald-100 bg-white/80 p-5 shadow-2xl shadow-emerald-200/40 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600">
            <Droplet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Pasien · Ny. R</p>
            <p className="text-sm font-semibold text-slate-800">Balance Cairan 24 jam</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">LIVE</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-700">Input</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">2.600<span className="text-xs font-medium"> mL</span></p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Output</p>
          <p className="mt-1 text-2xl font-bold text-slate-700">2.100<span className="text-xs font-medium"> mL</span></p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide opacity-80">Balance</p>
            <p className="mt-1 text-3xl font-bold">+500 <span className="text-sm font-medium">mL</span></p>
          </div>
          <PlusCircle className="h-10 w-10 opacity-30" />
        </div>
        <p className="mt-2 text-xs opacity-90">Interpretasi · Positif</p>
      </div>

      <div className="mt-4 flex items-end gap-1.5 h-16">
        {[40, 60, 35, 80, 55, 70, 90, 65, 75, 50, 85, 60].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
            className="flex-1 rounded-t bg-gradient-to-t from-emerald-200 to-emerald-500"
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- FAQ Item ----------- */
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-semibold text-slate-900"
      >
        {question}
        <ChevronDown className={`h-5 w-5 text-emerald-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="mt-4 text-sm text-slate-600">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ---------- Component ------------ */
export default function LandingPage({ onStart }: { onStart: () => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const inputs = [
    { icon: Syringe, label: "Infus", desc: "Cairan intravena" },
    { icon: Apple, label: "Makanan", desc: "Asupan enteral" },
    { icon: GlassWater, label: "Minuman", desc: "Oral hydration" },
    { icon: Pill, label: "Obat", desc: "Medikasi cair / IV" },
    { icon: Wind, label: "AM", desc: "Air metabolisme" },
  ];
  const outputs = [
    { icon: Droplets, label: "Urine", desc: "Output ginjal" },
    { icon: Toilet, label: "BAB", desc: "Defekasi" },
    { icon: FlaskConical, label: "Drain", desc: "Drainase luka" },
    { icon: Activity, label: "Muntah/NGT", desc: "Aspirasi & emesis" },
    { icon: Wind, label: "IWL", desc: "Insensible water loss" },
  ];

  const steps = [
    { icon: ClipboardList, title: "Input Data Pasien", desc: "Identitas & berat badan" },
    { icon: PlusCircle, title: "Input Cairan", desc: "Catat semua intake" },
    { icon: MinusCircle, title: "Output Cairan", desc: "Catat semua output" },
    { icon: Calculator, title: "Hitung Otomatis", desc: "Sistem menghitung real time" },
    { icon: TrendingUp, title: "Hasil & Interpretasi", desc: "Positif · Negatif · Seimbang" },
  ];

  const faqs = [
    { q: "Apa itu SIBACA?", a: "SIBACA adalah platform digital untuk memudahkan tenaga kesehatan dalam pencatatan dan perhitungan balance cairan pasien." },
    { q: "Apakah data aman?", a: "Data tersimpan secara lokal di browser Anda, sehingga privasi pasien tetap terjaga." },
    { q: "Bisakah hasil di-export?", a: "Ya, Anda dapat mengekspor riwayat data ke dalam format file Excel (.xlsx)." },
    { q: "Apakah aplikasi ini gratis?", a: "SIBACA dirancang sebagai alat bantu nakes dan dapat digunakan sepenuhnya secara gratis." },
    { q: "Bagaimana cara mengakses histori?", a: "Anda dapat melihat riwayat perhitungan yang pernah disimpan melalui menu History pada sidebar kalkulator." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 [scroll-behavior:smooth]" style={{ fontFamily: "Onest, system-ui, sans-serif" }}>
      {!loaded && <Splash />}

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-emerald-100/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-md shadow-emerald-200">
              <Droplet className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-emerald-700">SIBACA</p>
              <p className="text-[10px] text-slate-500">Sistem balance cairan</p>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
            <a href="#tentang" className="hover:text-emerald-700">Tentang</a>
            <a href="#fitur" className="hover:text-emerald-700">Fitur</a>
            <a href="#cara-kerja" className="hover:text-emerald-700">Cara kerja</a>
            <a href="#statistik" className="hover:text-emerald-700">Statistik</a>
            <a href="#faq" className="hover:text-emerald-700">FAQ</a>
          </nav>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:scale-105 hover:bg-emerald-700"
          >
            Mulai <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/60 to-emerald-50">
        <FloatingIcons />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> Healthcare platform 2026
            </span>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-7xl">
              SIBACA
            </h1>
            <p className="mt-3 text-lg font-medium text-emerald-700 md:text-xl">
              Sistem Balance Cairan Terintegrasi Berbasis Website
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
              Membantu tenaga kesehatan mencatat, menghitung, dan memantau balance cairan pasien
              secara cepat, akurat, dan terintegrasi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:scale-105 hover:bg-emerald-700"
              >
                Mulai Sekarang <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#fitur"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:scale-105 hover:border-emerald-400"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <DashboardMock />
          </motion.div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="mx-auto max-w-6xl px-5 py-24">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Tentang</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Monitoring cairan, kini lebih presisi
          </h2>
          <p className="mt-4 text-slate-600">
            Balance cairan adalah indikator vital kondisi pasien. Pencatatan manual rentan error
            dan memakan waktu — SIBACA hadir sebagai solusi digital yang ringkas, akurat, dan terpercaya.
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Akurat & terstandar", desc: "Perhitungan otomatis sesuai rumus klinis Holliday-Segar." },
            { icon: HeartPulse, title: "Real time", desc: "Lihat status balance cairan pasien setiap saat." },
            { icon: Database, title: "Terdokumentasi", desc: "Semua catatan tersimpan rapi dan bisa diekspor." },
          ].map((c, i) => (
            <FadeUp key={c.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FITUR */}
      <section id="fitur" className="bg-emerald-50/40 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Fitur</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Semua yang dibutuhkan untuk balance cairan
            </h2>
          </FadeUp>

          {/* Input group */}
          <FadeUp className="mt-14">
            <div className="mb-4 flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-slate-900">Input cairan</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {inputs.map((it, i) => (
                <FadeUp key={it.label} delay={i * 0.05}>
                  <FeatureCard icon={it.icon} label={it.label} desc={it.desc} tone="emerald" />
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* Output group */}
          <FadeUp className="mt-12">
            <div className="mb-4 flex items-center gap-2">
              <MinusCircle className="h-5 w-5 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">Output cairan</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {outputs.map((it, i) => (
                <FadeUp key={it.label} delay={i * 0.05}>
                  <FeatureCard icon={it.icon} label={it.label} desc={it.desc} tone="slate" />
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {/* Calc + interpretation */}
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <FadeUp>
              <div className="h-full rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Perhitungan otomatis</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Total input</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Total output</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Balance cairan</li>
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="h-full rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2">
                  <Scale className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Interpretasi hasil</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"><PlusCircle className="h-3.5 w-3.5" /> Positif</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"><MinusCircle className="h-3.5 w-3.5" /> Negatif</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"><Equal className="h-3.5 w-3.5" /> Seimbang</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="mx-auto max-w-6xl px-5 py-24">
        <FadeUp className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Cara kerja</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Lima langkah, hasil instan
          </h2>
        </FadeUp>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-emerald-100 md:left-1/2 md:top-1/2 md:h-0.5 md:w-full md:-translate-y-1/2" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-6 top-0 hidden h-full w-0.5 origin-top bg-emerald-500 md:left-0 md:top-1/2 md:block md:h-0.5 md:w-full md:origin-left md:-translate-y-1/2"
          />
          <div className="relative grid gap-8 md:grid-cols-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                >
                  <s.icon className="h-6 w-6" />
                </motion.div>
                <div className="md:mt-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Step {i + 1}</p>
                  <p className="mt-1 font-semibold text-slate-900">{s.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section id="statistik" className="border-y border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-4">
          {[
            { label: "Akurasi perhitungan", to: 99, suffix: "%" },
            { label: "Monitoring real time", to: 24, suffix: "/7" },
            { label: "Pencatatan digital", to: 100, suffix: "%" },
            { label: "Efisiensi dokumentasi", to: 85, suffix: "%" },
          ].map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.1}>
              <div className="rounded-3xl border border-emerald-100 bg-white/70 p-6 text-center shadow-sm backdrop-blur">
                <p className="text-4xl font-bold text-emerald-700 md:text-5xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-600">{s.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24">
        <FadeUp className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">FAQ</h2>
        </FadeUp>
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.1}>
              <AccordionItem question={f.q} answer={f.a} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-emerald-600 py-20 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <FadeUp className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Mulai Monitoring Balance Cairan Secara Digital Bersama SIBACA
          </h2>
          <p className="mt-4 text-emerald-50">
            Ringkas, akurat, terdokumentasi. Bantu tim Anda fokus pada pasien, bukan pada kertas.
          </p>
          <button
            onClick={onStart}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-emerald-700 shadow-xl shadow-emerald-900/20 transition hover:scale-105 hover:bg-emerald-50"
          >
            <FileSpreadsheet className="h-4 w-4" /> Buka kalkulator SIBACA
          </button>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-100 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <Droplet className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-emerald-700">SIBACA</p>
          </div>
          <p className="text-xs text-slate-500">© 2026 SIBACA · Sistem Balance Cairan Terintegrasi</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, label, desc, tone }: { icon: any; label: string; desc: string; tone: "emerald" | "slate" }) {
  const t = tone === "emerald"
    ? "border-emerald-100 hover:border-emerald-400 hover:shadow-emerald-100 bg-white"
    : "border-slate-200 hover:border-slate-400 hover:shadow-slate-100 bg-white";
  const ic = tone === "emerald" ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-700 group-hover:text-white";
  return (
    <div className={`group h-full rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${t}`}>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${ic}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 font-semibold text-slate-900">{label}</p>
      <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
    </div>
  );
}
