import React from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { Status, Priority, Sprint } from '../types';

interface TaskCardProps {
  title: string;
  description?: string;
  assignee?: string;
  status: Status;
  priority: Priority;
  sprintId?: number | null;
  sprints: Sprint[];
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (newStatus: Status) => void;
  onAssignSprint: (sprintId: number | null) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  assignee,
  status,
  priority,
  sprintId,
  onEdit,
  onDelete,
  onStatusChange,
  onAssignSprint,
  sprints,
}) => {
  return (
    <Card className="task-card mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <p><strong>Assignee:</strong> {assignee || 'Unassigned'}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Priority:</strong> {priority}</p>

        <Dropdown
          onSelect={(selectedKey) => {
            const selectedId = selectedKey !== null ? Number(selectedKey) : null;
            onAssignSprint(selectedId);
          }}
          className="mt-2"
        >
          <Dropdown.Toggle variant="secondary">
            {sprintId ? `Sprint ${sprintId}` : 'Assign to Sprint'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sprints.map((sprint) => (
              <Dropdown.Item key={sprint.id} eventKey={sprint.id.toString()}>
                {sprint.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <div className="mt-3">
          <Button variant="outline-primary" onClick={onEdit} className="me-2">Edit</Button>
          <Button variant="outline-danger" onClick={onDelete}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
