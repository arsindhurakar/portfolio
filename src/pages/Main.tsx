import { useRef, useState } from "react";
import { About, Contact, Projects, Experience } from "components/sections";
import { Navbar, ScrollPanels, ScrollPanelsHandle } from "components/layout";
import { PanelCode } from "enums";

function Main() {
  const [activePanel, setActivePanel] = useState(0); // track current panel index
  const scrollPanelsRef = useRef<ScrollPanelsHandle>(null);

  const onPanelChange = (index: number) => {
    scrollPanelsRef.current?.goToPanel(index);
  };

  const getVerticalText = (text: string) =>
    text.split("").map((char, i) => (
      <span className="block leading-[1.2]" key={i}>
        {char}
      </span>
    ));

  const ghostTextClass = `
          absolute z-0 font-ghost
          top-0 sm:top-auto sm:left-auto bottom-0 right-0 
          text-[4rem] md:text-[6rem] xl:text-[8rem]
          font-bold text-white/5 select-none pointer-events-none px-4
        `;

  return (
    <div className="relative">
      <Navbar activeIndex={activePanel} handlePanelChange={onPanelChange} />
      <ScrollPanels
        onInternalPanelChange={(index) => {
          setActivePanel(index);
        }}
        ref={scrollPanelsRef}
      >
        <About
          isPanelActive={activePanel === PanelCode.About}
          handleContactMe={onPanelChange}
        />
        <div className="relative">
          <Experience isPanelActive={activePanel === PanelCode.Experience} />
          <span className={ghostTextClass}>
            <span className="block sm:hidden text-center">
              {getVerticalText("EXPERIENCE")}
            </span>
            <span className="hidden sm:block">EXPERIENCE</span>
          </span>
        </div>
        <div className="relative">
          <Projects />
          <span className={ghostTextClass}>
            <span className="block sm:hidden text-center">
              {getVerticalText("PROJECTS")}
            </span>
            <span className="hidden sm:block">PROJECTS</span>
          </span>
        </div>
        <div className="relative">
          <Contact isPanelActive={activePanel === PanelCode.Contact} />
          <span className={ghostTextClass}>
            <span className="block sm:hidden text-center">
              {getVerticalText("CONTACT")}
            </span>
            <span className="hidden sm:block">CONTACT</span>
          </span>
        </div>
      </ScrollPanels>
    </div>
  );
}

export default Main;
