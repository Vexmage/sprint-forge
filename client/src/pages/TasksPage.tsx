import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { TaskContext } from '../context/TaskContext';
import { SprintContext } from '../context/SprintContext';
import { Task, Status, Sprint } from '../types';
import TaskCard from '../components/TaskCard';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';

function TasksPage() {
  const { tasks, loading, addTask, editTask, deleteTask, changeTaskStatus, assignTaskToSprint } = useContext(TaskContext)!;
  const { sprints } = useContext(SprintContext)!;

  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'sprintId'>>({
    title: '',
    description: '',
    assignee: '',
    status: 'To Do',
    priority: 'Medium',
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        status: 'To Do',
        priority: 'Medium',
      });
    }
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, [name]: value });
    }
  };

  const handleSaveChanges = () => {
    if (selectedTask) {
      editTask(selectedTask);
      setShowModal(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Tasks</h2>

      {/* Task Creation Form */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Add a New Task</h5>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="taskTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="taskAssignee">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Control
                    type="text"
                    name="assignee"
                    value={newTask.assignee}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="taskDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={newTask.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="taskStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="taskPriority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">Add Task</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <Row>
          {tasks.map((task: Task) => (
            <Col md={6} lg={4} key={task.id} className="mb-4">
              <TaskCard
                {...task}
                onEdit={() => handleEditClick(task)}
                onDelete={() => deleteTask(task.id)}
                onStatusChange={(newStatus: Status) => changeTaskStatus(task.id, newStatus)}
                onAssignSprint={(sprintId: number | null) => assignTaskToSprint(task.id, sprintId)}
                sprints={sprints}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask && (
            <Form>
              <Form.Group controlId="editTaskTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedTask.title}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group controlId="editTaskDescription" className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={selectedTask.description}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group controlId="editTaskAssignee" className="mt-2">
                <Form.Label>Assignee</Form.Label>
                <Form.Control
                  type="text"
                  name="assignee"
                  value={selectedTask.assignee}
                  onChange={handleModalChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TasksPage;
