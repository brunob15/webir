import { useState } from "react";
import "./App.scss";
import Products from "./components/products/Products";
import Header from "./components/header/Header";

function App() {
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    brand: [],
    store: [],
  });
  return (
    <>
      <Header onSearch={(value) => setSearchTerm(value)} />
      <div className="content">
        <Products setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;
