import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import mangaLogo from "/images/manga-logo.png";

const navLinks = [
  { name: "nav.home", href: "#hero" },
  { name: "nav.methodology", href: "#methodology" },
  { name: "nav.portfolio", href: "#portfolio" },
  { name: "nav.services", href: "#services" },
  { name: "nav.contact", href: "#contact" },
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
    document.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-purple-900/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, "#hero")}
            className={`flex items-center transition-all duration-300 ${
              isScrolled ? "opacity-100" : "opacity-80 hover:opacity-100"
            }`}
          >
            <img src={mangaLogo} alt="Manga Art Logo" className="h-28 sm:h-36 md:h-48 w-auto" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-base font-bold transition-all hover:text-primary relative group ${
                  isScrolled ? "text-black" : "text-black sm:text-black sm:hover:text-primary"
                }`}
              >
                {t(link.name)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
            
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors ${
                isScrolled ? "text-black border-black/20" : "text-black border-black/20"
              }`}
            >
              {i18n.language === 'en' ? (
                <>
                  <span className="text-lg">🇸🇦</span>
                  <span className="text-xs font-bold">AR</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🇬🇧</span>
                  <span className="text-xs font-bold">EN</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled 
                  ? "bg-primary text-primary-foreground shadow-primary/25 shadow-md" 
                  : "bg-white text-primary shadow-xl"
              }`}
            >
              {t("nav.start_learning")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-foreground"
            >
              {i18n.language === 'en' ? "🇸🇦" : "🇬🇧"}
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu className={!isScrolled ? "text-white sm:text-foreground" : ""} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-medium text-foreground hover:text-primary"
                >
                  {t(link.name)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full text-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
              >
                {t("nav.start_learning")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
