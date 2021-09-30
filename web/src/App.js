import './App.scss';
import Products from './components/products/Products';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Products />
      </div>
    </>
  );
}

export default App;
