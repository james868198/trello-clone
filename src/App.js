import { Provider } from "react-redux";
import store from "./store";
import Route from "./route";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route/>
      </div>
    </Provider>
  );
}

export default App;
