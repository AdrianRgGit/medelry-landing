import { useState } from "react";

const navItems = [
  "I. Intro",
  "II. Coleccion",
  "III. Joyas",
  "IV. Reliquias",
  "V. Encargos",
  "VI. Historia",
  "VII. Contacto",
];

const linkDelays = [
  "delay-[150ms]",
  "delay-[185ms]",
  "delay-[220ms]",
  "delay-[255ms]",
  "delay-[290ms]",
  "delay-[325ms]",
  "delay-[360ms]",
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-5 top-5 z-50">
      <div className="relative w-50">
        <img
          src="/media/nav/frame.webp"
          alt=""
          aria-hidden="true"
          className={`h-75 w-50 select-none transition-opacity duration-350 ease-out motion-reduce:transition-none ${
            isOpen ? "opacity-100" : "opacity-50"
          }`}
          draggable={false}
        />

        <nav
          id="main-nav"
          aria-label="Navegacion principal"
          aria-hidden={!isOpen}
          className={`absolute left-18 top-18 origin-top overflow-hidden transition-[clip-path,opacity,transform] motion-reduce:transition-none ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100 duration-650 ease-out [clip-path:inset(0%_0%_0%_0%)]"
              : "pointer-events-none -translate-y-2 opacity-0 duration-450 ease-in-out [clip-path:inset(0%_0%_100%_0%)]"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                tabIndex={isOpen ? 0 : -1}
                className={`text-base leading-tight text-font-black transition-[color,opacity,transform] hover:text-font-red focus-visible:text-font-red focus-visible:outline-none motion-reduce:translate-y-0 motion-reduce:transition-none ${
                  isOpen
                    ? `${linkDelays[index]} translate-y-0 opacity-100 duration-280 ease-out`
                    : "delay-0 translate-y-0 opacity-0 duration-120 ease-out"
                }`}
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
        className="absolute right-2.5 top-3.75 grid h-12.5 w-12.5 cursor-pointer place-items-center rounded-full bg-theme-red transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-brown active:translate-y-0.5"
      >
        <span
          aria-hidden="true"
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-225deg" : "rotate-45"
          }`}
        />
      </button>
    </div>
  );
}
