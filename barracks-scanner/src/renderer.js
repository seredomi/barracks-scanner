import './app.scss';
import App from './app.jsx';

import * as React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.body);
root.render(<App />);