import { motion } from 'framer-motion';
import { ClipboardList, PlusCircle, MinusCircle, Calculator, TrendingUp } from 'lucide-react';

const steps = [
    { title: 'Input Data Pasien', desc: 'Identitas & berat badan', icon: ClipboardList },
    { title: 'Input Cairan', desc: 'Catat semua intake', icon: PlusCircle },
    { title: 'Output Cairan', desc: 'Catat semua output', icon: MinusCircle },
    { title: 'Hitung Otomatis', desc: 'Sistem menghitung real time', icon: Calculator },
    { title: 'Hasil & Interpretasi', desc: 'Positif - Negatif - Seimbang', icon: TrendingUp },
];

export default function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4">CARA KERJA</div>
        <h2 className="text-5xl font-serif font-bold text-emerald-950 mb-16 tracking-tighter">Lima langkah, hasil instan</h2>
        
        <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-emerald-500 hidden md:block"></div>
          
          {steps.map((step, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 flex flex-col items-center z-10"
            >
              <div className="w-20 h-20 bg-emerald-600 text-white flex items-center justify-center rounded-2xl shadow-lg shadow-emerald-600/30 mb-6">
                <step.icon className="w-10 h-10" />
              </div>
              <div className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-2">STEP {i + 1}</div>
              <h3 className="font-semibold text-emerald-900 text-lg mb-1">{step.title}</h3>
              <p className="text-sm text-emerald-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
