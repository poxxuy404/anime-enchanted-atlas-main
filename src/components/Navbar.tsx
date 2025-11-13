import { Link, useLocation } from "react-router-dom";
import { Search, Menu, Sun, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Navbar with slower, smooth slide-down animation.
 * - Uses a mounted state to trigger the entrance animation.
 * - Respects prefers-reduced-motion (disables animations if user requested).
 * - Transition durations tuned for a slow, pleasant effect.
 */

export const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [noMotion, setNoMotion] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  const navLinks = [
    { to: "/", label: "Bosh sahifa" },
    { to: "/browse", label: "Ko'rish" },
    { to: "/favorites", label: "Sevimlilar" },
  ];

  // detect prefers-reduced-motion and listen for changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setNoMotion(mq.matches);
    handler();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
    } else if (typeof (mq as any).addListener === "function") {
      (mq as any).addListener(handler);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", handler);
      } else if (typeof (mq as any).removeListener === "function") {
        (mq as any).removeListener(handler);
      }
    };
  }, []);

  // mount animation (delayed to show entrance)
  useEffect(() => {
    if (noMotion) {
      setMounted(true);
      return;
    }
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, [noMotion]);

  // close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // click outside to close mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!navRef.current) return;
      if (!navRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [mobileMenuOpen]);

  // animation timing (slow)
  const duration = noMotion ? 0 : 850; // ms
  const easing = "cubic-bezier(.16,.84,.44,1)";

  return (
    <nav
      ref={navRef}
      aria-label="Sayt navigatsiyasi"
      // using inline style to ensure consistent timing regardless Tailwind config
      style={{
        transform: mounted ? "translateY(0)" : "translateY(-18px)",
        opacity: mounted ? 1 : 0,
        transitionProperty: "transform, opacity, backdrop-filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/80 bg-background/70"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition hover:scale-[1.02]">
            <div className="text-2xl font-bold gradient-text">AniBro</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`group relative text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 w-full origin-left transform rounded-full bg-primary transition-transform duration-300 ${
                    location.pathname === link.to ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-all duration-300 hover:scale-110"
              aria-label={theme === "dark" ? "Yorug'lik rejimiga o'tish" : "Tungi rejimga o'tish"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((s) => !s)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* Use inline styles for smooth slow animation and to respect noMotion */}
        <div
          id="mobile-menu"
          aria-hidden={!mobileMenuOpen}
          style={{
            transitionProperty: "max-height, opacity, transform",
            transitionDuration: `${noMotion ? 0 : 400}ms`,
            transitionTimingFunction: easing,
            maxHeight: mobileMenuOpen ? 520 : 0,
            opacity: mobileMenuOpen ? 1 : 0,
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-6px)",
            overflow: "hidden",
          }}
          className="md:hidden"
        >
          <div className="py-4 space-y-4 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center justify-between pt-2 px-1">
              <div className="relative flex-1 mr-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Anime qidirish..."
                  className="pl-10 w-full bg-muted/50 border-border"
                  aria-label="Anime qidirish"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-all duration-300 hover:scale-110"
                aria-label={theme === "dark" ? "Yorug'lik rejimiga o'tish" : "Tungi rejimga o'tish"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;