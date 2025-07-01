import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friend, setFriend] = useState(null);
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [friendId, setFriendId] = useState(null);

  function HandeShowForm() {
    setShowFriendForm((showFriendForm) => !showFriendForm);
  }

  function HandleClickFriend(id) {
    const selected = initialFriends.find((fr) => fr.id === id);
    setFriend((curr) => (friendId !== id ? selected : null));

    setFriendId((curr) => (curr !== id ? id : null));
  }

  return (
    <div className="container app-body">
      <div>
        <FriendList HandleClickFriend={HandleClickFriend} friendId={friendId} />
        {showFriendForm && <AddFriend />}
        <Button handleOnClick={HandeShowForm} classButon={"btnuser btnAdd"}>
          {!showFriendForm ? "Add Friend" : "Close"}
        </Button>
      </div>
      <div>
        <SplitTheBill friend={friend} friendId={friendId} />
      </div>
    </div>
  );
}

function FriendList({ HandleClickFriend, friendId }) {
  return (
    <ul className="list-firend">
      {initialFriends.map((friend) => (
        <Friend
          objFriend={friend}
          HandleClickFriend={HandleClickFriend}
          friendId={friendId}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ objFriend, HandleClickFriend, friendId }) {
  return (
    <li className="userList">
      <img
        className="user-prifile"
        src={objFriend.image}
        alt={objFriend.name}
      ></img>
      <div className="user-info">
        <p className="user-name">{objFriend.name}</p>
        <p className="user-status">You and {objFriend.name} are even</p>
      </div>
      <Button
        classButon="btnuser"
        handleOnClick={() => HandleClickFriend(objFriend.id)}
      >
        {friendId === objFriend.id ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function AddFriend() {
  return (
    <form className="form-field">
      <div className="form-body">
        <label className="label-add">👫 FRIEND NAME</label>
        <input className="input-add" type="text"></input>
      </div>
      <div className="form-body">
        <label className="label-add">🖼 IMAGE URL</label>
        <input className="input-add" type="text"></input>
      </div>
      <Button classButon={"btnuser btnAdd"}>Add</Button>
    </form>
  );
}

function Button({ handleOnClick, classButon, children }) {
  return (
    <button onClick={handleOnClick} className={classButon}>
      {children}
    </button>
  );
}

function SplitTheBill({ friend, friendId }) {
  return (
    friendId && (
      <div className="bill">
        <h1>Split the Bill with {friend.name}</h1>
        <div className="bill-body">
          <form className="form-body-bill">
            <BillInputFiend typeInput="text">💰 Bill value</BillInputFiend>
            <BillInputFiend typeInput="text">👸 Your Expense</BillInputFiend>
            <BillInputFiend typeInput="text">
              🧍 {friend.name} Expense
            </BillInputFiend>
            <div className="bill-values">
              <label className="label-add">😊 Who is paying the bill?</label>
              <select className="input-add">
                <option value={1}>You</option>
                <option value={2}>{friend.name}</option>
              </select>
            </div>
            <Button classButon={"btnuser btnAdd"}>Split The Bill</Button>
          </form>
        </div>
      </div>
    )
  );
}

function BillInputFiend({ children, typeInput }) {
  return (
    <div className="bill-values">
      <label className="label-add">{children}</label>
      <input className="input-add" type={typeInput}></input>
    </div>
  );
}

export default App;
