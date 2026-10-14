import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';

interface CertificateModalProps {
  studentName: string;
  score: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName,
  score,
  onClose,
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden relative my-8">
        {/* Top Control Bar (Hidden during print) */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700">
            Pratinjau Sertifikat Kelulusan
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE AREA */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-amber-50/30 text-stone-900 relative">
          {/* Ornate Double Border */}
          <div className="border-4 border-double border-amber-800/60 p-6 sm:p-8 rounded-xl bg-white relative">
            {/* Header Emblem */}
            <div className="text-center space-y-1 mb-6">
              <div className="w-12 h-12 mx-auto mb-2 text-amber-700">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <polygon points="20,2 25,14 38,14 28,22 32,34 20,26 8,34 12,22 2,14 15,14" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
                </svg>
              </div>
              <div className="text-[11px] font-bold tracking-widest text-amber-800 uppercase">
                Media Edukasi Interaktif Kebangsaan
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-serif-patriotic">
                PIAGAM PENGHARGAAN
              </h2>
              <div className="text-xs text-stone-500 font-medium tracking-wider">
                SAHABAT GARUDA PANCASILA
              </div>
            </div>

            {/* Body */}
            <div className="text-center space-y-4 my-6">
              <p className="text-xs text-stone-600">
                Piagam penghargaan ini dengan bangga dianugerahkan kepada:
              </p>

              <div className="text-2xl sm:text-3xl font-bold text-amber-900 border-b-2 border-amber-600/40 pb-2 inline-block px-8 font-serif-patriotic">
                {studentName || 'Peserta Didik Indonesia'}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed pt-2">
                Atas dedikasi dan keberhasilannya dalam menyelesaikan seluruh modul pembelajaran interaktif, anatomi lambang kemerdekaan, dan kuis pemahaman nilai-nilai luhur Pancasila dengan skor perolehan:
              </p>

              <div className="inline-block bg-amber-100/70 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full font-mono font-bold text-sm">
                Skor Evaluasi: {score} / 100
              </div>
            </div>

            {/* Signature & Date */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex items-end justify-between text-xs text-stone-600 px-2 sm:px-6">
              <div>
                <div className="text-[11px] text-stone-500">Tanggal Penyelesaian:</div>
                <div className="font-semibold text-stone-800">{currentDate}</div>
                <div className="text-[10px] text-stone-400 mt-2">Nomor Sertifikat: GPD-{Math.floor(100000 + Math.random() * 900000)}</div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-1 flex items-center justify-center text-amber-700">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="font-semibold text-stone-900 border-t border-stone-400 pt-1">
                  Tim Pengembang Edukasi
                </div>
                <div className="text-[10px] text-stone-500">Jelajah Garuda Pancasila</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
