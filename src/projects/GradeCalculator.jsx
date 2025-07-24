import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal, Alert, ProgressBar } from 'react-bootstrap';
import { Plus, Edit, Trash2, Calculator, TrendingUp, Download, Upload, ArrowLeft, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const GradeCalculator = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [formData, setFormData] = useState({
    courseName: '',
    creditHours: '',
    grade: '',
    semester: 'Fall 2024',
    courseCode: '',
    instructor: ''
  });

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const sampleCourses = [
    { 
      id: 1, 
      courseName: 'Data Structures and Algorithms', 
      courseCode: 'CS 201',
      creditHours: 4, 
      grade: 'A', 
      semester: 'Fall 2024',
      instructor: 'Dr. Smith'
    },
    { 
      id: 2, 
      courseName: 'Web Development Fundamentals', 
      courseCode: 'CS 301',
      creditHours: 3, 
      grade: 'A-', 
      semester: 'Fall 2024',
      instructor: 'Prof. Johnson'
    },
    { 
      id: 3, 
      courseName: 'Database Management Systems', 
      courseCode: 'CS 350',
      creditHours: 3, 
      grade: 'B+', 
      semester: 'Fall 2024',
      instructor: 'Dr. Williams'
    },
    { 
      id: 4, 
      courseName: 'Software Engineering Principles', 
      courseCode: 'CS 401',
      creditHours: 4, 
      grade: 'A', 
      semester: 'Spring 2024',
      instructor: 'Prof. Davis'
    },
    { 
      id: 5, 
      courseName: 'Computer Networks', 
      courseCode: 'CS 420',
      creditHours: 3, 
      grade: 'B', 
      semester: 'Spring 2024',
      instructor: 'Dr. Brown'
    },
    { 
      id: 6, 
      courseName: 'Operating Systems', 
      courseCode: 'CS 330',
      creditHours: 4, 
      grade: 'A-', 
      semester: 'Spring 2024',
      instructor: 'Prof. Wilson'
    }
  ];

  useEffect(() => {
    const savedCourses = localStorage.getItem('gradeCalculatorCourses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses(sampleCourses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gradeCalculatorCourses', JSON.stringify(courses));
  }, [courses]);

  const showNotification = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const calculateGPA = (courseList = courses) => {
    if (courseList.length === 0) return 0;
    
    const totalPoints = courseList.reduce((sum, course) => {
      return sum + (gradePoints[course.grade] * course.creditHours);
    }, 0);
    
    const totalCredits = courseList.reduce((sum, course) => sum + course.creditHours, 0);
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const calculateSemesterGPA = (semester) => {
    const semesterCourses = courses.filter(course => course.semester === semester);
    return calculateGPA(semesterCourses);
  };

  const getUniqueSemssters = () => {
    return [...new Set(courses.map(course => course.semester))].sort();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      creditHours: parseInt(formData.creditHours),
      id: editingCourse ? editingCourse.id : Date.now()
    };

    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? courseData : course
      ));
      showNotification('Course updated successfully!');
    } else {
      setCourses([courseData, ...courses]);
      showNotification('Course added successfully!');
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      courseName: '',
      creditHours: '',
      grade: '',
      semester: 'Fall 2024',
      courseCode: '',
      instructor: ''
    });
    setEditingCourse(null);
    setShowModal(false);
  };

  const editCourse = (course) => {
    setFormData({
      courseName: course.courseName,
      creditHours: course.creditHours.toString(),
      grade: course.grade,
      semester: course.semester,
      courseCode: course.courseCode || '',
      instructor: course.instructor || ''
    });
    setEditingCourse(course);
    setShowModal(true);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
    showNotification('Course deleted successfully!');
  };

  const exportData = () => {
    const exportData = {
      courses,
      exportDate: new Date().toISOString(),
      summary: {
        totalCourses: courses.length,
        totalCredits: courses.reduce((sum, course) => sum + course.creditHours, 0),
        overallGPA: calculateGPA(),
        semesterGPAs: getUniqueSemssters().map(semester => ({
          semester,
          gpa: calculateSemesterGPA(semester),
          courses: courses.filter(c => c.semester === semester).length
        }))
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `grade_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showNotification('Grade report exported successfully!');
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.courses && Array.isArray(importedData.courses)) {
            setCourses([...courses, ...importedData.courses]);
            showNotification('Courses imported successfully!');
          } else {
            showNotification('Invalid file format. Please check your file.', 'danger');
          }
        } catch (error) {
          showNotification('Error importing file. Please check file format.', 'danger');
        }
      };
      reader.readAsText(file);
    }
  };

  const getGradeColor = (grade) => {
    if (['A+', 'A', 'A-'].includes(grade)) return 'success';
    if (['B+', 'B', 'B-'].includes(grade)) return 'primary';
    if (['C+', 'C', 'C-'].includes(grade)) return 'warning';
    return 'danger';
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.7) return 'success';
    if (gpa >= 3.0) return 'primary';
    if (gpa >= 2.0) return 'warning';
    return 'danger';
  };

  const overallGPA = calculateGPA();
  const totalCredits = courses.reduce((sum, course) => sum + course.creditHours, 0);
  const averageGrade = courses.length > 0 ? 
    (courses.reduce((sum, course) => sum + gradePoints[course.grade], 0) / courses.length).toFixed(2) : 0;

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary me-3">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="display-4 fw-bold text-primary mb-0">Grade Calculator</h1>
                <p className="lead text-muted mb-0">Track your academic progress and calculate GPA</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                style={{ display: 'none' }}
                id="import-courses"
              />
              <Button
                variant="outline-secondary"
                onClick={() => document.getElementById('import-courses').click()}
                className="d-flex align-items-center gap-2"
              >
                <Upload size={18} />
                Import
              </Button>
              <Button
                variant="outline-primary"
                onClick={exportData}
                className="d-flex align-items-center gap-2"
              >
                <Download size={18} />
                Export
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={20} />
                Add Course
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Alert */}
      {showAlert && (
        <Row className="mb-3">
          <Col>
            <Alert variant={alertType} className="d-flex align-items-center">
              <Award size={20} className="me-2" />
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {/* GPA Overview */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <Calculator size={40} className={`text-${getGPAColor(overallGPA)} mb-3`} />
              <h2 className={`text-${getGPAColor(overallGPA)} fw-bold`}>{overallGPA}</h2>
              <p className="text-muted mb-0">Overall GPA</p>
              <ProgressBar 
                now={(overallGPA / 4.0) * 100} 
                variant={getGPAColor(overallGPA)}
                className="mt-2"
                style={{ height: '6px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <TrendingUp size={40} className="text-success mb-3" />
              <h2 className="text-success fw-bold">{totalCredits}</h2>
              <p className="text-muted mb-0">Total Credits</p>
              <small className="text-muted">Credit Hours Completed</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <BookOpen size={40} className="text-info mb-3" />
              <h2 className="text-info fw-bold">{courses.length}</h2>
              <p className="text-muted mb-0">Total Courses</p>
              <small className="text-muted">Courses Completed</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <Award size={40} className="text-warning mb-3" />
              <h2 className="text-warning fw-bold">{averageGrade}</h2>
              <p className="text-muted mb-0">Average Grade</p>
              <small className="text-muted">Grade Point Average</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Semester GPAs */}
      {getUniqueSemssters().length > 1 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Semester Performance</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  {getUniqueSemssters().map(semester => {
                    const semesterGPA = calculateSemesterGPA(semester);
                    const semesterCourses = courses.filter(c => c.semester === semester);
                    const semesterCredits = semesterCourses.reduce((sum, c) => sum + c.creditHours, 0);
                    
                    return (
                      <Col md={6} lg={4} key={semester} className="mb-3">
                        <Card className="border-0 bg-light h-100">
                          <Card.Body className="text-center">
                            <h4 className={`text-${getGPAColor(semesterGPA)} fw-bold`}>
                              {semesterGPA}
                            </h4>
                            <h6 className="text-primary">{semester}</h6>
                            <small className="text-muted">
                              {semesterCourses.length} courses • {semesterCredits} credits
                            </small>
                            <ProgressBar 
                              now={(semesterGPA / 4.0) * 100} 
                              variant={getGPAColor(semesterGPA)}
                              className="mt-2"
                              style={{ height: '4px' }}
                            />
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Courses Table */}
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Course List</h5>
            </Card.Header>
            <Card.Body>
              {courses.length === 0 ? (
                <div className="text-center py-5">
                  <BookOpen size={64} className="text-muted mb-3" />
                  <h4 className="text-muted">No courses added yet</h4>
                  <p className="text-muted">Add your first course to start tracking your GPA!</p>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} className="me-2" />
                    Add Your First Course
                  </Button>
                </div>
              ) : (
                <Table responsive hover>
                  <thead className="table-light">
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Credits</th>
                      <th>Grade</th>
                      <th>Grade Points</th>
                      <th>Semester</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td className="fw-semibold text-primary">{course.courseCode || 'N/A'}</td>
                        <td className="fw-semibold">{course.courseName}</td>
                        <td className="text-muted">{course.instructor || 'N/A'}</td>
                        <td>{course.creditHours}</td>
                        <td>
                          <Badge bg={getGradeColor(course.grade)} className="px-3 py-2">
                            {course.grade}
                          </Badge>
                        </td>
                        <td className="fw-bold">{(gradePoints[course.grade] * course.creditHours).toFixed(1)}</td>
                        <td>{course.semester}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => editCourse(course)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteCourse(course.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Course Modal */}
      <Modal show={showModal} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingCourse ? 'Edit Course' : 'Add New Course'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.courseName}
                    onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    required
                    placeholder="e.g., Data Structures and Algorithms"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Course Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                    placeholder="e.g., CS 201"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Instructor</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    placeholder="e.g., Dr. Smith"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Credit Hours *</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="6"
                    value={formData.creditHours}
                    onChange={(e) => setFormData({...formData, creditHours: e.target.value})}
                    required
                    placeholder="3"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Grade *</Form.Label>
                  <Form.Select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    required
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(gradePoints).map(grade => (
                      <option key={grade} value={grade}>
                        {grade} ({gradePoints[grade]})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Semester *</Form.Label>
                  <Form.Select
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    required
                  >
                    <option value="Fall 2024">Fall 2024</option>
                    <option value="Spring 2024">Spring 2024</option>
                    <option value="Summer 2024">Summer 2024</option>
                    <option value="Fall 2023">Fall 2023</option>
                    <option value="Spring 2023">Spring 2023</option>
                    <option value="Summer 2023">Summer 2023</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {formData.grade && formData.creditHours && (
              <Alert variant="info">
                <strong>Grade Points:</strong> {(gradePoints[formData.grade] * parseInt(formData.creditHours || 0)).toFixed(1)} points
                <br />
                <strong>Grade Value:</strong> {gradePoints[formData.grade]} × {formData.creditHours} credits
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingCourse ? 'Update Course' : 'Add Course'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default GradeCalculator;