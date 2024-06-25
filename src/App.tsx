import "./App.scss";

import Title from './components/title';
import NavBar from './components/nav-bar.jsx';
import PageContent from './components/page-content.jsx';
import { useState } from 'react';
// import { PurgeModal } from './components/purger.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { CronJob } from 'cron';
import { getExpiredPersonnel, AppDispatch }  from './store';

export type page = "id-scanner" | "personnel" | "scan-history";

declare global {
  interface Window {
    handleInput: (e: KeyboardEvent) => void;
  }
}

// test to log current page


const App = () => {

  // const expiredPersonnel = useSelector((state: any) => state.expiredPersonnel.expiredData);
  // const [ purgeModalOpen, setPurgeModalOpen ] = useState(false);
  // const purgeModalProps = {
  //     expiredPersonnel: expiredPersonnel,
  //     purgeModalOpen: purgeModalOpen,
  //     setPurgeModalOpen: setPurgeModalOpen,
  // }
  // const dispatch = useDispatch<AppDispatch>();
  // function promptExpired() {
  //     console.log("15s elapsed !");
  //     setPurgeModalOpen(true);
  //     dispatch(getExpiredPersonnel());
  // }
  // new CronJob(
  //     '0,15,30,45 * * * * *',
  //     promptExpired, null, true
  // )



  return (
    <>
      <Title />
      <NavBar />
      {/*PurgeModal(purgeModalProps)*/}
      <PageContent />
    </>
  )
}

export default App;