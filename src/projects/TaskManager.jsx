import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Modal, Alert, ProgressBar } from 'react-bootstrap';
import { Plus, Edit, Trash2, Check, X, Calendar, Flag, ArrowLeft, Filter, Search, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'personal',
    tags: ''
  });

  // Sample tasks for demonstration
  const sampleTasks = [
    {
      id: 1,
      title: 'Complete React Portfolio',
      description: 'Finish building the personal portfolio website with all project demos',
      priority: 'high',
      dueDate: '2024-12-30',
      category: 'work',
      tags: 'react,portfolio,web-development',
      completed: false,
      createdAt: '2024-12-15T10:00:00.000Z'
    },
    {
      id: 2,
      title: 'Study Data Structures',
      description: 'Review binary trees, graphs, and dynamic programming concepts',
      priority: 'high',
      dueDate: '2024-12-25',
      category: 'study',
      tags: 'algorithms,computer-science,exam-prep',
      completed: false,
      createdAt: '2024-12-14T09:00:00.000Z'
    },
    {
      id: 3,
      title: 'Grocery Shopping',
      description: 'Buy ingredients for Christmas dinner preparation',
      priority: 'medium',
      dueDate: '2024-12-23',
      category: 'personal',
      tags: 'shopping,christmas,family',
      completed: true,
      createdAt: '2024-12-13T15:30:00.000Z'
    },
    {
      id: 4,
      title: 'Database Assignment',
      description: 'Complete the SQL queries and ER diagram for database course',
      priority: 'high',
      dueDate: '2024-12-28',
      category: 'study',
      tags: 'sql,database,assignment',
      completed: false,
      createdAt: '2024-12-12T14:20:00.000Z'
    },
    {
      id: 5,
      title: 'Exercise Routine',
      description: 'Morning workout - 30 minutes cardio and strength training',
      priority: 'low',
      dueDate: '2024-12-22',
      category: 'personal',
      tags: 'health,fitness,routine',
      completed: false,
      createdAt: '2024-12-11T06:00:00.000Z'
    }
  ];

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskManagerTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(sampleTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskManagerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...formData, id: editingTask.id, completed: editingTask.completed, createdAt: editingTask.createdAt }
          : task
      ));
      showNotification('Task updated successfully!');
    } else {
      const newTask = {
        ...formData,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
      showNotification('Task created successfully!');
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      category: 'personal',
      tags: ''
    });
    setEditingTask(null);
    setShowModal(false);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showNotification('Task deleted successfully!');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    showNotification(task.completed ? 'Task marked as incomplete!' : 'Task completed! 🎉');
  };

  const editTask = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      category: task.category,
      tags: task.tags || ''
    });
    setEditingTask(task);
    setShowModal(true);
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks_export.json';
    link.click();
    showNotification('Tasks exported successfully!');
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target.result);
          setTasks([...tasks, ...importedTasks]);
          showNotification('Tasks imported successfully!');
        } catch (error) {
          showNotification('Error importing tasks. Please check file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.tags && task.tags.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filterCategory || task.category === filterCategory;
    const matchesPriority = !filterPriority || task.priority === filterPriority;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'primary';
      case 'personal': return 'info';
      case 'study': return 'success';
      default: return 'secondary';
    }
  };

  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(task => isOverdue(task.dueDate) && !task.completed).length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary me-3">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="display-4 fw-bold text-primary mb-0">Task Manager</h1>
                <p className="lead text-muted mb-0">Stay organized and productive</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <input
                type="file"
                accept=".json"
                onChange={importTasks}
                style={{ display: 'none' }}
                id="import-tasks"
              />
              <Button
                variant="outline-secondary"
                onClick={() => document.getElementById('import-tasks').click()}
              >
                <Upload size={18} className="me-2" />
                Import
              </Button>
              <Button
                variant="outline-primary"
                onClick={exportTasks}
              >
                <Download size={18} className="me-2" />
                Export
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowModal(true)}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={20} />
                Add Task
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Overall Progress</h6>
                <span className="text-muted">{completedTasks}/{totalTasks} tasks completed</span>
              </div>
              <ProgressBar 
                now={progressPercentage} 
                variant={progressPercentage === 100 ? 'success' : 'primary'}
                style={{ height: '10px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alert */}
      {showAlert && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <Check size={20} className="me-2" />
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="text-primary">{totalTasks}</h3>
              <p className="text-muted mb-0">Total Tasks</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="text-success">{completedTasks}</h3>
              <p className="text-muted mb-0">Completed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="text-warning">{totalTasks - completedTasks}</h3>
              <p className="text-muted mb-0">Pending</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm h-100">
            <Card.Body>
              <h3 className="text-danger">{overdueTasks}</h3>
              <p className="text-muted mb-0">Overdue</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <div className="position-relative">
                    <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                  >
                    <option value="">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={() => {
                      setSearchTerm('');
                      setFilterCategory('');
                      setFilterPriority('');
                      setFilterStatus('');
                    }}
                  >
                    <Filter size={18} className="me-2" />
                    Clear
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tasks List */}
      <Row>
        {filteredTasks.length === 0 ? (
          <Col>
            <Card className="text-center py-5 border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-muted">
                  {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
                </h4>
                <p className="text-muted">
                  {tasks.length === 0 
                    ? 'Create your first task to get started!' 
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
                {tasks.length === 0 && (
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} className="me-2" />
                    Add Your First Task
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ) : (
          filteredTasks.map(task => (
            <Col md={6} lg={4} key={task.id} className="mb-3">
              <Card className={`h-100 border-0 shadow-sm ${task.completed ? 'opacity-75' : ''} ${isOverdue(task.dueDate) && !task.completed ? 'border-danger' : ''}`}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex gap-2 flex-wrap">
                      <Badge bg={getPriorityColor(task.priority)}>
                        <Flag size={12} className="me-1" />
                        {task.priority}
                      </Badge>
                      <Badge bg={getCategoryColor(task.category)}>
                        {task.category}
                      </Badge>
                      {isOverdue(task.dueDate) && !task.completed && (
                        <Badge bg="danger">Overdue</Badge>
                      )}
                    </div>
                    <div className="d-flex gap-1">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => editTask(task)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>

                  <h5 className={`card-title ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                    {task.title}
                  </h5>
                  <p className={`card-text ${task.completed ? 'text-muted' : ''}`}>
                    {task.description}
                  </p>

                  {task.tags && (
                    <div className="mb-3">
                      {task.tags.split(',').map((tag, index) => (
                        <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                          #{tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {task.dueDate && (
                    <div className={`d-flex align-items-center mb-3 ${isOverdue(task.dueDate) && !task.completed ? 'text-danger' : 'text-muted'}`}>
                      <Calendar size={14} className="me-2" />
                      <small>{new Date(task.dueDate).toLocaleDateString()}</small>
                    </div>
                  )}

                  <Button
                    variant={task.completed ? 'outline-secondary' : 'success'}
                    size="sm"
                    onClick={() => toggleComplete(task.id)}
                    className="w-100"
                  >
                    {task.completed ? (
                      <>
                        <X size={16} className="me-2" />
                        Mark Incomplete
                      </>
                    ) : (
                      <>
                        <Check size={16} className="me-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add/Edit Task Modal */}
      <Modal show={showModal} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? 'Edit Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    placeholder="Enter task title"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Enter task description"
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="tag1, tag2, tag3"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingTask ? 'Update Task' : 'Add Task'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default TaskManager;