import html5 from "../../assets/images/html5.png";
import css from "../../assets/images/css.png";
import js from "../../assets/images/js.png";
import react from "../../assets/images/react.png";
import angular from "../../assets/images/angular.png";
import { DescriptionModal, Slider } from "components/shared/molecules";
import { useEffect, useRef, useState } from "react";
import { motion, Variants, easeOut, TargetAndTransition } from "framer-motion";
import { Theme } from "context/ThemeContext";
import { IExperience } from "interfaces/experience";
import experience from "../../data/experience.json";
import { useIsSmallScreen } from "utils";

interface IExperienceProps {
  isPanelActive: boolean;
}

function Experience({ isPanelActive }: IExperienceProps) {
  const [active, setActive] = useState(false);
  const [overflowStates, setOverflowStates] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contentRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const selectedExperienceRef = useRef<IExperience>();
  const { experience: experienceData } = experience;
  const HeadingTag = useIsSmallScreen() ? "h1" : "h3";

  const skills = [
    { label: "HTML", image: html5 },
    { label: "CSS", image: css },
    { label: "Tailwind", image: css },
    { label: "JavaScript", image: js },
    { label: "Typescript", image: react },
    { label: "React", image: react },
    { label: "Angular", image: angular },
    { label: "NextJS", image: angular },
    { label: "Firebase", image: angular },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3, // delay between cards
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 160 },
    show: (custom?: number): TargetAndTransition => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 + (custom || 0), ease: easeOut },
    }),
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPanelActive) {
      timeout = setTimeout(() => setActive(true), 20);
    } else {
      setTimeout(() => setActive(false), 20);
    }

    return () => clearTimeout(timeout);
  }, [isPanelActive]);

  useEffect(() => {
    const checkOverflow = () => {
      const newStates = contentRefs.current.map((el) => {
        if (!el) return false;
        return el.scrollHeight > 160;
      });
      setOverflowStates(newStates);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const onOpenModal = (experience: IExperience) => {
    selectedExperienceRef.current = experience;
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="h-screen w-full px-4 py-6 md:p-8 bg-background-secondary">
        <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-row items-start gap-8">
          <div className="hidden md:block py-4">
            <Slider contents={skills} isActive={isPanelActive} />
          </div>
          <div className="space-y-4">
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={active ? "show" : "hidden"}
            >
              {experienceData.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className="relative"
                  variants={cardVariants}
                >
                  <div className="card">
                    <>
                      <HeadingTag className="text-primary mb-0">
                        {experience.designation}
                      </HeadingTag>
                      <p className="text-sm text-gray-400">
                        {experience.address}
                      </p>
                    </>
                    <div
                      className="relative max-h-[192px] overflow-hidden"
                      onClick={() => {
                        if (overflowStates[index]) onOpenModal(experience);
                      }}
                    >
                      <p
                        className="text-secondary"
                        ref={(el) => (contentRefs.current[index] = el)}
                      >
                        {experience.description.map((item, idx) => {
                          if (typeof item === "string") {
                            return <span key={idx}>{item}</span>;
                          } else {
                            return (
                              <span key={idx} className={item.className}>
                                {item.text}
                              </span>
                            );
                          }
                        })}
                      </p>

                      {overflowStates[index] && (
                        <div
                          className="absolute bottom-0 left-0 w-full h-20"
                          style={{
                            background: `linear-gradient(to top, ${Theme.colors[
                              "background-secondary"
                            ]()} 0%, transparent 100%)`,
                          }}
                        />
                      )}
                    </div>

                    <span className="relative inline-block px-3 py-1 text-sm text-white">
                      <span
                        className="absolute left-1 top-1/2 -translate-x-full -translate-y-1/2
                        border-t-[0.6em] border-b-[0.6em] border-r-[0.6em]
                        border-t-transparent border-b-transparent border-r-gray-500"
                      ></span>
                      {experience.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedExperienceRef.current?.designation}
        content={selectedExperienceRef.current?.description}
      />
    </>
  );
}

export default Experience;
