import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-custom">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="mb-4">
              <Button
                variant="primary"
                onClick={scrollToTop}
                className="rounded-circle p-3"
                style={{ width: '60px', height: '60px' }}
              >
                <ArrowUp size={24} />
              </Button>
            </div>

            <div className="mb-4">
              <h3 className="h2 fw-bold mb-3">Ermias Filfile</h3>
              <p className="lead text-light">
                Computer Science Student passionate about web development and building the future through code.
              </p>
            </div>

            <hr className="border-secondary my-4" />

            <div>
              <p className="d-flex align-items-center justify-content-center gap-2 mb-2">
                © {currentYear} Made with <Heart size={16} className="text-danger" /> by Erma-ctrl
              </p>
              <p className="text-muted small">
                Built with React, JavaScript, and Bootstrap.
              </p>
              <a
                href="https://www.tiktok.com/@erma.ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-2 mt-2"
                style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg"
                  alt="TikTok"
                  style={{ width: '20px', height: '20px' }}
                />
                Follow me on TikTok @erma.ctrl
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;