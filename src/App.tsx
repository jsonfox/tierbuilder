import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Create, Tierbuilder } from './routes';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Create />} />
        <Route path="/builder" element={<Tierbuilder />}>
          <Route path=":encoded" element={<Tierbuilder />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
