import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email',
      value: 'ermiasfilfile32@gmail.com',
      link: 'mailto:ermiasfilfile32@gmail.com',
    },
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      value: '+251 979 151 911',
      link: 'tel:+251979151911',
    },
    {
      icon: <MapPin size={24} />,
      title: 'Location',
      value: 'Debre Berhan, Ethiopia',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/Erma-ctrl',
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ermiasfilfile',
    },
  ];

  return (
    <section id="contact" className="py-5 contact-section">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-4 fw-bold section-title">Get In Touch</h2>
            <p className="lead section-subtitle">
              I'm always open to discussing new opportunities, collaborating on projects, 
              or just having a chat about web development!
            </p>
          </Col>
        </Row>

        <Row className="g-5">
          {/* Contact Information */}
          <Col lg={5}>
            <div className="contact-info">
              <h3 className="h2 fw-bold mb-4">Let's Connect</h3>
              
              <div className="mb-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="contact-info-card border-0 shadow-sm mb-3">
                    <Card.Body className="d-flex align-items-center">
                      <div className="contact-icon me-3">
                        {info.icon}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{info.title}</h5>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="contact-link"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-muted">{info.value}</span>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="fw-bold mb-3">Follow Me</h4>
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon ${social.name.toLowerCase()}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7}>
            <div className="contact-form">
              {showAlert && (
                <Alert variant="success" className="mb-4 custom-alert">
                  {submitMessage}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Name"
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="form-label">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="form-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Subject *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Project Collaboration"
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Hi Ermias, I'd love to connect about..."
                    className="form-input"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="btn-custom-primary w-100"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="me-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;