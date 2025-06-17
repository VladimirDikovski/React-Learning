import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItem] = useState([]);

  function removeItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handlerItem(item) {
    setItem((items) => [...items, item]);
  }

  function updateItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function DeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItem([]);
  }

  return (
    <>
      <Nav />
      <Form handlerItem={handlerItem} />
      <ListItem
        itemList={items}
        onDeleteItem={removeItem}
        updateItem={updateItem}
        deleteItem={DeleteAllItems}
      />
      <Footer items={items} />
    </>
  );
}

function Nav() {
  return (
    <header className="header">
      <div className="nav container">
        <span className="nav-icon">🌴</span>
        <h1 className="nav-header">FAR AWAY</h1>
        <span className="nav-icon">💼</span>
      </div>
    </header>
  );
}

function Form({ handlerItem }) {
  const [name, setName] = useState("");
  const [quontity, setQuontity] = useState(1);

  function handlerForm(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = {
      id: Date.now(),
      itemQuontity: quontity,
      itemName: name,
      packed: false,
    };

    handlerItem(newItem);

    setName("");
    setQuontity(1);
  }

  return (
    <section className="form-section">
      <form className="form container" onSubmit={handlerForm}>
        <h3 className="form-header">What do you need for your trip?</h3>
        <select
          className="quontity"
          value={quontity}
          onChange={(e) => setQuontity(+e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
          <option value={16}>16</option>
          <option value={17}>17</option>
          <option value={18}>18</option>
          <option value={19}>19</option>
          <option value={20}>20</option>
        </select>
        <input
          type="text"
          placeholder="...item"
          className="item-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="btn">ADD</button>
      </form>
    </section>
  );
}

function ListItem({ itemList, onDeleteItem, updateItem, deleteItem }) {
  const [sort, setSort] = useState("input");
  let sortAray = [];

  if (sort === "input") {
    sortAray = itemList;
  }

  if (sort === "description") {
    sortAray = itemList
      .slice()
      .sort((a, b) => a.itemName.localeCompare(b.itemName));
  }

  if (sort === "packed") {
    sortAray = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <section className="item-section">
      <ul className="list-item container">
        {sortAray.map((item) => (
          <Item
            objectItem={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            updateItem={updateItem}
          />
        ))}
      </ul>
      <div className="sort">
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed status</option>
        </select>
        <button className="btn-delete" onClick={deleteItem}>
          Delete All Items
        </button>
      </div>
    </section>
  );
}

function Item({ objectItem, onDeleteItem, updateItem }) {
  return (
    <div>
      <li className={`item ${objectItem.packed ? "underLine" : ""}`}>
        <input
          type="checkbox"
          className="check"
          onClick={() => updateItem(objectItem.id)}
        ></input>
        <p className="item-quontity">{objectItem.itemQuontity}</p>
        <p className="item-name-list">{objectItem.itemName}</p>
        <span className="item-icon" onClick={() => onDeleteItem(objectItem.id)}>
          ❌
        </span>
      </li>
    </div>
  );
}

function Footer({ items }) {
  if (items.length === 0)
    return (
      <p className="footer-body container footer-p ">
        Start packing your item{" "}
      </p>
    );

  const itemsLenght = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentItemsPacket = Math.round((packedItems / itemsLenght) * 100);

  return (
    <footer className="footer">
      <div className="footer-body container">
        <p className="footer-p">
          {percentItemsPacket === 100
            ? "You got everything! Ready to go ✈"
            : `💼 You have ${itemsLenght} items
          on your list, and you already packed ${packedItems} and you have
          ${percentItemsPacket}%`}
        </p>
      </div>
    </footer>
  );
}

export default App;
