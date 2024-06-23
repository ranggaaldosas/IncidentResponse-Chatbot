"use client";

import { motion } from "framer-motion";
import ChatSection from "./components/chat-section";
import Header from "./components/header";
import { AuroraBackground } from "./components/ui/aurora-background";
import { HeroHighlight, Highlight } from "./components/ui/hero-highlight";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="min-h-screen w-full">
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            <Highlight className="text-black dark:text-white">
              Effortlessly summarize your SOC papers.
            </Highlight>{" "}
            Enhance your research with precision and clarity.
          </motion.h1>
        </HeroHighlight>
      </section>
      <section className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="flex-grow flex flex-col items-center gap-2 p-24">
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white 
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          ></div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Start Chat
          </p>
          <ChatSection />
        </div>
      </section>
      <section className="min-h-screen w-full items-center justify-center flex flex-col">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <Header />
          </motion.div>
        </AuroraBackground>
      </section>
    </main>
  );
}
