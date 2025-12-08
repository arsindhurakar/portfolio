import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

interface IScrollPanelsProps {
  children: React.ReactNode[];
  onInternalPanelChange: (index: number) => void;
}

export interface ScrollPanelsHandle {
  goToPanel: (index: number) => void;
}

let scrollTriggers: ScrollTrigger[] = [];

export const ScrollPanels = forwardRef<ScrollPanelsHandle, IScrollPanelsProps>(
  ({ children, onInternalPanelChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRefs = useRef<HTMLDivElement[]>([]);
    const lastPanelIndex = useRef<number | null>(null); // prevents multiple calls
    const triggers = useRef<ScrollTrigger[]>([]);
    const panels = React.Children.toArray(children);

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    useEffect(() => {
      // Kill previous triggers
      scrollTriggers.forEach((trigger) => trigger.kill());
      scrollTriggers = [];

      panelRefs.current.forEach((panel, index) => {
        const isLast = index === panelRefs.current.length - 1;

        const trigger = ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: isLast ? "bottom bottom" : `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          snap: {
            snapTo: 1.05,
            duration: 0.6,
          },
          markers: false,
          onEnter: () => {
            if (lastPanelIndex.current !== index) {
              lastPanelIndex.current = index;
              onInternalPanelChange(index);
            }
          },
          onEnterBack: () => {
            if (lastPanelIndex.current !== index) {
              lastPanelIndex.current = index;
              onInternalPanelChange(index);
            }
          },
        });
        triggers.current[index] = trigger;
        scrollTriggers.push(trigger);
      });

      // Cleanup
      return () => {
        scrollTriggers.forEach((trigger) => trigger.kill());
        scrollTriggers = [];
      };
    }, [onInternalPanelChange]);

    // Expose scroll function to parent
    useImperativeHandle(ref, () => ({
      goToPanel(index: number) {
        const trigger = triggers.current[index];

        if (!trigger) return;

        gsap.to(window, {
          duration: 0.6,
          scrollTo: { y: trigger.start + 1, autoKill: false },
          ease: "power2.inOut",
        });
      },
    }));

    return (
      <div ref={containerRef}>
        {panels.map((child, i) => (
          <div
            key={i}
            className={`panel h-screen w-full ${
              i === panels.length - 1 ? "mb-[2px]" : "mb-0"
            }`}
            ref={(el) => {
              if (el) panelRefs.current[i] = el;
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);
