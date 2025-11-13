import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "AniBro:favorites:v1";

/**
 * useFavorites
 * - Saqlash: localStorage (SSR-safe).
 * - API: favorites (number[]), isFavorite(id), toggleFavorite(id), addFavorite(id), removeFavorite(id), clearFavorites()
 * - Multi-tab sync: "storage" event va custom "AniBro:favorites:changed" event (bir tab ichida ham trigger).
 */

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      if (typeof window === "undefined") return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as number[] : [];
    } catch {
      return [];
    }
  });

  // persist & broadcast
  const persist = useCallback((next: number[]) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        // trigger a custom event so current tab listeners can react as well
        window.dispatchEvent(new CustomEvent("AniBro:favorites:changed", { detail: next }));
      }
    } catch {
      // ignore write errors (e.g., storage full, sandboxed frames)
    }
  }, []);

  useEffect(() => {
    // listen storage events from other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const next = e.newValue ? JSON.parse(e.newValue) as number[] : [];
          setFavorites(Array.isArray(next) ? next : []);
        } catch {
          // ignore parse error
        }
      }
    };

    // custom event for same-tab updates
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent;
      const next = Array.isArray(ce.detail) ? ce.detail : [];
      setFavorites(next);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("AniBro:favorites:changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("AniBro:favorites:changed", onCustom);
    };
  }, []);

  // toggles presence of id
  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      persist(next);
      return next;
    });
  }, [persist]);

  const addFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persist(next);
      return next;
    });
  }, [persist]);

  const removeFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      if (!prev.includes(id)) return prev;
      const next = prev.filter((x) => x !== id);
      persist(next);
      return next;
    });
  }, [persist]);

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    persist([]);
  }, [persist]);

  return {
    favorites,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  } as const;
}

export default useFavorites;