import "./App.scss";

import { Provider } from 'react-redux';
import store from './store';
import Title from './components/title';
import NavBar from './components/nav-bar.jsx';
import PageContent from './components/page-content.jsx';

export type page = "id-scanner" | "personnel" | "scan-history";

// test to log current page
store.subscribe(() => {
  console.log(store.getState().page.currentPage);
});

const App = () => {

  console.log("app started");

  return (
    <>
    <Provider store={store}>
      <Title />
      <NavBar />
      <PageContent />
    </Provider>
    </>
  )
}

export default App;