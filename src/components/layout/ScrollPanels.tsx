import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
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

const SCROLL_DURATION = 0.6;
const SWIPE_THRESHOLD = 40;
const WHEEL_THRESHOLD = 45;
const WHEEL_RESET_MS = 120;
const BOUNDARY_LOCK_MS = 150;

const isScrollableAncestor = (element: Element | null) => {
  let el = element;

  while (el && el !== document.body) {
    const { overflowY } = window.getComputedStyle(el);

    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight
    ) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
};

const isInteractiveTarget = (element: Element | null) => {
  let el = element;

  while (el && el !== document.body) {
    const tag = el.tagName;

    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      tag === "BUTTON" ||
      tag === "A"
    ) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
};

export const ScrollPanels = forwardRef<ScrollPanelsHandle, IScrollPanelsProps>(
  ({ children, onInternalPanelChange }, ref) => {
    const panelRefs = useRef<HTMLDivElement[]>([]);
    const triggers = useRef<ScrollTrigger[]>([]);
    const currentPanelRef = useRef(0);
    const isAnimatingRef = useRef(false);
    const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
    const onChangeRef = useRef(onInternalPanelChange);
    const panels = React.Children.toArray(children);
    const panelCount = panels.length;

    onChangeRef.current = onInternalPanelChange;

    const getPanelScrollTarget = (index: number) => {
      const trigger = triggers.current[index];
      if (trigger) {
        return trigger.start;
      }

      return panelRefs.current[index]?.offsetTop ?? index * window.innerHeight;
    };

    const setCurrentPanel = (index: number) => {
      if (currentPanelRef.current === index) {
        return;
      }

      currentPanelRef.current = index;
      onChangeRef.current(index);
    };

    const scrollToPanel = (index: number) => {
      const clamped = Math.max(0, Math.min(panelCount - 1, index));
      const trigger = triggers.current[clamped];

      if (!trigger) {
        isAnimatingRef.current = false;
        return;
      }

      ScrollTrigger.refresh();

      scrollTweenRef.current?.kill();
      isAnimatingRef.current = true;

      scrollTweenRef.current = gsap.to(window, {
        duration: SCROLL_DURATION,
        scrollTo: { y: getPanelScrollTarget(clamped), autoKill: false },
        ease: "power2.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
          scrollTweenRef.current = null;
          setCurrentPanel(clamped);
          ScrollTrigger.refresh();
        },
      });
    };

    const scrollToPanelRef = useRef(scrollToPanel);
    scrollToPanelRef.current = scrollToPanel;

    useImperativeHandle(ref, () => ({
      goToPanel: (index: number) => scrollToPanelRef.current(index),
    }));

    useLayoutEffect(() => {
      triggers.current.forEach((t) => t.kill());
      triggers.current = [];

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return;

        const isLast = index === panelCount - 1;

        triggers.current[index] = ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: isLast ? "bottom bottom" : `+=${window.innerHeight}`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          markers: false,
        });
      });

      ScrollTrigger.refresh();
      setCurrentPanel(currentPanelRef.current);
    }, [panelCount]);

    useEffect(() => {
      let wheelDelta = 0;
      let gestureTimer: ReturnType<typeof setTimeout> | null = null;
      let boundaryLocked = false;
      let boundaryLockTimer: ReturnType<typeof setTimeout> | null = null;

      const clearGestureTimer = () => {
        if (gestureTimer) {
          clearTimeout(gestureTimer);
          gestureTimer = null;
        }
      };

      const clearBoundaryLockTimer = () => {
        if (boundaryLockTimer) {
          clearTimeout(boundaryLockTimer);
          boundaryLockTimer = null;
        }
      };

      const lockAfterBoundary = () => {
        wheelDelta = 0;
        boundaryLocked = true;
        clearBoundaryLockTimer();
        boundaryLockTimer = setTimeout(() => {
          boundaryLocked = false;
          wheelDelta = 0;
          boundaryLockTimer = null;
        }, BOUNDARY_LOCK_MS);
      };

      const extendBoundaryLock = () => {
        clearBoundaryLockTimer();
        boundaryLockTimer = setTimeout(() => {
          boundaryLocked = false;
          wheelDelta = 0;
          boundaryLockTimer = null;
        }, BOUNDARY_LOCK_MS);
      };

      const tryNavigate = (dir: 1 | -1) => {
        if (isAnimatingRef.current) {
          return;
        }

        const next = currentPanelRef.current + dir;

        if (next < 0 || next >= panelCount) {
          lockAfterBoundary();
          return;
        }

        scrollToPanelRef.current(next);
      };

      const shouldIgnoreTouch = (target: EventTarget | null) => {
        if (!(target instanceof Element)) {
          return true;
        }

        return isInteractiveTarget(target) || isScrollableAncestor(target);
      };

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();

        if (isAnimatingRef.current) {
          return;
        }

        if (boundaryLocked) {
          extendBoundaryLock();
          return;
        }

        wheelDelta += e.deltaY;
        clearGestureTimer();
        gestureTimer = setTimeout(() => {
          wheelDelta = 0;
          gestureTimer = null;
        }, WHEEL_RESET_MS);

        if (Math.abs(wheelDelta) < WHEEL_THRESHOLD) {
          return;
        }

        const dir = wheelDelta > 0 ? 1 : -1;
        wheelDelta = 0;
        clearGestureTimer();
        tryNavigate(dir);
      };

      let touchStartY = 0;
      let touchStartX = 0;
      let touchActive = false;

      const handleTouchStart = (e: TouchEvent) => {
        if (shouldIgnoreTouch(e.target) || e.touches.length !== 1) {
          touchActive = false;
          return;
        }

        touchActive = true;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!touchActive || shouldIgnoreTouch(e.target)) {
          return;
        }

        e.preventDefault();
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (!touchActive || shouldIgnoreTouch(e.target)) {
          touchActive = false;
          return;
        }

        touchActive = false;

        const deltaY = touchStartY - e.changedTouches[0].clientY;
        const deltaX = touchStartX - e.changedTouches[0].clientX;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          return;
        }

        if (Math.abs(deltaY) < SWIPE_THRESHOLD) {
          return;
        }

        tryNavigate(deltaY > 0 ? 1 : -1);
      };

      const handleTouchCancel = () => {
        touchActive = false;
      };

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("touchcancel", handleTouchCancel, {
        passive: true,
      });
      window.addEventListener("resize", handleResize);

      return () => {
        clearGestureTimer();
        clearBoundaryLockTimer();
        scrollTweenRef.current?.kill();
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchcancel", handleTouchCancel);
        window.removeEventListener("resize", handleResize);
      };
    }, [panelCount]);

    useEffect(() => {
      return () => {
        scrollTweenRef.current?.kill();
        triggers.current.forEach((t) => t.kill());
        triggers.current = [];
      };
    }, [panelCount]);

    return (
      <>
        {panels.map((child, i) => (
          <div
            key={i}
            className={`panel h-screen w-full touch-none ${
              i === panelCount - 1 ? "mb-[2px]" : "mb-0"
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
