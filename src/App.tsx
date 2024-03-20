import "./App.scss";

import Title from './components/title';
import NavBar from './components/nav-bar.jsx';
import PageContent from './components/page-content.jsx';

export type page = "id-scanner" | "personnel" | "scan-history";

declare global {
  interface Window {
    handleInput: (e: KeyboardEvent) => void;
  }
}

// test to log current page


const App = () => {

  console.log("app started");

  return (
    <>
      <Title />
      <NavBar />
      <PageContent />
    </>
  )
}

export default App;