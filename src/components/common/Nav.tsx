import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navItems = [
  "I. Intro",
  "II. Coleccion",
  "III. Joyas",
  "IV. Reliquias",
  "V. Encargos",
  "VI. Historia",
  "VII. Contacto",
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLImageElement>(null);
  const nav = useRef<HTMLElement>(null);
  const navLinks = useRef<HTMLAnchorElement[]>([]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(frame.current, { opacity: isOpen ? 1 : 0.5 });
        gsap.set(nav.current, {
          autoAlpha: isOpen ? 1 : 0,
          clipPath: isOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          pointerEvents: isOpen ? "auto" : "none",
        });
        gsap.set(navLinks.current, { autoAlpha: isOpen ? 1 : 0, y: 0 });
        return;
      }

      const tl = gsap.timeline();

      tl.to(
        frame.current,
        {
          opacity: isOpen ? 1 : 0.5,
          duration: 0.35,
          ease: "power2.out",
        },
        0,
      );

      if (isOpen) {
        tl.set(nav.current, {
          pointerEvents: "auto",
          clipPath: "inset(0% 0% 100% 0%)",
        })
          .fromTo(
            nav.current,
            { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)", y: -8 },
            {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            0,
          )
          .fromTo(
            navLinks.current,
            { autoAlpha: 0, y: -6 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.28,
              ease: "power2.out",
              stagger: 0.035,
            },
            0.15,
          );

        return () => tl.kill();
      }

      tl.to(
        navLinks.current,
        {
          autoAlpha: 0,
          y: 0,
          duration: 0.12,
          ease: "power1.out",
        },
        0,
      )
        .to(
          nav.current,
          {
            autoAlpha: 0,
            clipPath: "inset(0% 0% 100% 0%)",
            y: -8,
            duration: 0.45,
            ease: "power3.inOut",
          },
          0,
        )
        .set(nav.current, { pointerEvents: "none" });

      return () => tl.kill();
    },
    { dependencies: [isOpen], scope: container },
  );

  return (
    <div ref={container} className="fixed top-5 left-5 z-50">
      <div className="relative w-[200px]">
        <img
          ref={frame}
          src="/media/nav/frame.webp"
          alt=""
          aria-hidden="true"
          className="h-[300px] w-[200px] select-none opacity-50"
          draggable={false}
        />

        <nav
          ref={nav}
          id="main-nav"
          aria-label="Navegacion principal"
          className="pointer-events-none invisible absolute left-18 top-18 origin-top overflow-hidden [clip-path:inset(0%_0%_100%_0%)]"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item}
                ref={(element) => {
                  if (element) {
                    navLinks.current[index] = element;
                  }
                }}
                href="#"
                className="invisible text-base leading-tight text-font-black opacity-0 hover:text-font-red focus-visible:text-font-red focus-visible:outline-none"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <button
        type="button"
        aria-controls="main-nav"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Plegar navegacion" : "Desplegar navegacion"}
        onClick={() => setIsOpen((current) => !current)}
        className="absolute right-2.5 top-[15px] grid h-[50px] w-[50px] cursor-pointer place-items-center rounded-full bg-theme-red shadow-[0_3px_0_#4f1708] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-brown active:translate-y-0.5"
      >
        <span
          aria-hidden="true"
          className={`h-3 w-3 border-b-2 border-r-2 border-theme-white transition-transform duration-300 ${
            isOpen ? "rotate-[225deg]" : "rotate-45"
          }`}
        />
      </button>
    </div>
  );
}
