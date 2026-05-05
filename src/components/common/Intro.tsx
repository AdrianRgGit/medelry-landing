import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Intro() {
  const container = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const restoreScroll = () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };

      if (reduceMotion) {
        gsap.set(container.current, { height: 0 });
        gsap.set(panel.current, { yPercent: -100 });
        restoreScroll();
        return;
      }

      const tl = gsap.timeline({ delay: 5, onComplete: restoreScroll });

      tl.to(
        panel.current,
        {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        0,
      ).to(
        container.current,
        {
          height: 0,
          duration: 1.1,
          ease: "power4.inOut",
        },
        0,
      );

      return () => {
        tl.kill();
        restoreScroll();
      };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative z-10 h-svh overflow-hidden will-change-[height]"
      aria-label="Medelry intro"
    >
      <div
        ref={panel}
        className="absolute inset-0 grid h-svh place-items-center will-change-transform"
      >
        <div className="pointer-events-none absolute inset-7 border border-theme-red" />
        <div className="pointer-events-none absolute inset-11 border border-theme-green" />

        <div className="relative grid justify-items-center gap-4 px-5 text-center">
          <p className="text-2xl leading-none text-font-green sm:text-4xl">
            Jewelry from Medieval
          </p>
          <h1 className="font-piston-black text-[clamp(5rem,17vw,15rem)] leading-[0.82] text-font-red">
            Medelry
          </h1>
        </div>
      </div>
    </div>
  );
}

// <div
//   ref={container}
//   className="relative z-100 h-svh overflow-hidden will-change-[height]"
//   aria-label="Medelry intro"
// >
//   <img
//     ref={panel}
//     src="/media/intro/background.webp"
//     alt="imagen de fondo."
//     className="h-svh mx-auto"
//   />
// </div>
