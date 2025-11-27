// import { Slider } from "components/shared/molecules";
// import html5 from "../../assets/images/html5.png";
// import css from "../../assets/images/css.png";
// import js from "../../assets/images/js.png";
// import react from "../../assets/images/react.png";
// import angular from "../../assets/images/angular.png";
// import { useEffect, useState } from "react";

// interface IExperienceProps {
//   isPanelActive: boolean;
// }

// function Experience({ isPanelActive }: IExperienceProps) {
//   const [active, setActive] = useState(false);

//   const skills = [
//     { label: "HTML", image: html5 },
//     { label: "CSS", image: css },
//     { label: "Tailwind", image: css },
//     { label: "JavaScript", image: js },
//     { label: "Typescript", image: react },
//     { label: "React", image: react },
//     { label: "Angular", image: angular },
//     { label: "NextJS", image: angular },
//     { label: "Firebase", image: angular },
//   ];

//   useEffect(() => {
//     let timeout: NodeJS.Timeout;

//     if (isPanelActive) {
//       timeout = setTimeout(() => setActive(true), 20);
//     } else {
//       setTimeout(() => setActive(false), 20);
//     }

//     return () => clearTimeout(timeout);
//   }, [isPanelActive]);

//   return (
//     <div className="h-screen w-full px-4 py-6 md:p-8 bg-background-secondary">
//       <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-row items-start gap-12">
//         <div className="hidden md:block">
//           <Slider contents={skills} isActive={isPanelActive} />
//         </div>
//         <div className="space-y-4">
//           {/* <h1 className="text-primary m-0">Experience</h1> */}
//           <div className="space-y-8">
//             <div className="relative pl-8">
//               <div>
//                 <span
//                   className="absolute left-[1px] top-[14px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10"
//                   style={{
//                     boxShadow: "0 1px 4px 0 var(--color-primary)",
//                   }}
//                 ></span>
//                 <span
//                   className={`absolute left-0 top-[14px] w-[2px] bg-primary-300 origin-top transform transition-transform duration-500
//                   ${active ? "scale-y-100" : "scale-y-0"}`}
//                   style={{
//                     height: "calc(100% - 28px)",
//                     boxShadow: "0 1px 4px 0 var(--color-primary)",
//                   }}
//                 ></span>

//                 <div>
//                   <p className="text-lg mb-1 text-white">Web Developer</p>
//                   <p className="text-secondary text-sm text-white">
//                     Baneshwar, Kathmandu
//                   </p>
//                 </div>
//                 <p className="text-secondary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
//                   blandit, mi hendrerit fringilla tempus, risus lectus gravida
//                   sapien, aliquam rhoncus lacus massa quis dolor. Nam ligula
//                   tortor, condimentum mattis ipsum eu, ullamcorper elementum
//                   sem. Etiam sed risus sollicitudin, aliquet nibh sit amet,
//                   luctus urna. Aenean a ipsum vitae orci commodo consectetur id
//                   tempus odio.
//                 </p>
//               </div>
//               <span className="relative inline-block px-3 py-1 text-sm text-white">
//                 <span
//                   className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2
//                 border-t-[0.6em] border-b-[0.6em] border-r-[0.6em]
//                border-t-transparent border-b-transparent border-r-gray-500"
//                 ></span>
//                 2024
//               </span>
//             </div>
//             <div className="relative pl-8">
//               <div>
//                 <span
//                   className="absolute left-[1px] top-[14px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full z-10"
//                   style={{
//                     boxShadow: "0 1px 4px 0 var(--color-primary)",
//                   }}
//                 ></span>
//                 <span
//                   className={`absolute left-0 top-[14px] w-[2px] bg-primary-300 origin-top transform transition-transform duration-500
//                   ${active ? "scale-y-100" : "scale-y-0"}`}
//                   style={{
//                     height: "calc(100% - 28px)",
//                     boxShadow: "0 1px 4px 0 var(--color-primary)",
//                   }}
//                 ></span>

