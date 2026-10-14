import React, { useState } from 'react';
import { Volume2, VolumeX, CheckCircle, XCircle, Home, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { SILA_LIST, SCENARIOS, SilaData } from '../data/garudaData';
import { soundController, speakIndonesian, stopSpeaking } from '../utils/audioSynthesizer';

export const SilaPerisaiDeepDive: React.FC = () => {
  const [activeSilaNumber, setActiveSilaNumber] = useState<number>(1);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [selectedContextTab, setSelectedContextTab] = useState<'school' | 'home' | 'community'>('school');

  // Scenario Practice Game State
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [userSelectedSila, setUserSelectedSila] = useState<number | null>(null);
  const [hasAnsweredScenario, setHasAnsweredScenario] = useState<boolean>(false);
  const [scenarioScore, setScenarioScore] = useState<number>(0);

  const activeSila: SilaData = SILA_LIST.find((s) => s.number === activeSilaNumber) || SILA_LIST[0];
  const currentScenario = SCENARIOS[scenarioIndex];

  const handleSelectSila = (num: number) => {
    soundController.playClick();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    }
    setActiveSilaNumber(num);
  };

  const handleToggleVoice = () => {
    soundController.playClick();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const text = `Sila ke-${activeSila.number}: ${activeSila.name}. Simbol: ${activeSila.symbolName}. ${activeSila.meaning} ${activeSila.philosophicalDetail}`;
      const started = speakIndonesian(text, () => setIsSpeaking(false));
      if (started) setIsSpeaking(true);
    }
  };

  const handleAnswerScenario = (silaNumber: number) => {
    if (hasAnsweredScenario) return;
    setUserSelectedSila(silaNumber);
    setHasAnsweredScenario(true);

    if (silaNumber === currentScenario.correctSila) {
      soundController.playCorrect();
      setScenarioScore((prev) => prev + 10);
    } else {
      soundController.playIncorrect();
    }
  };

  const handleNextScenario = () => {
    soundController.playClick();
    setUserSelectedSila(null);
    setHasAnsweredScenario(false);
    setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-4">
        <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
          Modul Pembelajaran 02
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif-patriotic">
          Makna Lima Sila Pancasila & Penerapan Sehari-hari
        </h1>
        <p className="text-stone-600 text-sm mt-1 max-w-2xl">
          Eksplorasi simbol pada perisai jantung, latar filosofisnya, serta wujud pengamalannya dalam kehidupan di rumah, sekolah, dan masyarakat.
        </p>
      </div>

      {/* Sila Selector Buttons (Segmented Controls) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {SILA_LIST.map((sila) => {
          const isSelected = activeSilaNumber === sila.number;
          return (
            <button
              key={sila.number}
              onClick={() => handleSelectSila(sila.number)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-50 border-amber-500 shadow-sm ring-1 ring-amber-500'
                  : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-stone-500">Sila {sila.number}</span>
                <span
                  className="w-3 h-3 rounded-full border border-stone-300"
                  style={{ backgroundColor: sila.bgHex }}
                />
              </div>
              <div className="text-xs font-semibold text-stone-900 truncate">
                {sila.symbolName.split(' ')[0]}
              </div>
              <div className="text-[11px] text-stone-500 truncate mt-0.5">
                {sila.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Sila Interactive Detail Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Symbol Visual Showcase (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl border border-stone-200 bg-stone-50/70 text-center">
            {/* Visual Emblem rendering container */}
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center shadow-md p-4 mb-4 border-2 border-stone-700/20"
              style={{ backgroundColor: activeSila.bgHex }}
            >
              {activeSila.number === 1 && (
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <polygon
                    points="50,10 62,38 92,38 68,56 77,84 50,68 23,84 32,56 8,38 38,38"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                </svg>
              )}
              {activeSila.number === 2 && (
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <circle cx="32" cy="32" r="14" fill="none" stroke="#FBBF24" strokeWidth="6" />
                  <rect x="44" y="24" width="22" height="16" rx="3" fill="none" stroke="#F59E0B" strokeWidth="6" />
                  <circle cx="68" cy="68" r="14" fill="none" stroke="#FBBF24" strokeWidth="6" />
                  <rect x="22" y="58" width="16" height="22" rx="3" fill="none" stroke="#F59E0B" strokeWidth="6" />
                </svg>
              )}
              {activeSila.number === 3 && (
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <path d="M 45 90 L 45 60 L 40 50 L 44 42 L 56 42 L 60 50 L 55 60 L 55 90 Z" fill="#78350F" />
                  <path
                    d="M 20 55 C 5 40 15 15 35 18 C 45 5 65 5 72 18 C 90 15 100 40 85 60 C 80 70 60 72 50 70 C 40 72 25 68 20 55 Z"
                    fill="#15803D"
                    stroke="#14532D"
                    strokeWidth="2"
                  />
                  <line x1="28" y1="55" x2="28" y2="72" stroke="#166534" strokeWidth="2.5" />
                  <line x1="38" y1="58" x2="38" y2="76" stroke="#166534" strokeWidth="2.5" />
                  <line x1="62" y1="58" x2="62" y2="76" stroke="#166534" strokeWidth="2.5" />
                  <line x1="72" y1="55" x2="72" y2="72" stroke="#166534" strokeWidth="2.5" />
                </svg>
              )}
              {activeSila.number === 4 && (
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <path
                    d="M 25 45 C 15 30 10 20 18 12 C 28 5 42 10 50 20 C 58 10 72 5 82 12 C 90 20 85 30 75 45 C 80 60 70 85 50 90 C 30 85 20 60 25 45 Z"
                    fill="#18181B"
                    stroke="#D4D4D8"
                    strokeWidth="1.5"
                  />
                  <path d="M 22 20 C 5 0 2 -12 15 -22 C 22 -12 18 0 28 12 Z" fill="#E4E4E7" stroke="#18181B" strokeWidth="1" />
                  <path d="M 78 20 C 95 0 98 -12 85 -22 C 78 -12 82 0 72 12 Z" fill="#E4E4E7" stroke="#18181B" strokeWidth="1" />
                  <circle cx="38" cy="48" r="4" fill="#EF4444" />
                  <circle cx="62" cy="48" r="4" fill="#EF4444" />
                </svg>
              )}
              {activeSila.number === 5 && (
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  <path d="M 25 85 C 25 50 30 25 45 15" fill="none" stroke="#CA8A04" strokeWidth="3" />
                  {[25, 40, 55, 70].map((y, idx) => (
                    <ellipse key={idx} cx={22 + (idx % 2 ? 6 : -4)} cy={y} rx="6" ry="3.5" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
                  ))}
                  <path d="M 70 85 C 70 50 65 25 55 15" fill="none" stroke="#15803D" strokeWidth="3" />
                  {[30, 48, 66].map((y, idx) => (
                    <circle key={idx} cx="70" cy={y} r="7" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.8" />
                  ))}
                </svg>
              )}
            </div>

            <div className="text-xs font-semibold text-stone-500 uppercase">Simbol Sila {activeSila.number}</div>
            <div className="text-base font-bold text-stone-900 mt-0.5">{activeSila.symbolName}</div>
            <div className="text-xs text-stone-500 mt-1">{activeSila.background}</div>
          </div>

          {/* Sila Description & Philosophy (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Bunyi Sila ke-{activeSila.number}
                </span>
                <h2 className="text-2xl font-bold text-stone-900 mt-0.5 font-serif-patriotic">
                  {activeSila.name}
                </h2>
              </div>

              <button
                onClick={handleToggleVoice}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium shrink-0 ${
                  isSpeaking
                    ? 'bg-amber-700 text-white border-amber-800 animate-pulse'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Heningkan</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Dengarkan</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <div className="text-xs font-semibold text-amber-900 mb-1">Makna Inti:</div>
              <p className="text-sm text-stone-800 leading-relaxed font-medium">
                {activeSila.meaning}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold text-stone-900 mb-1.5">Filsafat Lambang:</div>
              <p className="text-sm text-stone-600 leading-relaxed">
                {activeSila.philosophicalDetail}
              </p>
            </div>

            {/* Application in Daily Life Tabs */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-stone-900 mb-2">Contoh Pengamalan Nyata:</div>
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setSelectedContextTab('school')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedContextTab === 'school'
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Di Sekolah</span>
                </button>
                <button
                  onClick={() => setSelectedContextTab('home')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedContextTab === 'home'
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Di Rumah</span>
                </button>
                <button
                  onClick={() => setSelectedContextTab('community')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedContextTab === 'community'
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Di Masyarakat</span>
                </button>
              </div>

              <ul className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-200">
                {activeSila.examples[selectedContextTab].map((example, idx) => (
                  <li key={idx} className="text-xs text-stone-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mini-Challenge: "Tebak Sila dalam Kehidupan Nyata" */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Latihan Pemahaman Siswa
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Tantangan: Sila Keberapakah Ini?
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-400">Skor: <span className="font-mono text-amber-400 font-bold">{scenarioScore}</span> poin</span>
            <span className="text-stone-500">|</span>
            <span className="text-stone-400">Kasus {scenarioIndex + 1} dari {SCENARIOS.length}</span>
          </div>
        </div>

        {/* Current Scenario Card */}
        <div className="mt-5 space-y-4">
          <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700">
            <div className="text-xs text-amber-300 font-medium mb-1">Konteks: {currentScenario.context}</div>
            <p className="text-sm sm:text-base text-stone-100 font-medium leading-relaxed">
              "{currentScenario.situation}"
            </p>
          </div>

          {/* Sila Choices 1-5 */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {SILA_LIST.map((sila) => {
              const isSelected = userSelectedSila === sila.number;
              const isCorrect = currentScenario.correctSila === sila.number;

              let btnStyle = 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700';
              if (hasAnsweredScenario) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-900/80 text-emerald-100 border-emerald-500 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  btnStyle = 'bg-red-900/80 text-red-100 border-red-500 ring-1 ring-red-500';
                } else {
                  btnStyle = 'opacity-40 bg-stone-800 border-stone-700';
                }
              }

              return (
                <button
                  key={`scenario-btn-${sila.number}`}
                  disabled={hasAnsweredScenario}
                  onClick={() => handleAnswerScenario(sila.number)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${btnStyle}`}
                >
                  <div className="text-xs font-bold text-amber-400">Sila {sila.number}</div>
                  <div className="text-[11px] truncate mt-0.5 text-stone-300">{sila.symbolName.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>

          {/* Answer Feedback Alert */}
          {hasAnsweredScenario && (
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                userSelectedSila === currentScenario.correctSila
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                  : 'bg-red-950/60 border-red-700 text-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {userSelectedSila === currentScenario.correctSila ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase">
                    {userSelectedSila === currentScenario.correctSila ? 'Jawaban Kamu Benar!' : 'Belum Tepat'}
                  </div>
                  <p className="text-xs mt-1 text-stone-300">
                    {currentScenario.explanation}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextScenario}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer shrink-0"
              >
                <span>Kasus Berikutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
