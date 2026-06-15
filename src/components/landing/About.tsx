import * as motion from 'motion/react-client';
import { ShieldCheck, Activity, Database } from 'lucide-react';

const cards = [
  { icon: ShieldCheck, title: 'Akurat & terstandar', desc: 'Perhitungan otomatis sesuai rumus klinis Holliday-Segar.' },
  { icon: Activity, title: 'Real time', desc: 'Lihat status balance cairan pasien setiap saat.' },
  { icon: Database, title: 'Terdokumentasi', desc: 'Semua catatan tersimpan rapi dan bisa diekspor.' },
];

export default function About() {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3"
          >
            TENTANG
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-serif font-bold text-emerald-950 mb-6 tracking-tighter"
          >
            Monitoring cairan, kini lebih presisi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-emerald-800 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Balance cairan adalah indikator vital kondisi pasien. Pencatatan manual rentan error dan memakan waktu — SIBACA hadir sebagai solusi digital yang ringkas, akurat, dan terpercaya.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="p-8 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <card.icon className="w-10 h-10 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-semibold text-emerald-900 mb-3">{card.title}</h3>
              <p className="text-emerald-700">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
