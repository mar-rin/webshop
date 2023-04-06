import React, { useState } from "react";
import Cart from "./Cart";
import Categories from "./Categories";
import Price from "./Price";
import Products from "./Products";
import Search from "./Search";
import data from "./Data";
import Drawer from '@mui/material/Drawer';


function App() {

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [pricePoint, setPricePoint] = useState(300);
  const [inCart, setInCart] = useState([]);
  const [open, setOpen] = useState(false);

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }

  function handleCatFilter(e) {
    if (e.target.innerHTML === "All") {
      setCatFilter("All");
    } else {
      setCatFilter(e.target.innerHTML);
    }
  }

  function handlePrice(e) {
    setPricePoint(e.target.value);
  }

  function toCart(e) {
    const newItem = data.filter((item) => item.name === e.target.name);
    setInCart([
      ...inCart,
      {
        id: inCart.length,
        name: newItem[0]["name"],
        price: newItem[0]["price"]
      }
    ]);
  }

  function deleteItem(e) {
    const toDeleteID = e.target.parentElement.id;
    const newCart = inCart.filter(
      (item, index) => Number(toDeleteID) !== index
    );
    setInCart(newCart);
  }


  return (
    <div className="container">
      <div className="leftMenu">
        <Search handleSearch={handleSearch} />
        <Categories handleCatFilter={handleCatFilter} catFilter={catFilter} />
        <Price
          handlePrice={handlePrice}
          catFilter={catFilter}
          pricePoint={pricePoint}
        />
      </div>
      <div className="content">
        <Products
          search={search}
          catFilter={catFilter}
          pricePoint={pricePoint}
          toCart={toCart}
        />
      </div>
      {(open) ?
          <Drawer open={open} anchor='right' onClose={()=>setOpen(false) }>
            <div className="cart">
              <Cart inCart={inCart} deleteItem={deleteItem} />
            </div>
          </Drawer> :
          <button className="view-cart" onClick={()=>setOpen(true)}>View Cart</button>
      }

    </div>
  );
}

export default App;
