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
  const [status, setStatus] = useState(null);

  function ShowAndHideBillForm(friend) {
    setStatus((currentStatus) =>
      currentStatus?.id === friend.id ? null : friend
    );
  }

  return (
    <div className="container app-body">
      <div>
        <FriendList ShowAndHideBillForm={ShowAndHideBillForm} status={status} />
        <AddFriend />
      </div>
      <div>
        <SplitTheBill status={status} />
      </div>
    </div>
  );
}

function FriendList({ status, ShowAndHideBillForm }) {
  return (
    <ul className="list-firend">
      {initialFriends.map((friend) => (
        <Friend
          objFriend={friend}
          key={friend.id}
          ShowAndHideBillForm={ShowAndHideBillForm}
          status={status}
        />
      ))}
    </ul>
  );
}

function Friend({ objFriend, ShowAndHideBillForm, status }) {
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
        onClickFunction={ShowAndHideBillForm(objFriend)}
      >
        {status ? "Close" : "Select"}
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

function Button({ classButon, onClickFunction, children }) {
  return (
    <button onClick={onClickFunction} className={classButon}>
      {children}
    </button>
  );
}

function SplitTheBill({ status }) {
  return (
    status && (
      <div className="bill">
        <h1>Split the Bill with Sara</h1>
        <div className="bill-body">
          <form className="form-body-bill">
            <BillInputFiend typeInput="text">💰 Bill value</BillInputFiend>
            <BillInputFiend typeInput="text">👸 Your Expense</BillInputFiend>
            <BillInputFiend typeInput="text">👸 Sarah Expense</BillInputFiend>
            <div className="bill-values">
              <label className="label-add">😊 Who is paying the bill?</label>
              <select className="input-add">
                <option value={1}>You</option>
                <option value={2}>Friend</option>
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
