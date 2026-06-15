import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import * as XLSX from "xlsx";
import {
  Droplet, ArrowLeft, PlusCircle, MinusCircle, Calculator,
  FileSpreadsheet, User, Scale, Equal, RotateCcw,
  LayoutPanelLeft, History, Save,
} from "lucide-react";

const INPUT_FIELDS = ["Infus", "Makanan", "Minuman", "Obat", "AM"] as const;
const OUTPUT_FIELDS = ["Urine", "BAB", "Drain", "Muntah/NGT", "IWL Umum", "IWL Demam"] as const;

type Row = Record<string, string>;

function num(v: string) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }

export default function Kalkulator({ onBack, onNavigateHistory }: { onBack: () => void, onNavigateHistory: () => void }) {
  const [pasien, setPasien] = useState({ nama: "", noRM: "", usia: "", bb: "", suhu: "", ruang: "", tanggal: new Date().toISOString().slice(0, 10) });
  const [input, setInput] = useState<Row>(Object.fromEntries(INPUT_FIELDS.map(k => [k, ""])));
  const [output, setOutput] = useState<Row>(Object.fromEntries(OUTPUT_FIELDS.map(k => [k, ""])));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const totalInput = useMemo(() => INPUT_FIELDS.reduce((s, k) => s + num(input[k]), 0), [input]);
  const totalOutput = useMemo(() => OUTPUT_FIELDS.reduce((s, k) => s + num(output[k]), 0), [output]);
  const balance = totalInput - totalOutput;
  const interpretasi = balance > 0 ? "Positif (+)" : balance < 0 ? "Negatif (−)" : "Seimbang";
  const tone = balance > 0 ? "emerald" : balance < 0 ? "rose" : "slate";

  const bb = num(pasien.bb);
  const suhu = num(pasien.suhu);
  const getIwlBase = (value: string) => {
    const parsed = num(value);
    return parsed > 0 ? parsed : 15;
  };

  const kebutuhan = num(pasien.bb) <= 0 ? 0
    : num(pasien.bb) <= 10 ? num(pasien.bb) * 100
    : num(pasien.bb) <= 20 ? 1000 + (num(pasien.bb) - 10) * 50
    : 1500 + (num(pasien.bb) - 20) * 20;

  const reset = () => {
    setInput(Object.fromEntries(INPUT_FIELDS.map(k => [k, ""])));
    setOutput(Object.fromEntries(OUTPUT_FIELDS.map(k => [k, ""])));
  };

  const saveToHistory = async () => {
    if (!supabase) {
      alert("Supabase belum dikonfigurasi.");
      return;
    }
    
    const record = {
      pasien_nama: pasien.nama,
      pasien_no_rm: pasien.noRM,
      pasien_usia: parseFloat(pasien.usia) || 0,
      pasien_bb: parseFloat(pasien.bb) || 0,
      pasien_suhu: num(pasien.suhu),
      pasien_ruang: pasien.ruang,
      record_date: pasien.tanggal,
      
      input_infus: num(input["Infus"]),
      input_makanan: num(input["Makanan"]),
      input_minuman: num(input["Minuman"]),
      input_obat: num(input["Obat"]),
      input_am: num(input["AM"]),
      
      output_urine: num(output["Urine"]),
      output_bab: num(output["BAB"]),
      output_drain: num(output["Drain"]),
      output_muntah_ngt: num(output["Muntah/NGT"]),
      output_iwl_umum: num(output["IWL Umum"]),
      output_iwl_demam: num(output["IWL Demam"]),
      
      total_input: totalInput,
      total_output: totalOutput,
      total_balance: balance,
      interpretasi: interpretasi,
      kebutuhan_harian: kebutuhan
    };

    const { error } = await supabase
      .from('balance_records')
      .insert([record]);

    if (error) {
      console.error("Error saving to Supabase:", error);
      alert("Gagal menyimpan ke database.");
    } else {
      alert("Berhasil menyimpan ke database!");
    }
  };

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const data: (string | number)[][] = [
      ["SIBACA — Sistem Balance Cairan Terintegrasi"],
      [],
      ["Data Pasien"],
      ["Nama", pasien.nama],
      ["No. RM", pasien.noRM],
      ["Usia", pasien.usia],
      ["Berat Badan (kg)", pasien.bb],
      ["Suhu Tubuh (°C)", pasien.suhu],
      ["Ruang", pasien.ruang],
      ["Tanggal", pasien.tanggal],
      [],
      ["INPUT CAIRAN (mL)"],
      ...INPUT_FIELDS.map(k => [k, num(input[k])]),
      ["Total Input", totalInput],
      [],
      ["OUTPUT CAIRAN (mL)"],
      ...OUTPUT_FIELDS.map(k => [k, num(output[k])]),
      ["Total Output", totalOutput],
      [],
      ["HASIL"],
      ["Balance Cairan (mL)", balance],
      ["Interpretasi", interpretasi],
      ["Kebutuhan Harian Holliday-Segar (mL)", kebutuhan],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 36 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, ws, "Balance Cairan");
    const fname = `SIBACA_${(pasien.nama || "pasien").replace(/\s+/g, "_")}_${pasien.tanggal}.xlsx`;
    XLSX.writeFile(wb, fname);
  };

  return (
    <div className="min-h-screen bg-emerald-50/40" style={{ fontFamily: "Onest, system-ui, sans-serif" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 transition hover:border-emerald-200 hover:bg-emerald-50"
              aria-label="Toggle sidebar"
            >
              <LayoutPanelLeft className={`h-4 w-4 transition-transform ${sidebarOpen ? "rotate-0" : "rotate-180"}`} />
            </button>
            <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700">
              <ArrowLeft className="h-4 w-4" /> Kembali
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <Droplet className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-bold text-emerald-700">SIBACA · Kalkulator</p>
          </div>
          <button
            onClick={exportExcel}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-200 transition hover:scale-105 hover:bg-emerald-700"
          >
            <FileSpreadsheet className="h-4 w-4" /> Ekspor Excel
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-3">
        {/* LEFT: forms */}
        <div className="space-y-6 lg:col-span-2">
            <Section title="Data pasien" icon={User}>
                <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nama pasien" value={pasien.nama} onChange={v => setPasien({ ...pasien, nama: v })} placeholder="Tn./Ny. ..." />
                <Field label="No. rekam medis" value={pasien.noRM} onChange={v => setPasien({ ...pasien, noRM: v })} placeholder="RM-000123" />
                <Field label="Usia (tahun)" value={pasien.usia} onChange={v => setPasien({ ...pasien, usia: v })} placeholder="45" type="number" />
                <Field label="Berat badan (kg)" value={pasien.bb} onChange={v => setPasien({ ...pasien, bb: v })} placeholder="60" type="number" />
                <Field label="Suhu tubuh (°C)" value={pasien.suhu} onChange={v => setPasien({ ...pasien, suhu: v })} placeholder="37" type="number" />
                <Field label="Ruang / bangsal" value={pasien.ruang} onChange={v => setPasien({ ...pasien, ruang: v })} placeholder="Melati 3" />
                <Field label="Tanggal" value={pasien.tanggal} onChange={v => setPasien({ ...pasien, tanggal: v })} type="date" />
                </div>
            </Section>

            <Section title="Input cairan (mL)" icon={PlusCircle} accent="emerald">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {INPUT_FIELDS.map(k => (
                    <Field key={k} label={k} value={input[k]} onChange={v => setInput({ ...input, [k]: v })} placeholder="0" type="number" />
                ))}
                </div>
                <Total label="Total input" value={totalInput} tone="emerald" />
            </Section>

            <Section title="Output cairan (mL)" icon={MinusCircle} accent="slate">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {OUTPUT_FIELDS.filter(k => !k.startsWith("IWL")).map(k => (
                    <Field key={k} label={k} value={output[k]} onChange={v => setOutput({ ...output, [k]: v })} placeholder="0" type="number" />
                ))}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <FieldWithCalc 
                    label="IWL Umum" 
                    value={output["IWL Umum"]} 
                    onChange={v => setOutput({ ...output, "IWL Umum": v })} 
                    onCalc={() => setOutput(prev => ({ ...prev, "IWL Umum": (bb * getIwlBase(prev["IWL Umum"])).toFixed(0) }))}
                  />
                  <FieldWithCalc 
                    label="IWL Demam" 
                    value={output["IWL Demam"]} 
                    onChange={v => setOutput({ ...output, "IWL Demam": v })} 
                    onCalc={() => setOutput(prev => {
                      const iwlUmum = num(prev["IWL Umum"]);
                      const iwlDemam = suhu > 37 ? iwlUmum * 0.1 * (suhu - 37) : 0;
                      return { ...prev, "IWL Demam": iwlDemam.toFixed(0) };
                    })}
                  />
                </div>
                <Total label="Total output" value={totalOutput} tone="slate" />
            </Section>

            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-400">
                <RotateCcw className="h-4 w-4" /> Reset input & output
            </button>
        </div>

        {/* RIGHT: sidebar + results */}
        <div className="space-y-6">
          {sidebarOpen && (
            <aside className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <LayoutPanelLeft className="h-5 w-5" />
                  <p className="text-sm font-semibold">Sidebar</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-slate-300"
                >
                  Tutup
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-3 py-3 text-sm font-medium text-white transition shadow-md shadow-emerald-200">
                  <Calculator className="h-4 w-4" /> Kalkulator
                </button>
                <button onClick={onNavigateHistory} className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700">
                  <History className="h-4 w-4" /> History
                </button>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={saveToHistory}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-200 hover:bg-emerald-700"
                >
                  <Save className="h-4 w-4" /> Simpan
                </button>
              </div>
            </aside>
          )}

          <motion.div
            key={balance}
            initial={{ scale: 0.97, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`sticky top-20 rounded-3xl border p-6 shadow-xl ${
              tone === "emerald" ? "border-emerald-200 bg-linear-to-br from-emerald-600 to-emerald-500 text-white shadow-emerald-200" :
              tone === "rose" ? "border-rose-200 bg-linear-to-br from-rose-600 to-rose-500 text-white shadow-rose-200" :
              "border-slate-200 bg-linear-to-br from-slate-600 to-slate-500 text-white shadow-slate-200"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest opacity-90">
              <Calculator className="h-4 w-4" /> Hasil balance cairan
            </div>
            <p className="mt-4 text-5xl font-bold">
              {balance > 0 ? "+" : ""}{balance.toLocaleString("id-ID")}
              <span className="ml-1 text-base font-medium opacity-80">mL</span>
            </p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              {balance > 0 ? <PlusCircle className="h-3.5 w-3.5" /> : balance < 0 ? <MinusCircle className="h-3.5 w-3.5" /> : <Equal className="h-3.5 w-3.5" />}
              {interpretasi}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white/15 p-3">
                <p className="text-[10px] uppercase opacity-80">Total input</p>
                <p className="mt-0.5 text-lg font-bold">{totalInput.toLocaleString("id-ID")} mL</p>
              </div>
              <div className="rounded-xl bg-white/15 p-3">
                <p className="text-[10px] uppercase opacity-80">Total output</p>
                <p className="mt-0.5 text-lg font-bold">{totalOutput.toLocaleString("id-ID")} mL</p>
              </div>
            </div>
          </motion.div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700">
              <Scale className="h-5 w-5" />
              <p className="text-sm font-semibold">Kebutuhan harian (Holliday-Segar)</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {kebutuhan.toLocaleString("id-ID")} <span className="text-sm font-medium text-slate-500">mL / hari</span>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Berdasarkan berat badan {bb || 0} kg.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5 text-xs leading-relaxed text-emerald-900">
            <p className="font-semibold">Rumus</p>
            <p className="mt-1">Balance = Total Input − Total Output</p>
            <p className="mt-2">Input: Infus + Makanan + Minuman + Obat + AM</p>
            <p>Output: Urine + BAB + Drain + Muntah/NGT + IWL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, accent = "emerald", children }: { title: string; icon: ComponentType<{ className?: string }>; accent?: "emerald" | "slate"; children: ReactNode }) {
  const color = accent === "emerald" ? "text-emerald-600" : "text-slate-500";
  return (
    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className={`flex items-center gap-2 ${color}`}>
        <Icon className="h-5 w-5" />
        <h2 className="text-sm font-semibold uppercase tracking-wide">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

function FieldWithCalc({ label, value, onChange, onCalc }: { label: string; value: string; onChange: (v: string) => void; onCalc: () => void }) {
  return (
    <label className="block">
       <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600">{label}</span>
          <button 
            type="button"
            onClick={onCalc} 
            className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium hover:bg-emerald-200"
          >
            Hitung
          </button>
       </div>
       <input
         type="number"
         value={value}
         onChange={e => onChange(e.target.value)}
         placeholder="0"
         className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
       />
    </label>
  );
}

function Total({ label, value, tone }: { label: string; value: number; tone: "emerald" | "slate" }) {
  const c = tone === "emerald" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-50 text-slate-700 border-slate-200";
  return (
    <div className={`mt-4 flex items-center justify-between rounded-2xl border px-4 py-3 ${c}`}>
      <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-xl font-bold">{value.toLocaleString("id-ID")} mL</span>
    </div>
  );
}
