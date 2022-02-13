import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';

export default function RouterList() {
  return useRoutes([
    { path: '/', element: <Navigate to='/task-management' /> },
    { path: '/task-management', element: <Home /> },
  ]);
}
