import Logo from './Logo';

export default function Footer() {
    return (
      <footer className="bg-white text-emerald-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="border-t border-emerald-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2">
                <Logo className="w-8 h-8"/>
                <div className="font-bold text-xl">SIBACA</div>
            </div>
            <p>© 2026 SIBACA · Sistem Balance Cairan Terintegrasi</p>
            <div className='flex gap-6 text-sm text-emerald-600'>
            </div>
          </div>
        </div>
      </footer>
    );
}
