import Logo from '../Logo';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 flex items-center justify-between py-4 px-4 md:px-8 shadow-sm">
      <div className="flex items-center gap-2">
        <Logo />
        <div>
            <div className="font-bold text-emerald-900 text-lg">SIBACA</div>
            <div className="text-xs text-emerald-600">Sistem balance cairan</div>
        </div>
      </div>
      <div className="hidden md:flex gap-8 text-emerald-800 font-medium">
        <a href="#tentang" className="hover:text-emerald-600 transition">Tentang</a>
        <a href="#fitur" className="hover:text-emerald-600 transition">Fitur</a>
        <a href="#cara-kerja" className="hover:text-emerald-600 transition">Cara kerja</a>
        <a href="#statistik" className="hover:text-emerald-600 transition">Statistik</a>
        <a href="#faq" className="hover:text-emerald-600 transition">FAQ</a>
      </div>
      <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-emerald-700 transition">
        Mulai <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </nav>
  );
}
