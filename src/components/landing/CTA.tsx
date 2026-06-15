import * as motion from 'motion/react-client';
import { ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export default function CTA({ onStart }: Props) {
  return (
    <section className="py-20 bg-emerald-600 text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold mb-8 tracking-tighter">Mulai Monitoring Balance Cairan Secara Digital Bersama SIBACA</h2>
        <button 
          onClick={onStart}
          className="bg-white text-emerald-600 px-10 py-5 rounded-full font-semibold text-lg flex items-center gap-2 hover:bg-emerald-50 transition shadow-lg mx-auto"
        >
          Mulai Aplikasi <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
