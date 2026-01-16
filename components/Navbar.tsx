'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef<HTMLNavElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animar navbar na entrada
    gsap.from(navRef.current, {
      duration: 0.8,
      y: -100,
      opacity: 0,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    // Animar menu mobile
    if (isOpen && menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none',
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Habilidades', href: '#skills' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Nickolas
          </a>

          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu mobile */}
        <div
          ref={menuRef}
          className="md:hidden mt-4 space-y-2 opacity-0 -translate-x-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-gray-900 rounded-lg transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
