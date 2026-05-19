import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import swordUrl from "../../assets/sword.svg";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sword1Ref = useRef<HTMLImageElement>(null);
  const sword2Ref = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const o = isOpen;

      // Frame: solo opacidad, sin scale
      gsap.to("[data-frame]", {
        opacity: o ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
      });

      // Botón: opacidad + scale
      gsap.to(buttonRef.current, {
        opacity: o ? 1 : 0.5,
        scale: o ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
      });

      // Nav (clip-path)
      gsap.to(navRef.current, {
        clipPath: o ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        opacity: o ? 1 : 0,
        pointerEvents: o ? "auto" : "none",
        duration: o ? 0.65 : 0.45,
        ease: o ? "power2.out" : "power2.inOut",
      });

      // Links escalonados
      gsap.to("[data-link]", {
        opacity: o ? 1 : 0,
        duration: o ? 0.28 : 0.12,
        ease: "power2.out",
        stagger: o ? 0.035 : 0, // ~35 ms entre links al abrir
      });

      // Espadas
      gsap.to(sword1Ref.current, {
        xPercent: o ? -50 : -70,
        yPercent: -50,
        rotate: o ? 45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(sword2Ref.current, {
        xPercent: o ? -50 : -30,
        yPercent: -50,
        rotate: o ? -45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [isOpen] },
  );

  return (
    <div ref={containerRef} className="fixed left-5 top-5 z-50">
      <div className="relative w-50">
        <img
          data-frame
          src="/media/nav/frame.webp"
          alt=""
          aria-hidden="true"
          className="h-75 w-50 select-none"
          style={{ opacity: 0.5 }}
          draggable={false}
        />

        <nav
          ref={navRef}
          id="main-nav"
          aria-label="Navegacion principal"
          aria-hidden={!isOpen}
          className="absolute left-18 top-18 origin-top overflow-hidden"
          style={{
            clipPath: "inset(0% 0% 100% 0%)",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                data-link
                href="#"
                tabIndex={isOpen ? 0 : -1}
                className="text-base leading-tight text-font-black hover:text-font-red focus-visible:text-font-red focus-visible:outline-none"
                style={{ opacity: 0 }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <button
        ref={buttonRef}
        type="button"
        aria-controls="main-nav"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Plegar navegacion" : "Desplegar navegacion"}
        onClick={() => setIsOpen((v) => !v)}
        className="absolute right-0 top-1 grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-brown active:translate-y-0.5"
        style={{ opacity: 0.5, scale: "0.5" }}
      >
        <span aria-hidden="true" className="relative block h-14 w-14">
          <img
            ref={sword1Ref}
            src={swordUrl.src}
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 h-14 w-14 max-w-none select-none"
            style={{ xPercent: -70, yPercent: -50 } as React.CSSProperties}
          />
          <img
            ref={sword2Ref}
            src={swordUrl.src}
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 h-14 w-14 max-w-none select-none"
            style={{ xPercent: -30, yPercent: -50 } as React.CSSProperties}
          />
        </span>
      </button>
    </div>
  );
}
