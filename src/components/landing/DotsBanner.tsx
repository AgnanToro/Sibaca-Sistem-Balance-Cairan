interface Props {
    onStart: () => void;
}

export default function DotsBanner({ onStart }: Props) {
    return (
      <section className="py-20 bg-emerald-600 relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
            <h2 className="text-4xl font-bold mb-6">Mulai Monitoring Balance Cairan Secara Digital Bersama SIBACA</h2>
            <p className="text-emerald-100 text-lg mb-10">Ringkas, akurat, terdokumentasi. Bantu tim Anda fokus pada pasien, bukan pada kertas.</p>
            <button onClick={onStart} className="bg-white text-emerald-700 px-8 py-4 rounded-full font-semibold hover:bg-emerald-50 transition shadow-lg inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7zm0 4h10v2H7zm0 4h10v2H7z"/></svg>                
                Buka kalkulator SIBACA
            </button>
        </div>
      </section>
    );
  }
