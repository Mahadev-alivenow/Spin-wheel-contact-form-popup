import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('container');
const root = createRoot(container);

root.render(<h1>Hello World!</h1>);