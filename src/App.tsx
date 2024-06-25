import "./App.scss";

import Title from './components/title';
import NavBar from './components/nav-bar.jsx';
import PageContent from './components/page-content.jsx';
// import { PurgeModal } from './components/purger.tsx';

export type page = "id-scanner" | "personnel" | "scan-history";

declare global {
  interface Window {
    handleInput: (e: KeyboardEvent) => void;
  }
}

const App = () => {

  return (
    <>
      <Title />
      <NavBar />
      <PageContent />
    </>
  )
}

export default App;