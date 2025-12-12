import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect, ReactElement } from "react";

interface IPopup {
  id: string;
  icon: React.ReactNode;
  color: string;
  link?: string;
}

interface IBasketProps {
  className?: string;
  basketIcon: ReactElement;
  popups?: IPopup[];
  popupAlign?: string;
}

export default function Basket({
  className,
  basketIcon,
  popups = [],
  popupAlign = "right",
}: IBasketProps) {
  const [open, setOpen] = useState(false);
  const basketRef = useRef<HTMLDivElement>(null);
  const radius = 85;
  const angleStart = popupAlign === "right" ? 30 : 90;
  const angleEnd = popupAlign === "right" ? 80 : 150;
  const angleStep =
    popups.length > 1 ? (angleEnd - angleStart) / (popups.length - 1) : 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (basketRef.current && !basketRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (basketRef.current) {
        const rect = basketRef.current.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight &&
          rect.bottom > 0 &&
          rect.left < window.innerWidth &&
          rect.right > 0;

        if (!inView) setOpen(false); // close popups if basket is out of view
      }
    };

    // Listen on scroll
    window.addEventListener("scroll", handleScroll, true); // `true` for capturing phase in case of scrollable panels
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <motion.div ref={basketRef} className={`cursor-pointer ${className ?? ""}`}>
      {/* Basket Icon */}
      <motion.div
        className="text-5xl flex justify-center items-center rounded-full w-16 h-16
               [box-shadow:0_0_4px_color-mix(in_srgb,var(--color-secondary)_100%,transparent)]"
        onClick={(e) => {
          e.stopPropagation(); // <-- Prevent outside click listener from closing immediately
          setOpen((prev) => !prev);
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
      >
        {basketIcon &&
          React.cloneElement(basketIcon, {
            className: "text-secondary",
            size: "2.4rem",
          })}
      </motion.div>

      {/* Pop-up icons */}
      <AnimatePresence>
        {open && (
          <div
            className="absolute inset-0 flex justify-center items-center"
            onClick={(e) => e.stopPropagation()} // <-- so clicking popups doesn’t close
          >
            {popups.map((popup, index) => {
              const { id, icon, link } = popup;
              const angle = angleStart + angleStep * index;
              const rad = (angle * Math.PI) / 180;
              const x = radius * Math.cos(rad);
              const y = -radius * Math.sin(rad);

              return (
                <motion.div
                  key={id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className="absolute cursor-pointer"
                  onClick={() => link && window.open(link, "_blank")}
                >
                  {React.cloneElement(icon as React.ReactElement, {
                    color: popup.color,
                    size: "3.4rem",
                  })}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
