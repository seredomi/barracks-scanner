import "./App.scss";

import { useState, useEffect } from 'react';
import { NavBar } from './components/nav-bar.jsx';
import { PageContent } from './components/page-content.jsx';

export type page = "id-scanner" | "personnel" | "scan-history";

function App() {

  const [currPage, setCurrPage] = useState<page>("id-scanner");
  const [readyToScan, setReadyToScan] = useState<boolean>(true);
  const pageProps = { currPage, setCurrPage, readyToScan, setReadyToScan };

  useEffect(() => {
    console.log("page: " + currPage);
  }, [currPage]);

  return (
    <>
      <NavBar {...pageProps} />
      <PageContent {...pageProps} />
    </>
  )
}

export default App;