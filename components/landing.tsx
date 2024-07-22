"use client"
import { motion } from "framer-motion";

import AppTitle from "./AppTitle";
import Globe from "./Globe";
import { useTheme } from "next-themes";

const Landing = () => {
  const { theme } = useTheme()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, type: "easeInOut" }}
        className="z-10"
      >
        <AppTitle />
      </motion.div>
      <div className="absolute grid left-0 right-0 m-auto place-items-center overflow-hidden opacity-40">
        {theme === "dark" ? <Globe dark={1} /> : <Globe dark={0} />}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.5, type: "easeInOut" }}
        className="z-10 flex w-full flex-col gap-6"
      >

      </motion.div>
    </>
  );
};

export default Landing;
