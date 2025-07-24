import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { ExternalLink, Github, Calendar, Star } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Personal Task Manager',
      description: 'A fully functional task management application with real-time updates, drag-and-drop functionality, and local storage persistence. Features include task categories, due dates, priority levels, and progress tracking.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'JavaScript', 'Bootstrap', 'Local Storage', 'Drag & Drop'],
      liveDemo: '/task-manager',
      github: 'https://github.com/Erma-ctrl/task-manager',
      date: '2024',
      featured: true,
      status: 'Live Demo Available'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Interactive weather application with real-time data simulation. Includes geolocation support, 5-day forecasts, weather maps, and beautiful animated weather icons with smooth transitions.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Weather API', 'Geolocation', 'Chart.js', 'CSS Animations'],
      liveDemo: '/weather-dashboard',
      github: 'https://github.com/Erma-ctrl/weather-dashboard',
      date: '2024',
      featured: true,
      status: 'Live Demo Available'
    },
    {
      id: 3,
      title: 'Student Grade Calculator',
      description: 'Comprehensive GPA calculator with semester tracking, course management, and grade analytics. Features include GPA trends, course recommendations, and export functionality for academic records.',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Chart.js', 'PDF Export', 'Local Storage'],
      liveDemo: '/grade-calculator',
      github: 'https://github.com/Erma-ctrl/grade-calculator',
      date: '2023',
      featured: false,
      status: 'Live Demo Available'
    },
    {
      id: 4,
      title: 'Recipe Finder & Meal Planner',
      description: 'Advanced recipe search with meal planning capabilities. Users can search by ingredients, dietary restrictions, save favorites, create weekly meal plans, and generate shopping lists automatically.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Recipe API', 'Meal Planning', 'Shopping Lists'],
      liveDemo: '/recipe-finder',
      github: 'https://github.com/Erma-ctrl/recipe-finder',
      date: '2023',
      featured: false,
      status: 'Live Demo Available'
    },
  ];

  return (
    <section id="projects" className="py-5 projects-section">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className="display-4 fw-bold section-title">My Projects</h2>
            <p className="lead section-subtitle">
              Here are some fully functional projects I've built. Each one is a live demo 
              that you can interact with, showcasing real-world development skills.
            </p>
          </Col>
        </Row>

        {/* Featured Projects */}
        {projects.filter(project => project.featured).map((project, index) => (
          <Row key={project.id} className={`align-items-center mb-5 project-row ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
            <Col lg={6} className="mb-4">
              <Card className="project-card-featured border-0 overflow-hidden">
                <div className="project-image-container">
                  <Card.Img 
                    variant="top" 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <div className="project-status">
                      <Star size={16} className="me-2" />
                      {project.status}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            
            <Col lg={6}>
              <div className="project-content">
                <div className="d-flex align-items-center mb-3">
                  <Calendar size={16} className="text-primary me-2" />
                  <small className="text-muted me-3">{project.date}</small>
                  <Badge bg="primary" className="featured-badge">Featured Project</Badge>
                </div>
                
                <h3 className="h2 fw-bold mb-3 project-title">{project.title}</h3>
                
                <p className="lead mb-4 project-description">{project.description}</p>
                
                <div className="mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} className="tech-badge me-2 mb-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="d-flex gap-3 project-buttons">
                  <Button
                    variant="primary"
                    href={project.liveDemo}
                    className="btn-custom-primary"
                  >
                    <ExternalLink size={18} className="me-2" />
                    Live Demo
                  </Button>
                  <Button
                    variant="outline-primary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom-outline"
                  >
                    <Github size={18} className="me-2" />
                    View Code
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        ))}

        {/* Other Projects Grid */}
        <Row className="g-4 mt-5">
          <Col className="text-center mb-4">
            <h3 className="h3 fw-bold">More Projects</h3>
          </Col>
          {projects.filter(project => !project.featured).map((project) => (
            <Col md={6} key={project.id}>
              <Card className="project-card h-100 border-0">
                <div className="project-image-container">
                  <Card.Img 
                    variant="top" 
                    src={project.image} 
                    alt={project.title}
                    className="project-image-small"
                  />
                  <div className="project-overlay-small">
                    <div className="project-status-small">
                      {project.status}
                    </div>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <Calendar size={14} className="text-primary me-2" />
                    <small className="text-muted">{project.date}</small>
                  </div>
                  
                  <Card.Title className="h5 fw-bold project-card-title">{project.title}</Card.Title>
                  
                  <Card.Text className="flex-grow-1 project-card-text">{project.description}</Card.Text>
                  
                  <div className="mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} className="tech-badge-small me-1 mb-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.liveDemo}
                      className="btn-custom-small flex-fill"
                    >
                      <ExternalLink size={14} className="me-1" />
                      Live Demo
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-custom-small-outline flex-fill"
                    >
                      <Github size={14} className="me-1" />
                      Code
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* GitHub Profile Link */}
        <Row className="mt-5">
          <Col className="text-center">
            <div className="github-cta">
              <h4 className="fw-bold mb-3">Want to see more?</h4>
              <p className="mb-4">Check out all my repositories and contributions on GitHub</p>
              <Button
                variant="dark"
                size="lg"
                href="https://github.com/Erma-ctrl"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-custom-github"
              >
                <Github size={20} className="me-2" />
                Visit My GitHub Profile
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Projects;