import { useState } from 'react';
import './App.scss';
import Products from './components/products/Products';
import Header from './components/header/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Header onSearch={(value) => setSearchTerm(value) } />
      <div className="content">
        <Products searchTerm={searchTerm}/>
      </div>
    </>
  );
}

export default App;