//                 <div>
//                   <p className="text-lg mb-1 text-white">Web Developer</p>
//                   <p className="text-secondary text-sm text-white">
//                     Baneshwar, Kathmandu
//                   </p>
//                 </div>
//                 <p className="text-secondary">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
//                   blandit, mi hendrerit fringilla tempus, risus lectus gravida
//                   sapien, aliquam rhoncus lacus massa quis dolor. Nam ligula
//                   tortor, condimentum mattis ipsum eu, ullamcorper elementum
//                   sem. Etiam sed risus sollicitudin, aliquet nibh sit amet,
//                   luctus urna.
//                 </p>
//               </div>
//               <span className="relative inline-block px-3 py-1 text-sm text-white">
//                 <span
//                   className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2
//                 border-t-[0.6em] border-b-[0.6em] border-r-[0.6em]
//                border-t-transparent border-b-transparent border-r-gray-500"
//                 ></span>
//                 2024
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Experience;

import html5 from "../../assets/images/html5.png";
import css from "../../assets/images/css.png";
import js from "../../assets/images/js.png";
import react from "../../assets/images/react.png";
import angular from "../../assets/images/angular.png";
import { Slider } from "components/shared/molecules";
import { useEffect, useState } from "react";
import { motion, Variants, easeOut, TargetAndTransition } from "framer-motion";

interface IExperienceProps {
  isPanelActive: boolean;
}

function Experience({ isPanelActive }: IExperienceProps) {
  const [active, setActive] = useState(false);

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
    hidden: { opacity: 0, y: 150 },
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

  return (
    <div className="h-screen w-full px-4 py-6 md:p-8 bg-background-secondary">
      <div className="sm:w-[calc(100vw-116px)] xl:w-[calc(100vw-130px)] flex flex-row items-start gap-8">
        <div className="hidden md:block py-4">
          {/* <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={active ? "show" : "hidden"}
          >
            <motion.div
              className="relative"
              variants={cardVariants}
              custom={0.4}
            >
              <Slider contents={skills} isActive={isPanelActive} />
            </motion.div>
          </motion.div> */}
          <Slider contents={skills} isActive={isPanelActive} />
          {/* <motion.div
            className="relative w-full p-4 rounded-xl"
            initial={{
              boxShadow: "0px 40px 40px rgba(0,0,0,0.2)",
            }}
            animate={
              isPanelActive
                ? {
                    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                  }
                : {
                    boxShadow: "0px 40px 40px rgba(0,0,0,0.2)",
                  }
            }
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <Slider contents={skills} isActive={isPanelActive} />
          </motion.div> */}
        </div>
        <div className="space-y-4">
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={active ? "show" : "hidden"}
          >
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                className="relative"
                variants={cardVariants}
              >
                <div className="card">
                  <div>
                    <p className="text-lg mb-1 text-white">Web Developer</p>
                    <p className="text-secondary text-sm text-white">
                      Baneshwar, Kathmandu
                    </p>
                  </div>
                  <p className="text-secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin blandit, mi hendrerit fringilla tempus, risus lectus
                    gravida sapien, aliquam rhoncus lacus massa quis dolor. Nam
                    ligula tortor, condimentum mattis ipsum eu, ullamcorper
                    elementum sem. Etiam sed risus sollicitudin, aliquet nibh
                    sit amet, luctus urna. Aenean a ipsum vitae orci commodo
                    consectetur id tempus odio.
                  </p>
                  <span className="relative inline-block px-3 py-1 text-sm text-white">
                    <span
                      className="absolute left-1 top-1/2 -translate-x-full -translate-y-1/2
                        border-t-[0.6em] border-b-[0.6em] border-r-[0.6em]
                        border-t-transparent border-b-transparent border-r-gray-500"
                    ></span>
                    2024
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
