import { motion, animate, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
  { label: 'Akurasi Perhitungan', value: 99, suffix: '%' },
  { label: 'Monitoring Real Time', value: 24, suffix: '/7' },
  { label: 'Pencatatan Digital', value: 100, suffix: '%' },
  { label: 'Efisiensi Dokumentasi', value: 85, suffix: '%' },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return controls.stop;
  }, [value, count]);
  
  return (
    <>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </>
  );
}

export default function Stats() {
  return (
    <section id="statistik" className="py-20 bg-white text-emerald-900">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-5xl font-bold mb-2 text-emerald-600">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-emerald-600/70">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
