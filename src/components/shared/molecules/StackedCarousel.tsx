import { useState } from "react";

interface IStackedCarousel {
  id: number;
  title: string;
  backgroundUrl: string;
}

interface IStackedCarouselProps<T extends IStackedCarousel> {
  cards: T[];
  selectedCardIndex?: number;
  handleCarouselSelected?: (card: T) => void;
}

export const StackedCarousel = <T extends IStackedCarousel>({
  cards,
  selectedCardIndex,
  handleCarouselSelected,
}: IStackedCarouselProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState(selectedCardIndex ?? 0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const LIFT = 20;
  const MIN_SCALE = 0.5; // minimum scale for farthest card

  const onCarouselSelect = ({ card, index }: { card: T; index: number }) => {
    setSelectedIndex(index);
    handleCarouselSelected?.(card);
  };

  return (
    <div className="w-full flex justify-center items-center overflow-x-hidden">
      <div className="relative w-full h-[400px]">
        {cards.map((card: T, i) => {
          const distance = Math.abs(i - selectedIndex); // distance from selected
          const scale = Math.max(1 - 0.1 * distance, MIN_SCALE); // progressive scaling based on distance
          const offset = (i - selectedIndex) * 160;
          const isHovered = hoverIndex === i && i !== selectedIndex;
          const translateY = isHovered ? -LIFT : 0;
          const zIndex = i === selectedIndex ? 10 : 5 - distance; // Keep zIndex so selected stays on top, no hover bringing forward

          return (
            <div
              key={card.id}
              onClick={() => onCarouselSelect({ card, index: i })}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              className="
                absolute left-1/4 -translate-x-1/2 shadow-lg cursor-pointer rounded-sm
                transition-transform duration-500 ease-in-out
                h-[240px] sm:h-full w-[240px] sm:w-[470px]
              "
              style={{
                transform: `translateX(${offset}px) translateY(${translateY}px) scale(${scale})`,
                zIndex,
                backgroundImage: `url(${card.backgroundUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
