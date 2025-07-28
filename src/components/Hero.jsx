import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeDownload = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ermias_Filfile_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" className="hero-section d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="mb-4">
              <Image
                src="/profile.jpg"
                alt="Ermias Filfile"
                roundedCircle
                className="profile-img mb-4"
              />
            </div>
            
            <h1 className="display-3 fw-bold mb-3 hero-title">
              Hi, I'm <span className="text-gradient">Ermias Filfile</span>
            </h1>
            
            <h2 className="h4 mb-4 text-light hero-subtitle">
              Computer Science Student & Aspiring Full-Stack Developer
            </h2>
            
            <p className="lead mb-5 text-light hero-description">
              Currently in my third year of Computer Science, passionate about web development 
              and building user-friendly applications. I love learning new technologies and 
              turning ideas into reality through code.
            </p>
            
            <div className="mb-5">
              <Button
                variant="primary"
                size="lg"
                className="btn-custom-primary me-3 mb-3"
                onClick={() => scrollToSection('projects')}
              >
                View My Projects
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="btn-custom-outline mb-3"
                onClick={handleResumeDownload}
              >
                <Download size={20} className="me-2" />
                Download Resume
              </Button>
            </div>
            
            <div className="d-flex justify-content-center gap-3 mb-5">
              <a
                href="https://github.com/Erma-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-github"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/ermiasfilfile"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-linkedin"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:ermiasfilfile32@gmail.com"
                className="social-icon social-email"
              >
                <Mail size={24} />
              </a>
            </div>
            
            <Button
              variant="link"
              className="text-light scroll-indicator"
              onClick={() => scrollToSection('about')}
            >
              <ChevronDown size={32} className="animate-bounce" />
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;