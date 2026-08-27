"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import WeddingContent from "./WeddingContent";

export default function InvitationSeal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#0d2419]">
              <div
                className="absolute inset-0 opacity-[0.22]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M80 20c-8 16-24 24-40 24s-32-8-40-24c8 16 8 40 0 56 8-16 24-24 40-24s32 8 40 24c-8-16-8-40 0-56z M80 80c-8 16-24 24-40 24s-32-8-40-24c8 16 8 40 0 56 8-16 24-24 40-24s32 8 40 24c-8-16-8-40 0-56z' fill='%23d4af37' fill-opacity='0.75'/%3E%3C/svg%3E")`,
                  backgroundSize: "170px 170px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
            </div>

            {/* Vertical gold line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-80" />

            {/* Wax Seal */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative z-10 cursor-pointer group outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 rounded-full bg-[#d4af37]/30 blur-2xl scale-[1.6] group-hover:bg-[#d4af37]/45 transition-all duration-700" />

              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <Image
                  src="/Seal.png"
                  alt="Wax Seal"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              <p className="absolute -bottom-14 left-1/2 -translate-x-1/2 text-[#e8d5a3]/90 text-sm tracking-[0.25em] uppercase whitespace-nowrap font-light">
                Click to Open Invitation
              </p>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Wedding Website Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1 }}
          >
            <WeddingContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}