import { useState } from 'react';
import * as motion from 'motion/react-client';
import { Plus, Minus } from 'lucide-react';

const faq = [
  { q: 'Apa itu SIBACA?', a: 'SIBACA adalah Sistem Balance Cairan Terintegrasi berbasis website yang membantu pencatatan input, output, balance cairan, dan interpretasi hasil pasien.' },
  { q: 'Data apa yang dicatat?', a: 'Input: infus, makanan, minuman, obat, AM. Output: urine, BAB, drain, muntah/NGT, IWL.' },
  { q: 'Bagaimana penghitungannya?', a: 'Total input dikurangi total output.' },
  { q: 'Apa arti status hasil?', a: 'Positif (input > output), Negatif (output > input), Seimbang (input == output).' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-emerald-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-center text-emerald-950 mb-16 tracking-tighter">Pertanyaan Sering Diajukan</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-emerald-100 overflow-hidden"
            >
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center font-semibold text-emerald-900"
              >
                {item.q}
                {open === i ? <Minus className="text-emerald-600" /> : <Plus className="text-emerald-600"/>}
              </button>
              {open === i && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-emerald-700"
                >
                    {item.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
