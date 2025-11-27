import { PiUser, PiUserFill } from "react-icons/pi";
import { HiBriefcase, HiOutlineBriefcase } from "react-icons/hi";
import {
  PiProjectorScreenChart,
  PiProjectorScreenChartFill,
} from "react-icons/pi";
import { RiContactsFill, RiContactsLine } from "react-icons/ri";
import clsx from "clsx";

interface NavbarProps {
  activeIndex: number; // index of the active panel
  handlePanelChange: (index: number) => void;
}

export const Navbar = ({ activeIndex, handlePanelChange }: NavbarProps) => {
  const icons = [
    {
      id: "about",
      icon: <PiUser />,
      activeIcon: <PiUserFill />,
    },
    {
      id: "experience",
      icon: <HiOutlineBriefcase />,
      activeIcon: <HiBriefcase />,
    },
    {
      id: "projects",
      icon: <PiProjectorScreenChart />,
      activeIcon: <PiProjectorScreenChartFill />,
    },
    {
      id: "contact",
      icon: <RiContactsLine />,
      activeIcon: <RiContactsFill />,
    },
  ];

  return (
    <div
      className="
        fixed bottom-0 sm:bottom-auto sm:top-1/2 right-1/2 sm:right-4 
        -translate-y-1/2 translate-x-1/2 sm:translate-x-0
        flex sm:flex-col gap-6 text-2xl z-50
      bg-gray-300/5 backdrop-blur-md border border-white/10 rounded-3xl px-5 sm:px-3 py-3 sm:py-5 shadow-lg
      "
    >
      {icons.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <span
            key={item.id}
            className={clsx(
              "cursor-pointer transition-all duration-300",
              isActive
                ? "scale-[1.35] text-primary"
                : "hover:scale-[1.35] text-primary"
            )}
            onClick={() => handlePanelChange(index)}
          >
            {isActive && item.activeIcon ? item.activeIcon : item.icon}
          </span>
        );
      })}
    </div>
  );
};
