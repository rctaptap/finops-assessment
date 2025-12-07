import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold">FinOps Assessment Platform</h1>
        <p className="text-blue-100 mt-2">Evalúa tu madurez FinOps y optimización de costos AWS</p>
      </div>
    </header>
  );
}
