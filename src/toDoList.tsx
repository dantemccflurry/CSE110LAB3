
import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import "./toDoList.css"
import { useParams } from "react-router-dom";

export function ToDoList() {
 const [numRemainingItems, setNumRemainingItems] = useState(0);
 const { name } = useParams();

 let [items, setItems] = useState(dummyGroceryList);

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
  const checkbox: HTMLInputElement = e.target;
  const itemName = checkbox.name;

  const itemIndex = items.findIndex((item) => item.name === itemName);

  const newItems = items.map((item, index) =>
    index === itemIndex
      ? { ...item, isPurchased: checkbox.checked }
      : item
  );

  const checkedItems = newItems.filter((item) => item.isPurchased).length;

  setItems(newItems);
  setNumRemainingItems(checkedItems);
}


 return (
   <div className="App">
     <div className="App-body" style={{}}>
       <div style={{textAlign:"center"}}> <div><h1>{name}'s To Do List</h1></div>Items bought: {numRemainingItems}</div>
       <form action="." style={{textAlign:"center"}}>
         {items.map((item) => ListItem(item, handleCheckboxClick))}
       </form>
     </div>
   </div>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div>
     <input
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
       id={item.name}
     />
     <label htmlFor={item.name}>{item.name}</label>
   </div>
 );
}

