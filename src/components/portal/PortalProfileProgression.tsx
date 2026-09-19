import React from 'react';
import { SophieProfileCard } from './SophieProfileCard';

interface PortalProfileProgressionProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function PortalProfileProgression({ onShowToast }: PortalProfileProgressionProps) {
  return <SophieProfileCard onShowToast={onShowToast} />;
}
