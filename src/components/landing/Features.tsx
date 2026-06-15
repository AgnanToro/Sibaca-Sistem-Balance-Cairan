import * as motion from 'motion/react-client';
import { Syringe, Apple, CupSoda, Pill, Wind, Droplets, Trash2, FlaskConical, Activity, Thermometer, Calculator, Scale } from 'lucide-react';

const inputs = [
  { icon: Syringe, title: 'Infus', desc: 'Cairan intravena' },
  { icon: Apple, title: 'Makanan', desc: 'Asupan enteral' },
  { icon: CupSoda, title: 'Minuman', desc: 'Oral hydration' },
  { icon: Pill, title: 'Obat', desc: 'Medikasi cair / IV' },
  { icon: Wind, title: 'AM', desc: 'Air metabolisme' },
];

const outputs = [
  { icon: Droplets, title: 'Urine', desc: 'Output ginjal' },
  { icon: Trash2, title: 'BAB', desc: 'Defekasi' },
  { icon: FlaskConical, title: 'Drain', desc: 'Drainase luka' },
  { icon: Activity, title: 'Muntah/NGT', desc: 'Aspirasi & emesis' },
  { icon: Thermometer, title: 'IWL', desc: 'Insensible water loss' },
];

export default function Features() {
  return (
    <section id="fitur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-3">FITUR</div>
          <h2 className="text-5xl font-serif font-bold text-emerald-950 tracking-tighter">Semua yang dibutuhkan untuk balance cairan</h2>
        </div>

        <div className="mb-12">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-emerald-900 mb-6"><Calculator className='text-emerald-500' /> Input cairan</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {inputs.map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }} className="p-6 rounded-3xl border border-emerald-100 shadow-sm transition-colors">
                    <item.icon className="w-8 h-8 text-emerald-600 mb-4" />
                    <h4 className="font-semibold text-emerald-900">{item.title}</h4>
                    <p className="text-sm text-emerald-600">{item.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>

        <div className="mb-12">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-emerald-900 mb-6"><Scale className='text-emerald-500' /> Output cairan</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {outputs.map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }} className="p-6 rounded-3xl border border-emerald-100 shadow-sm transition-colors">
                    <item.icon className="w-8 h-8 text-emerald-600 mb-4" />
                    <h4 className="font-semibold text-emerald-900">{item.title}</h4>
                    <p className="text-sm text-emerald-600">{item.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
        <div className="mb-12">
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-emerald-900 mb-6"><Calculator className='text-emerald-500' /> Perhitungan otomatis & Interpretasi hasil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }} className="p-8 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 transition-colors">
                     <Calculator className="w-10 h-10 text-emerald-600" />
                     <div>
                        <h4 className="font-semibold text-emerald-900">Perhitungan otomatis</h4>
                        <ul className='text-sm text-emerald-600 list-disc ml-4'>
                            <li>Total input</li>
                            <li>Total output</li>
                            <li>Balance cairan</li>
                        </ul>
                     </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, backgroundColor: '#f0fdf4' }} className="p-8 rounded-3xl border border-emerald-100 shadow-sm flex items-center gap-4 transition-colors">
                     <Scale className="w-10 h-10 text-emerald-600" />
                     <div>
                        <h4 className="font-semibold text-emerald-900">Interpretasi hasil</h4>
                        <div className='flex gap-2 mt-2'>
                            <span className='bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs'>Positif</span>
                            <span className='bg-red-100 text-red-700 px-2 py-1 rounded text-xs'>Negatif</span>
                            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs'>Seimbang</span>
                        </div>
                     </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
