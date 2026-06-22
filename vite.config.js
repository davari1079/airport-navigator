import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the Airport Navigator project.
// This file configures the React plugin so that JSX and other
// React features are properly handled during development and build.

export default defineConfig({
  plugins: [react()],
});