import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="header">
      <a href="#home" className="logo">P. SUNDARAMAHALINGAM</a>
      <button 
        className="menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a 
            key={link.href} 
            href={link.href} 
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
