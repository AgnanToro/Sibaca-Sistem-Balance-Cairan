import { useState, useEffect } from "react";
import { ArrowLeft, History, RefreshCcw, ExternalLink, LayoutPanelLeft, Calculator } from "lucide-react";
import * as XLSX from "xlsx";

type Row = Record<string, string>;

type HistoryEntry = {
  id: string;
  savedAt: string;
  pasien: {
    nama: string;
    noRM: string;
    usia: string;
    bb: string;
    ruang: string;
    tanggal: string;
  };
  totalInput: number;
  totalOutput: number;
  balance: number;
  interpretasi: string;
  kebutuhan: number;
};

const HISTORY_STORAGE_KEY = "sibaca-kalkulator-history";

export default function HistoryPage({ onBack }: { onBack: () => void }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  const clearHistory = () => {
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
    setHistory([]);
  };

  const exportHistoryExcel = () => {
    if (history.length === 0) return;

    const rows = history.map((entry) => ({
      "Waktu simpan": formatHistoryTime(entry.savedAt),
      "Nama pasien": entry.pasien.nama || "-",
      "No. RM": entry.pasien.noRM || "-",
      Usia: entry.pasien.usia || "-",
      "Berat badan (kg)": entry.pasien.bb || "-",
      Tanggal: entry.pasien.tanggal || "-",
      Ruang: entry.pasien.ruang || "-",
      "Total input (mL)": entry.totalInput,
      "Total output (mL)": entry.totalOutput,
      "Balance (mL)": entry.balance,
      Interpretasi: entry.interpretasi,
      "Kebutuhan (mL/hari)": entry.kebutuhan,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "History SIBACA");
    const fileDate = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `SIBACA_History_${fileDate}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-emerald-50/40 px-5 py-8" style={{ fontFamily: "Onest, system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-emerald-100 bg-white/90 px-5 py-4 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <History className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-700">SIBACA · History</p>
              <p className="text-xs text-slate-500">Riwayat hasil kalkulator yang disimpan</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali
            </button>
            <button
              onClick={exportHistoryExcel}
              disabled={history.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Export Excel
            </button>
            <button
              onClick={clearHistory}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:bg-emerald-700"
            >
              <RefreshCcw className="h-4 w-4" /> Hapus history
            </button>
          </div>
        </header>

        {history.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-emerald-100 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">Belum ada history</p>
            <p className="mt-2 text-sm text-slate-500">
              Simpan hasil dari kalkulator untuk melihatnya di halaman ini.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {history.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {entry.pasien.nama || "Pasien tanpa nama"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">{formatHistoryTime(entry.savedAt)}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {entry.interpretasi}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <InfoBox label="Total input" value={`${entry.totalInput.toLocaleString("id-ID")} mL`} />
                  <InfoBox label="Total output" value={`${entry.totalOutput.toLocaleString("id-ID")} mL`} />
                  <InfoBox
                    label="Balance"
                    value={`${entry.balance > 0 ? "+" : ""}${entry.balance.toLocaleString("id-ID")} mL`}
                  />
                  <InfoBox label="Kebutuhan" value={`${entry.kebutuhan.toLocaleString("id-ID")} mL/hari`} />
                </div>

                <div className="mt-4 rounded-2xl bg-emerald-50/70 p-4 text-xs text-emerald-900">
                  <p className="font-semibold">Data pasien</p>
                  <p className="mt-1">RM: {entry.pasien.noRM || "-"}</p>
                  <p>Tanggal: {entry.pasien.tanggal || "-"}</p>
                  <p>Ruang: {entry.pasien.ruang || "-"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function formatHistoryTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
