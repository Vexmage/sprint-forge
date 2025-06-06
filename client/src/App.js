// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import SprintsPage from './pages/SprintsPage';
import MilestonesPage from './pages/MilestonesPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth.token ? children : <Navigate to="/login" />;
}

function App() {
  const { auth } = useContext(AuthContext);

  return (
      <Router>
          <div className="d-flex vh-100">
              {auth.token && <Sidebar />} {/* Sidebar only displays if logged in */}
              <div className="flex-grow-1 d-flex flex-column">
                  {auth.token && <AppNavbar />} {/* Navbar only displays if logged in */}
                  <div className="container-fluid mt-4 flex-grow-1">
                      <Routes>
                          {/* Public Routes */}
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />

                          {/* Protected Routes */}
                          <Route
                              path="/"
                              element={
                                  <ProtectedRoute>
                                      <Dashboard />
                                  </ProtectedRoute>
                              }
                          />
                          <Route
                              path="/tasks"
                              element={
                                  <ProtectedRoute>
                                      <TasksPage />
                                  </ProtectedRoute>
                              }
                          />
                          <Route
                              path="/sprints"
                              element={
                                  <ProtectedRoute>
                                      <SprintsPage />
                                  </ProtectedRoute>
                              }
                          />
                          <Route
                              path="/milestones"
                              element={
                                  <ProtectedRoute>
                                      <MilestonesPage />
                                  </ProtectedRoute>
                              }
                          />
                          <Route
                              path="/profile"
                              element={
                                  <ProtectedRoute>
                                      <ProfilePage />
                                  </ProtectedRoute>
                              }
                          />
                      </Routes>
                  </div>
              </div>
          </div>
      </Router>
  );
}

export default App;
