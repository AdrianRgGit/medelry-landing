import { useEffect, useRef, useState } from "react";

type MuteButtonProps = {
  audioSrc?: string;
  audioLabel?: string;
  storageKey?: string;
  volume?: number;
};

const DEFAULT_STORAGE_KEY = "medelry:background-audio-muted";

export default function MuteButton({
  audioSrc,
  audioLabel = "Musica ambiental de Medelry",
  storageKey = DEFAULT_STORAGE_KEY,
  volume = 0.45,
}: MuteButtonProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(storageKey);

      if (storedValue !== null) {
        setIsMuted(storedValue === "true");
      }
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
  }, [storageKey]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = isMuted;
    audio.volume = Math.min(Math.max(volume, 0), 1);

    try {
      window.localStorage.setItem(storageKey, String(isMuted));
    } catch {
      // Preference persistence is optional; the control still works without it.
    }

    if (isMuted) {
      audio.pause();
      return;
    }

    void audio.play().catch(() => {
      setIsMuted(true);
    });
  }, [isMuted, storageKey, volume]);

  return (
    <>
      {audioSrc ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          aria-label={audioLabel}
          loop
          preload="metadata"
        />
      ) : null}

      <button
        type="button"
        aria-label={isMuted ? "Activar musica" : "Silenciar musica"}
        aria-pressed={!isMuted}
        title={isMuted ? "Activar musica" : "Silenciar musica"}
        onClick={() => setIsMuted((currentValue) => !currentValue)}
        className="fixed bottom-5 right-5 z-50 grid h-15 w-15 cursor-pointer place-items-center rounded-full border border-theme-red bg-theme-white shadow-[0_6px_0_var(--theme-brown)] transition duration-200 hover:-translate-y-0.5 hover:border-theme-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-brown active:translate-y-1 active:shadow-[0_3px_0_var(--theme-brown)]"
      >
        <span aria-hidden="true" className="relative grid h-10 w-10 place-items-center">
          <img
            src="/src/assets/trumpet.svg"
            alt=""
            draggable={false}
            className={`h-9 w-9 select-none transition duration-200 ${
              isMuted ? "opacity-45" : "opacity-100"
            }`}
          />
          {isMuted ? (
            <span className="absolute h-0.5 w-11 rotate-45 rounded-full bg-theme-green" />
          ) : null}
        </span>
      </button>
    </>
  );
}
