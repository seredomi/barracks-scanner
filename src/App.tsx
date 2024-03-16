import "./App.scss";

import { useState } from 'react';
import { NavBar } from './components/nav-bar.jsx';
import { PageContent } from './components/page-content.jsx';
// import { event } from "@tauri-apps/api";

export type page = "id-scanner" | "personnel" | "scan-history";

function App() {


  const [currPage, setCurrPage] = useState<page>("id-scanner");
  const [readyToScan, setReadyToScan] = useState<boolean>(true);
  const pageProps = { currPage, setCurrPage, readyToScan, setReadyToScan };

  let keyBuffer: string[] = [];
  let keyTimes: number[] = [];

  window.addEventListener('keyup', (e) => {
    if (currPage === 'id-scanner') {
      handleInput(e);
    }
    else {
      console.log("not on id scanner page, ignoring input");
    }
  });

  // this function flushes the buffer to id after enter is pressed
  // it distinguishes between human input and barcode input based on time b/w key presses
  // the only edge case it doesn't handle is if a user mashes the keyboard while scanning
  function handleInput(event: KeyboardEvent) {

    // first we push the time of the key press to the keyTimes array
    keyTimes.push(performance.now());

    // if enter
    if (event.key === 'Enter') {

      // skip all slow key presses until fast scanner-like key presses
      let startIndex = 0;
      for (let i = 1; i < keyTimes.length; i++) {
          if (keyTimes[i] - keyTimes[i-1] > 35) {
              startIndex = i;
          }
      }
      if (startIndex < keyTimes.length - 1) {
        if (startIndex !== 0) {
            keyBuffer = keyBuffer.slice(startIndex);
        }
        // TODO: send scan to main.rs to be processed
        console.log(keyBuffer);

        keyBuffer = [];
        keyTimes = [];
      }
    }
    // if it's not enter, just push the key to the buffer
    else {
        keyBuffer.push(event.key);
    }
  }

  return (
    <>
      <NavBar {...pageProps} />
      <PageContent {...pageProps} />
    </>
  )
}

export default App;
