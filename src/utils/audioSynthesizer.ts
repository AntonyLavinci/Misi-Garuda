/**
 * Web Audio API & Speech Synthesis utility for Garuda Pancasila Educational Media
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isMelodyPlaying = false;
  private currentTimeoutIds: number[] = [];

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a single synthesized note
  public playNote(freq: number, duration = 0.25, type: OscillatorType = 'triangle', gainValue = 0.15) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Interactive feedback sounds
  public playClick() {
    this.playNote(523.25, 0.08, 'sine', 0.1); // C5
  }

  public playCorrect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    this.playNote(523.25, 0.15, 'triangle', 0.2); // C5
    setTimeout(() => this.playNote(659.25, 0.15, 'triangle', 0.2), 100); // E5
    setTimeout(() => this.playNote(783.99, 0.25, 'triangle', 0.2), 200); // G5
  }

  public playIncorrect() {
    this.playNote(311.13, 0.2, 'sawtooth', 0.12); // Eb4
    setTimeout(() => this.playNote(277.18, 0.3, 'sawtooth', 0.12), 150); // C#4
  }

  public playFanfare() {
    const notes = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.5, d: 0.4 },  // C6
    ];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playNote(n.f, n.d, 'triangle', 0.2), idx * 120);
    });
  }

  // Synthesize melody of "Garuda Pancasila"
  // Frequencies approx: C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
  public playGarudaMelody(onProgress?: (phraseIndex: number) => void, onComplete?: () => void) {
    this.stopGarudaMelody();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isMelodyPlaying = true;

    // Phrase 1: Ga-ru-da Pan-ca-si-la (G4 C5 E5 C5 G4 C5)
    // Phrase 2: A-ku-lah pen-du-kung-mu (E5 F5 G5 F5 E5 D5)
    // Phrase 3: Pa-tri-ot pro-kla-ma-si (F5 E5 D5 C5 B4 C5)
    // Phrase 4: Se-di-a ber-kor-ban un-tuk-mu (D5 E5 F5 G5 A5 G5)
    // Phrase 5: Pan-ca-si-la da-sar ne-ga-ra (C5 C5 D5 E5 F5 G5)
    // Phrase 6: Rak-yat a-dil mak-mur sen-to-sa (F5 E5 D5 C5 D5 E5 D5)
    // Phrase 7: Pri-ba-di bang-sa-ku (G4 A4 B4 C5 D5 C5)
    // Phrase 8: A-yo ma-ju ma-ju, a-yo ma-ju ma-ju!
    const phrases = [
      {
        phraseIdx: 0,
        notes: [
          { f: 392.00, d: 0.3 }, // Ga
          { f: 523.25, d: 0.3 }, // ru
          { f: 659.25, d: 0.35 }, // da
          { f: 523.25, d: 0.35 }, // Pan
          { f: 659.25, d: 0.35 }, // ca
          { f: 783.99, d: 0.6 }, // si - la
        ],
        delay: 0
      },
      {
        phraseIdx: 1,
        notes: [
          { f: 659.25, d: 0.3 }, // A
          { f: 698.46, d: 0.3 }, // ku
          { f: 783.99, d: 0.35 }, // lah
          { f: 698.46, d: 0.3 }, // pen
          { f: 659.25, d: 0.3 }, // du
          { f: 587.33, d: 0.6 }, // kung-mu
        ],
        delay: 2500
      },
      {
        phraseIdx: 2,
        notes: [
          { f: 698.46, d: 0.3 }, // Pa
          { f: 659.25, d: 0.3 }, // tri
          { f: 587.33, d: 0.35 }, // ot
          { f: 523.25, d: 0.3 }, // pro
          { f: 493.88, d: 0.3 }, // kla
          { f: 523.25, d: 0.6 }, // ma-si
        ],
        delay: 5000
      },
      {
        phraseIdx: 3,
        notes: [
          { f: 587.33, d: 0.3 }, // Se
          { f: 659.25, d: 0.3 }, // di
          { f: 698.46, d: 0.3 }, // a
          { f: 783.99, d: 0.35 }, // ber
          { f: 880.00, d: 0.35 }, // kor-ban
          { f: 783.99, d: 0.6 }, // un-tuk-mu
        ],
        delay: 7500
      },
      {
        phraseIdx: 4,
        notes: [
          { f: 523.25, d: 0.3 }, // Pan
          { f: 523.25, d: 0.3 }, // ca
          { f: 587.33, d: 0.3 }, // si
          { f: 659.25, d: 0.35 }, // la
          { f: 698.46, d: 0.35 }, // da-sar
          { f: 783.99, d: 0.6 }, // ne-ga-ra
        ],
        delay: 10200
      },
      {
        phraseIdx: 5,
        notes: [
          { f: 698.46, d: 0.28 }, // Rak
          { f: 659.25, d: 0.28 }, // yat
          { f: 587.33, d: 0.28 }, // a
          { f: 523.25, d: 0.3 }, // dil
          { f: 587.33, d: 0.3 }, // mak-mur
          { f: 659.25, d: 0.3 }, // sen
          { f: 587.33, d: 0.6 }, // to-sa
        ],
        delay: 12800
      },
      {
        phraseIdx: 6,
        notes: [
          { f: 392.00, d: 0.3 }, // Pri
          { f: 440.00, d: 0.3 }, // ba
          { f: 493.88, d: 0.3 }, // di
          { f: 523.25, d: 0.35 }, // bang
          { f: 587.33, d: 0.35 }, // sa
          { f: 523.25, d: 0.6 }, // ku
        ],
        delay: 15400
      },
      {
        phraseIdx: 7,
        notes: [
          { f: 523.25, d: 0.25 }, // A
          { f: 587.33, d: 0.25 }, // yo
          { f: 659.25, d: 0.35 }, // ma-ju
          { f: 698.46, d: 0.35 }, // ma-ju
          { f: 783.99, d: 0.35 }, // a-yo
          { f: 880.00, d: 0.35 }, // ma-ju
          { f: 1046.50, d: 0.8 }, // ma-ju!
        ],
        delay: 17800
      }
    ];

    phrases.forEach((p) => {
      const tId = window.setTimeout(() => {
        if (!this.isMelodyPlaying) return;
        if (onProgress) onProgress(p.phraseIdx);
        let noteOffset = 0;
        p.notes.forEach((note) => {
          setTimeout(() => {
            if (this.isMelodyPlaying) {
              this.playNote(note.f, note.d, 'triangle', 0.22);
            }
          }, noteOffset);
          noteOffset += (note.d * 1000) * 0.95;
        });
      }, p.delay);
      this.currentTimeoutIds.push(tId);
    });

    // Finished
    const finishId = window.setTimeout(() => {
      this.isMelodyPlaying = false;
      if (onComplete) onComplete();
    }, 20800);
    this.currentTimeoutIds.push(finishId);
  }

  public stopGarudaMelody() {
    this.isMelodyPlaying = false;
    this.currentTimeoutIds.forEach((id) => clearTimeout(id));
    this.currentTimeoutIds = [];
  }

  public getIsPlaying(): boolean {
    return this.isMelodyPlaying;
  }
}

export const soundController = new SoundController();

// Indonesian Speech Synthesis Helper
export function speakIndonesian(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95; // Friendly educational pace
  utterance.pitch = 1.05;

  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find((v) => v.lang.includes('id') || v.lang.includes('ID'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
