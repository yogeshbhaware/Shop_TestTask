import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import './App.css';
import CreateShop from './Components/Shop/CreateShop';
import ShopListing from './Components/Shop/ShopListing';

function App() {
  return (
    <div className="App">
     <Router>
      <Switch>
        <Route exact path="/createshop" component={CreateShop}/>
        <Route exact path="/" component={ShopListing}/>
      </Switch>
    </Router>
      
    </div>
  );
}

export default App;
