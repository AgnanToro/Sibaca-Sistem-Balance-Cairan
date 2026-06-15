import * as motion from 'motion/react-client';
import { ArrowRight, Plus, Droplets, Activity, Syringe, Stethoscope } from 'lucide-react';
import Navbar from './Navbar';
import Logo from '../Logo';

interface Props {
  onStart: () => void;
}

export default function Hero({ onStart }: Props) {
  return (
    <section className="relative pb-32 pt-32 overflow-hidden">
      <Navbar />
      
      {/* Background Icons */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-20 left-10 text-emerald-200 opacity-40"><Droplets size={60} /></motion.div>
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-40 right-20 text-emerald-200 opacity-40"><Syringe size={80} /></motion.div>
      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-40 right-10 text-emerald-200 opacity-30"><Activity size={70} /></motion.div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-20 left-20 text-emerald-200 opacity-30"><Stethoscope size={90} /></motion.div>
      <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} className="absolute top-10 right-1/3 text-emerald-200 opacity-20"><Plus size={50} /></motion.div>
      <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-2/3 left-1/4 text-emerald-200 opacity-20"><Activity size={100} /></motion.div>
      <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute bottom-10 right-1/4 text-emerald-200 opacity-30"><Syringe size={65} /></motion.div>

      <div className="max-w-7xl mx-auto px-4 pt-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm mb-6"
        >
            <div className='w-2 h-2 rounded-full bg-emerald-500'></div>
            Healthcare platform 2026
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl font-serif text-emerald-950 tracking-tighter mb-6"
        >
          SIBACA
        </motion.h1>
        <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-serif text-emerald-800 mb-8"
        >
            Sistem Balance Cairan Terintegrasi Berbasis Website
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-emerald-700 text-lg mb-12 max-w-lg"
        >
          Membantu tenaga kesehatan mencatat, menghitung, dan memantau balance cairan pasien secara cepat, akurat, dan terintegrasi.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <button 
            onClick={onStart}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-200"
          >
            Mulai Sekarang <ArrowRight className="w-5 h-5" />
          </button>
          <a 
            href="#tentang"
            className="bg-white text-emerald-600 border border-emerald-200 px-6 py-3 rounded-full font-semibold text-lg hover:bg-emerald-50 transition block"
          >
            Pelajari Lebih Lanjut
          </a>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xl"
      >
        <div className='flex justify-between items-center mb-6'>
            <div className='flex items-center gap-3'>
                <Logo className="w-10 h-10" />
                <div>
                  <div className='font-semibold text-emerald-950'>Pasien · Ny. R</div>
                  <div className='text-sm text-emerald-600'>Balance Cairan 24 jam</div>
                </div>
            </div>
            <div className='bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold'>LIVE</div>
        </div>
        <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-emerald-50 p-4 rounded-2xl'>
                <div className='text-emerald-700 text-sm'>INPUT</div>
                <div className='text-3xl font-bold text-emerald-950'>2.600 <span className='text-sm'>mL</span></div>
            </div>
            <div className='bg-emerald-50 p-4 rounded-2xl'>
                <div className='text-emerald-700 text-sm'>OUTPUT</div>
                <div className='text-3xl font-bold text-emerald-950'>2.100 <span className='text-sm'>mL</span></div>
            </div>
        </div>
        <div className='bg-emerald-500 text-white p-6 rounded-3xl flex justify-between items-center'>
            <div>
                <div className='text-emerald-100 text-sm'>BALANCE</div>
                <div className='text-4xl font-bold'>+500 <span className='text-xl'>mL</span></div>
                <div className='text-emerald-100 mt-1'>Interpretasi · Positif</div>
            </div>
            <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                <Plus size={24}/>
            </div>
        </div>
        <div className='flex items-end gap-1 h-24 mt-6'>
            {[40, 60, 40, 80, 50, 60, 80, 50, 60, 40, 80, 50].map((h, i) => (
                <div key={i} className='bg-emerald-500 rounded-t-lg flex-1' style={{height: `${h}%`}}></div>
            ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
