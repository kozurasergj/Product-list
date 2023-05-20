import { Provider } from 'react-redux';
import store from './store/store';
import Page from "./Components/Page"
import './style/global.css';

const App = () => {
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
