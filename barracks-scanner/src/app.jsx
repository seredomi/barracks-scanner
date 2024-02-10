import * as React from 'react';
import { Header, HeaderName } from '@carbon/react';
// import './app.scss';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.body);
root.render(App());

function App() {
    return <Header aria-label="Header for Our Skeleton App">
        <HeaderName href="https://react.carbondesignsystem.com/" prefix="Carbon Design System">
        Header for Our Skeleton App
        </HeaderName>
    </Header>;
}