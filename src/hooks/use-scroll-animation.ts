import { useEffect } from "react";

export type ScrollAnimationOptions = {
  selector?: string;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  observeSubtree?: boolean;
};

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    selector = ".animate-on-scroll",
    threshold = 0.2,
    rootMargin = "0px 0px -80px 0px",
    root = null,
    observeSubtree = true,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mq.matches;

    const supportsIO = typeof IntersectionObserver !== "undefined";
    const observed = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    // Helper: create IntersectionObserver
    const createObserver = () => {
      if (!supportsIO) return;
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            const target = entry.target as Element;
            if (entry.isIntersecting) {
              (target as HTMLElement).classList.add("is-visible");
              obs.unobserve(target);
              observed.delete(target);
            }
          });
        },
        { threshold, rootMargin, root: root ?? undefined },
      );
    };

    // Helper: try to observe element (avoid double observing)
    const tryObserve = (el: Element | null | undefined) => {
      if (!el || !(el instanceof Element)) return;
      const htmlEl = el as HTMLElement;
      if (htmlEl.classList.contains("is-visible")) return;
      if (observed.has(el)) return;
      if (!supportsIO) {
        // Fallback: reveal immediately if no IO support
        htmlEl.classList.add("is-visible");
        return;
      }
      try {
        observer?.observe(el);
        observed.add(el);
      } catch {
        // ignore elements that cannot be observed
        htmlEl.classList.add("is-visible");
      }
    };

    // Reveal all elements (used for reduced motion or lack of IO)
    const revealAll = () => {
      document.querySelectorAll(selector).forEach((el) => (el as HTMLElement).classList.add("is-visible"));
    };

    // Init: observe existing elements or reveal all if reduced-motion
    createObserver();
    const initialElements = Array.from(document.querySelectorAll(selector));
    if (prefersReducedMotion || !supportsIO) {
      revealAll();
    } else {
      initialElements.forEach((el) => tryObserve(el));
    }

    // MutationObserver to watch for dynamically added elements
    const mutationObserver = new MutationObserver((mutations) => {
      if (prefersReducedMotion || !supportsIO) return;
      for (const mutation of mutations) {
        if (!mutation.addedNodes || mutation.addedNodes.length === 0) continue;
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          const element = node as Element;

          // if the added node itself matches
          if (typeof element.matches === "function" && element.matches(selector)) {
            tryObserve(element);
          }

          // any children matching selector
          element.querySelectorAll?.(selector).forEach((child) => tryObserve(child));
        });
      }
    });

    // Start observing DOM mutations
    try {
      mutationObserver.observe(document.body, { childList: true, subtree: observeSubtree });
    } catch {
      // If document.body is not available or observe fails, ignore silently
    }

    // Listen to prefers-reduced-motion changes and respond
    const mqListener = (e: MediaQueryListEvent | MediaQueryList) => {
      // update flag
      prefersReducedMotion = "matches" in e ? e.matches : mq.matches;

      if (prefersReducedMotion) {
        // user prefers reduced motion: reveal everything and stop observers
        revealAll();
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        try {
          mutationObserver.disconnect();
        } catch {}
        observed.clear();
      } else {
        // user allows motion: (re)create observer and observe existing non-visible elements
        if (supportsIO && !observer) createObserver();
        Array.from(document.querySelectorAll(selector)).forEach((el) => tryObserve(el));
        try {
          // resume mutation observing
          mutationObserver.observe(document.body, { childList: true, subtree: observeSubtree });
        } catch {}
      }
    };

    // Attach media query listener (modern + fallback)
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", mqListener as EventListener);
    } else if (typeof (mq as MediaQueryList).addListener === "function") {
      (mq as unknown as MediaQueryList).addListener(mqListener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
    }

    // Cleanup
    return () => {
      if (observer) {
        try {
          observer.disconnect();
        } catch {}
        observer = null;
      }
      try {
        mutationObserver.disconnect();
      } catch {}
      observed.clear();
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", mqListener as EventListener);
      } else if (typeof (mq as MediaQueryList).removeListener === "function") {
        (mq as unknown as MediaQueryList).removeListener(mqListener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
      }
    };
    // depend on primitive values only to avoid rerunning every render
  }, [selector, threshold, rootMargin, root, observeSubtree]);
}