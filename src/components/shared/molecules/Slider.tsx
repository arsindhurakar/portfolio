import { useState, useEffect } from "react";

interface IContent {
  label: string;
  image: string;
}

interface ISliderProps {
  contents: IContent[];
  isActive: boolean;
}

export const Slider = ({ contents, isActive }: ISliderProps) => {
  const [index, setIndex] = useState(0);

  const IMAGE_SIZE = 200; // size of image
  const ITEM_HEIGHT = IMAGE_SIZE - 20; // container item height
  const CONTAINER_HEIGHT = 220; // rolling display container height

  // Center selected item
  const offset = -index * ITEM_HEIGHT + CONTAINER_HEIGHT / 2 - ITEM_HEIGHT / 2;

  // Auto-advance every 2 seconds
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % contents.length); // loop back to start
    }, 3000);

    return () => clearInterval(interval);
  }, [contents.length, isActive]);

  return (
    <div className="w-[300px] mx-auto text-center flex items-start justify-center gap-8">
      {/* Rolling display */}
      <div
        className="relative w-[200px] overflow-hidden mx-auto"
        style={{ height: `${CONTAINER_HEIGHT}px` }}
      >
        <div
          className="absolute w-full transition-transform duration-300"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {contents.map((skill, i) => {
            const distance = Math.abs(index - i);
            const scale = Math.max(1 - distance * 0.25, 0.8);
            const opacity = Math.max(1 - distance * 0.35, 0.3);

            return (
              <div
                key={skill.label}
                className="flex flex-col items-center justify-center transition-all"
                style={{
                  height: `${ITEM_HEIGHT}px`,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <img
                  src={skill.image}
                  alt={skill.label}
                  className="object-contain select-none transition-all"
                  style={{
                    maxWidth: `${IMAGE_SIZE}px`,
                    height: `${IMAGE_SIZE * scale}px`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Marks */}
      <div
        className="flex flex-col items-start justify-between gap-2"
        style={{ width: "100px" }}
      >
        {contents.map((skill, i) => (
          <span
            key={i}
            className={`cursor-pointer text-xs ${
              index === i ? "font-semibold text-primary" : "text-gray-400"
            }`}
            onClick={() => setIndex(i)}
          >
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  );
};
