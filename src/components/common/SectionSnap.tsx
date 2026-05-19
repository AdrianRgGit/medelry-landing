import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeSectionSnap() {
  useGSAP(() => {
    const main = document.querySelector<HTMLElement>("[data-section-snap]");
    const sections = gsap.utils.toArray<HTMLElement>(
      "[data-section-snap] > section",
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!main || sections.length < 2 || reduceMotion) {
      return;
    }

    let snapPoints: number[] = [];

    const updateSnapPoints = () => {
      const maxScroll = ScrollTrigger.maxScroll(window);

      snapPoints = sections.map((section) => {
        const sectionCenter =
          section.offsetTop + section.offsetHeight / 2 - window.innerHeight / 2;

        return maxScroll
          ? gsap.utils.clamp(0, 1, sectionCenter / maxScroll)
          : 0;
      });
    };

    updateSnapPoints();

    const trigger = ScrollTrigger.create({
      trigger: main,
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      snap: {
        snapTo: (progress) => gsap.utils.snap(snapPoints, progress),
        duration: { min: 0.25, max: 0.7 },
        delay: 0.08,
        ease: "power2.inOut",
        inertia: false,
      },
    });

    const refresh = gsap.delayedCall(0.15, () => ScrollTrigger.refresh()).pause();
    const resizeObserver = new ResizeObserver(() => refresh.restart(true));

    ScrollTrigger.addEventListener("refreshInit", updateSnapPoints);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      refresh.kill();
      ScrollTrigger.removeEventListener("refreshInit", updateSnapPoints);
      trigger.kill();
    };
  });

  return null;
}
