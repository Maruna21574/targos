import React from 'react';

export interface Service {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  estimatedSteps: string[];
}