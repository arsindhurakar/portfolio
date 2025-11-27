import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IAboutProps {
  isPanelActive: boolean;
  handleContactMe: (index: number) => void;
}

function About({ isPanelActive, handleContactMe }: IAboutProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPanelActive) {
      timeout = setTimeout(() => setActive(true), 20);
    } else {
      setTimeout(() => setActive(false), 20);
    }

    return () => clearTimeout(timeout);
  }, [isPanelActive]);

  return (
    <div className="h-screen w-full px-4 py-6 md:p-8 flex items-center bg-background-primary">
      <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-row space-y-4">
        <div className="flex flex-col space-y-4 lg:w-2/3">
          <div className="flex space-x-2 items-baseline">
            <span className="text-xl">
              I'
              <motion.span
                style={{ display: "inline-block" }}
                animate={
                  active
                    ? {
                        rotate: [0, 15, -10, 5, 0],
                        y: [0, 15, 0, 5, 0],
                        scale: [1, 1.1, 0.9, 1, 1],
                        // skewX: [0, 5, -5, 2, 0],
                      }
                    : {}
                }
                transition={{ duration: 1, repeat: 0, repeatDelay: 0.5 }}
              >
                M
              </motion.span>
            </span>
            <h1 className="text-primary m-0">Lorem Ipsum</h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            luctus efficitur diam at ultrices. Donec sed egestas odio,{" "}
            <span className="text-primary">id feugiat erat</span>. Morbi eu
            faucibus orci. Donec condimentum molestie mi, at lacinia velit
            bibendum quis. Donec sed volutpat arcu. Mauris non sagittis massa.
            Nunc maximus lacus non lobortis porttitor.
          </p>
          <div className="pt-2">
            <button
              className="button-outlined"
              onClick={() => handleContactMe(3)}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

// अमिन्
