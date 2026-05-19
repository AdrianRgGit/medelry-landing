import type { MouseEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const navItems = [
  { label: "I. Intro", id: "intro" },
  { label: "II. Historia", id: "history" },
  { label: "III. Colecci\u00f3n", id: "collection" },
  { label: "IV. Filosof\u00eda", id: "philosophy" },
  { label: "V. Para qui\u00e9n", id: "audience" },
  { label: "VI. Valores", id: "values" },
  { label: "VII. Cierre", id: "closing" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sword1Ref = useRef<HTMLImageElement>(null);
  const sword2Ref = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const o = isOpen;

      gsap.to("[data-frame]", {
        opacity: o ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(buttonRef.current, {
        opacity: o ? 1 : 0.5,
        scale: o ? 1 : 0.5,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(navRef.current, {
        clipPath: o ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        opacity: o ? 1 : 0,
        pointerEvents: o ? "auto" : "none",
        duration: o ? 0.65 : 0.45,
        ease: o ? "power2.out" : "power2.inOut",
      });

      gsap.to("[data-link]", {
        opacity: o ? 1 : 0,
        duration: o ? 0.28 : 0.12,
        ease: "power2.out",
        stagger: o ? 0.035 : 0,
      });

      gsap.to(sword1Ref.current, {
        scale: o ? 0.75 : 1,
        xPercent: o ? -50 : -70,
        yPercent: -50,
        rotate: o ? 45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(sword2Ref.current, {
        scale: o ? 0.75 : 1,
        xPercent: o ? -50 : -30,
        yPercent: -50,
        rotate: o ? -45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [isOpen] },
  );

  useEffect(() => {
    const syncActiveHash = () => {
      const sectionId = window.location.hash.replace("#", "");

      if (navItems.some((item) => item.id === sectionId)) {
        setActiveSection(sectionId);
      }
    };

    syncActiveHash();

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (activeEntry?.target.id) {
          setActiveSection(activeEntry.target.id);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncActiveHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveHash);
    };
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    event.preventDefault();
    setActiveSection(sectionId);
    setIsOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${sectionId}`);
  };

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
                key={item.id}
                data-link
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "true" : undefined}
                onClick={(event) => handleNavClick(event, item.id)}
                tabIndex={isOpen ? 0 : -1}
                className={`text-base leading-tight hover:text-font-red focus-visible:text-font-red focus-visible:outline-none ${
                  activeSection === item.id ? "text-font-red" : "text-font-black"
                }`}
                style={{ opacity: 0 }}
              >
                {item.label}
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
        className="absolute -right-px top-1 grid h-18 w-18 cursor-pointer place-items-center rounded-full p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-brown active:translate-y-0.5"
        style={{ opacity: 0.5, scale: "0.5" }}
      >
        <span aria-hidden="true" className="relative block h-14 w-14">
          <img
            ref={sword1Ref}
            src="/src/assets/sword.svg"
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 h-16 w-16 max-w-none select-none"
            style={{ xPercent: -70, yPercent: -50 } as React.CSSProperties}
          />
          <img
            ref={sword2Ref}
            src="/src/assets/sword.svg"
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 h-16 w-16 max-w-none select-none"
            style={{ xPercent: -30, yPercent: -50 } as React.CSSProperties}
          />
        </span>
      </button>
    </div>
  );
}
