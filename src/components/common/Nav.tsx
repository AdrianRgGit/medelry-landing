export default function Nav() {
  return (
    <div className="fixed top-5 left-5 z-50">
      <img
        src="/media/nav/frame.webp"
        alt="Flower nav frame."
        className="h-[300px] w-[200px]"
      />

      <button
        type="button"
        className="w-[50px] h-[50px] absolute top-[15px] right-2.5 bg-theme-red rounded-full cursor-pointer"
      ></button>

      <nav className="absolute top-18 left-18 flex flex-col">
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
        <a href="#" className="">
          I. Intro
        </a>
      </nav>
    </div>
  );
}
