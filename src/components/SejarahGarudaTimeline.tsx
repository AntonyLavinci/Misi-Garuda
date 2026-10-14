import React from 'react';
import { History, UserCheck, Calendar, ShieldCheck } from 'lucide-react';
import { HISTORY_TIMELINE } from '../data/garudaData';

export const SejarahGarudaTimeline: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          Modul Pembelajaran 03
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
          Sejarah & Tokoh Perancang Garuda Pancasila
        </h1>
        <p className="text-stone-600 text-sm mt-1 max-w-2xl">
          Menelusuri jejak sejarah perumusan lambang negara dari sayembara Panitia Lencana Negara 1950, peran Sultan Hamid II, hingga penyempurnaan oleh Presiden Soekarno.
        </p>
      </div>

      {/* Hero Historical Showcase: Archival Illustration & Summary */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-6 relative min-h-[300px] bg-stone-900">
          <img
            src="/src/assets/images/garuda_history_sultan_hamid_1791950459676.jpg"
            alt="Ilustrasi Sejarah Meja Perancangan Lambang Garuda Pancasila 1950"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <span className="text-xs text-stone-200 font-medium">
              Dokumentasi Sejarah: Meja rancangan sketsa lambang negara tahun 1950
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <UserCheck className="w-4 h-4 text-amber-700" />
              <span>Dua Tokoh Kunci di Balik Lambang Negara</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-serif-patriotic">
              Kolaborasi Sultan Hamid II & Presiden Soekarno
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Pada awal tahun 1950, Republik Indonesia Serikat (RIS) menggelar sayembara nasional untuk menciptakan lambang negara. Dari berbagai usulan, karya <strong className="text-stone-900">Sultan Hamid II</strong> (Menteri Negara Zonder Portofolio asal Pontianak) dipilih oleh Panitia Lencana Negara.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              Presiden Soekarno kemudian memberikan masukan krusial untuk menyempurnakan rancangan: menambahkan <em>jambul</em> di kepala burung garuda agar berbeda dari <em>bald eagle</em> (lambang Amerika Serikat), serta mengubah posisi cakar yang semula mencengkeram pita dari belakang menjadi mencengkeram erat dari depan.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Ketua Panitia Lencana Negara: </span>
              Ki Hadjar Dewantara, dengan anggota M. Yamin, M.A. Pellaupessy, Moh. Natsir, dan R.M.Ng. Purbatjaraka.
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Timeline */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 uppercase tracking-wider mb-6">
          <History className="w-4 h-4 text-amber-700" />
          <span>Garis Waktu Penetapan Lambang Negara</span>
        </div>

        <div className="relative border-l-2 border-stone-200 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {HISTORY_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-700 group-hover:scale-125 transition-transform" />

              <div className="flex items-center gap-2 text-xs font-mono text-amber-800 font-bold mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.year}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
