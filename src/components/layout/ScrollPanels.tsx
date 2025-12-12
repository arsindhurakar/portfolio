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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const ScrollPanels = forwardRef<ScrollPanelsHandle, IScrollPanelsProps>(
  ({ children, onInternalPanelChange }, ref) => {
    const panelRefs = useRef<HTMLDivElement[]>([]);
    const triggers = useRef<ScrollTrigger[]>([]);
    const lastPanelIndex = useRef<number>(0);
    const apiRef = useRef<ScrollPanelsHandle | null>(null);
    const panels = React.Children.toArray(children);
    const isScrollingRef = useRef(false);

    // Setup ScrollTriggers + wheel-locking
    useEffect(() => {
      // Kill previous triggers
      triggers.current.forEach((t) => t.kill());
      triggers.current = [];

      /* Create ScrollTrigger instances */
      panelRefs.current.forEach((panel, index) => {
        const isLast = index === panelRefs.current.length - 1;

        const trigger = ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: isLast ? "bottom bottom" : `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          snap: {
            snapTo: 1,
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
      });

      // Wheel Lock: 1 scroll = 1 panel
      const handleWheel = (e: WheelEvent) => {
        if (isScrollingRef.current) {
          e.preventDefault(); // stop the scroll
          e.stopPropagation(); // stop event bubbling
          return;
        }

        e.preventDefault();
        isScrollingRef.current = true;

        const dir = e.deltaY > 0 ? 1 : -1;
        const next = Math.max(
          0,
          Math.min(panelRefs.current.length - 1, lastPanelIndex.current + dir)
        );

        apiRef.current?.goToPanel(next);

        // unlock wheel after animation
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        triggers.current.forEach((t) => t.kill());
        triggers.current = [];
        window.removeEventListener("wheel", handleWheel);
      };
    }, [onInternalPanelChange]);

    // Expose scroll function to parent
    useImperativeHandle(ref, () => {
      const api: ScrollPanelsHandle = {
        goToPanel(index: number) {
          const trigger = triggers.current[index];

          if (!trigger) return;

          gsap.to(window, {
            duration: 0.6,
            scrollTo: { y: trigger.start + 1, autoKill: false },
            ease: "power2.inOut",
          });
        },
      };

      apiRef.current = api;
      return api;
    });

    return (
      <>
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
      </>
    );
  }
);
