import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const appTitle = import.meta.env.VITE_APP_TITLE;

  return (
    <React.Fragment>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default App
