import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, RotateCcw, ArrowRight, Printer } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/garudaData';
import { soundController } from '../utils/audioSynthesizer';
import { CertificateModal } from './CertificateModal';

export const QuizPancasila: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answersHistory, setAnswersHistory] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');

  const currentQuestion: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    soundController.playClick();
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQuestion.correctIndex;
    if (isCorrect) {
      soundController.playCorrect();
      setScore((prev) => prev + 10);
      setAnswersHistory((prev) => [...prev, true]);
    } else {
      soundController.playIncorrect();
      setAnswersHistory((prev) => [...prev, false]);
    }
  };

  const handleNext = () => {
    soundController.playClick();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      soundController.playFanfare();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const handleRestart = () => {
    soundController.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setAnswersHistory([]);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          Uji Evaluasi Pembelajaran
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
          Kuis Juara Lambang Garuda Pancasila
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Uji pemahamanmu mengenai makna helai bulu kemerdekaan, sejarah perancangan, lambang lima sila, dan semboyan Bhinneka Tunggal Ika.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Strip */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
              <span>Pertanyaan {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span className="font-mono text-stone-700 font-bold">Skor: {score} Poin</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-2">
              Kategori: {currentQuestion.category}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug font-serif-patriotic">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let btnClass = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
              if (hasAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500 font-semibold';
                } else if (isSelected) {
                  btnClass = 'bg-red-50 border-red-500 text-red-900 ring-1 ring-red-500';
                } else {
                  btnClass = 'opacity-50 bg-stone-50 border-stone-200 text-stone-500';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {hasAnswered && (
                    <div className="shrink-0">
                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {hasAnswered && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-stone-900 uppercase">
                {selectedOption === currentQuestion.correctIndex ? '✓ Pembahasan Jawaban Benar:' : '✗ Pembahasan Kunci:'}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Soal Berikutnya'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Result Screen */
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Award className="w-9 h-9" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-patriotic">
              Kuis Selesai!
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Kamu telah menyelesaikan seluruh evaluasi materi lambang negara Garuda Pancasila.
            </p>
          </div>

          {/* Score Circle */}
          <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 max-w-sm mx-auto">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
              Skor Perolehan Akhir
            </div>
            <div className="text-5xl font-black text-amber-700 font-mono my-2">
              {score} / 100
            </div>
            <div className="text-xs font-medium text-stone-700">
              {score >= 80 ? 'Predikat: Sangat Memuaskan (Juara Garuda)' : score >= 60 ? 'Predikat: Baik (Lulus Evaluasi)' : 'Predikat: Perlu Membaca Ulang Materi'}
            </div>
          </div>

          {/* Student Name Input for Certificate */}
          <div className="max-w-md mx-auto space-y-3 text-left p-4 bg-amber-50/50 rounded-xl border border-amber-200">
            <label className="text-xs font-bold text-stone-800 block">
              Masukkan Nama Siswa / Peserta untuk Sertifikat:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={() => setShowCertificateModal(true)}
                disabled={!studentName.trim()}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  studentName.trim()
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Lihat Sertifikat</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          studentName={studentName}
          score={score}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
};
