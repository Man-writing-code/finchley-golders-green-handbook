import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ base: '/finchley-golders-green-handbook/', plugins: [react()] });

