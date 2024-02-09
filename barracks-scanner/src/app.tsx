import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

const root = createRoot(document.body);
root.render(App());

function App() {
    return (
        <ChakraProvider>
            <h1>Scanner</h1>
        </ChakraProvider>
    )
}