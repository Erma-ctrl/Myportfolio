import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-custom ${isScrolled ? 'shadow' : ''}`}
      variant={darkMode ? 'dark' : 'light'}
    >
      <Container>
        <Navbar.Brand 
          href="#hero" 
          className="fw-bold fs-3"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          Ermias Filfile
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              onClick={() => scrollToSection('hero')}
              className="mx-2"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => scrollToSection('about')}
              className="mx-2"
            >
              About
            </Nav.Link>
            <Nav.Link 
              onClick={() => scrollToSection('projects')}
              className="mx-2"
            >
              Projects
            </Nav.Link>
            <Nav.Link 
              onClick={() => scrollToSection('contact')}
              className="mx-2"
            >
              Contact
            </Nav.Link>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={toggleDarkMode}
              className="ms-3"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;