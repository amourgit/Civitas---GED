'use client';

import React from 'react';
import { Navigate } from 'react-router-dom';

export function CalendrierPage() {
  return <Navigate to="/informations/agenda" replace />;
}

export default CalendrierPage;
