import App from './App';

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
// eslint-disable-next-line react/react-in-jsx-scope
root.render(<App tab="home" />);
