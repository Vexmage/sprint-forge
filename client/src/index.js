// src/index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TaskProvider } from './context/TaskContext';
import { MascotProvider } from './context/MascotContext';
import { SprintProvider } from './context/SprintContext';
import { MilestoneProvider } from './context/MilestoneContext';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider

ReactDOM.render(
  <AuthProvider> {/* Wrap the entire app in AuthProvider */}
      <TaskProvider>
          <SprintProvider>
              <MascotProvider>
                  <MilestoneProvider>
                      <App />
                  </MilestoneProvider>
              </MascotProvider>
          </SprintProvider>
      </TaskProvider>
  </AuthProvider>,
  document.getElementById('root')
);
