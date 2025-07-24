import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Code, BookOpen, Target, Coffee } from 'lucide-react';

const About = () => {
  const skills = [
    { category: 'Frontend', technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap'] },
    { category: 'Backend', technologies: ['Node.js', 'Python', 'SQL', 'Express', 'MongoDB'] },
    { category: 'Tools', technologies: ['Git', 'VS Code', 'Figma', 'Postman', 'Linux'] },
    { category: 'Learning', technologies: ['Next.js', 'TypeScript', 'Docker', 'AWS', 'GraphQL'] },
  ];

  const highlights = [
    {
      icon: <BookOpen size={40} />,
      title: 'Always Learning',
      description: 'Constantly exploring new technologies and best practices in web development.',
    },
    {
      icon: <Code size={40} />,
      title: 'Clean Code',
      description: 'Writing readable, maintainable code that follows industry standards.',
    },
    {
      icon: <Target size={40} />,
      title: 'Goal-Oriented',
      description: 'Focused on becoming a skilled full-stack developer and building impactful projects.',
    },
    {
      icon: <Coffee size={40} />,
      title: 'Problem Solver',
      description: 'Enjoy tackling challenges and finding creative solutions to complex problems.',
    },
  ];

  return (
    <section id="about" className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-4 fw-bold section-title">About Me</h2>
          </Col>
        </Row>

        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4">
            <Image
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Coding workspace"
              fluid
              rounded
              className="shadow"
            />
          </Col>
          
          <Col lg={6}>
            <h3 className="h2 fw-bold mb-4">My Journey in Computer Science</h3>
            <p className="lead mb-3">
              I'm Ermias Filfile, currently in my third year of Computer Science studies, where I've discovered 
              my passion for web development. What started as curiosity about how websites work 
              has evolved into a deep love for creating digital experiences.
            </p>
            <p className="mb-3">
              My goal is to become a full-stack developer, and I'm actively working on projects 
              that challenge me to learn both frontend and backend technologies. I enjoy the 
              problem-solving aspect of programming and the satisfaction of seeing ideas come to life.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new frameworks, contributing to 
              open-source projects, or working on personal projects that help me grow as a developer.
            </p>
          </Col>
        </Row>

        {/* Skills Section */}
        <Row className="mb-5">
          <Col className="text-center mb-4">
            <h3 className="display-5 fw-bold">Skills & Technologies</h3>
          </Col>
        </Row>
        
        <Row className="g-4 mb-5">
          {skills.map((skill, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="h5 fw-bold text-primary mb-3">
                    {skill.category}
                  </Card.Title>
                  <div>
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="skill-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Highlights Section */}
        <Row className="mb-4">
          <Col className="text-center">
            <h3 className="display-5 fw-bold">What Drives Me</h3>
          </Col>
        </Row>
        
        <Row className="g-4">
          {highlights.map((highlight, index) => (
            <Col md={6} lg={3} key={index} className="text-center">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div className="text-primary mb-3">
                    {highlight.icon}
                  </div>
                  <Card.Title className="h5 fw-bold mb-3">
                    {highlight.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {highlight.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;