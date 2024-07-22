import type { ReactNode } from "react";

const LinkIconItem = (props: { children: ReactNode; href?: string; onClick: () => void }) => (
  <a
    href={props.href}
    className="group w-10 cursor-pointer place-items-center rounded-xl text-2xlgroup-hover:scale-110 dark:text-slate-8 inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
    onClick={(e) => {
      e.preventDefault();
      props.onClick();
    }}
  >
    {props.children}
  </a>
);

export default LinkIconItem;
