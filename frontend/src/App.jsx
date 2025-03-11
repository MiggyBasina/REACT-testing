import React, {useEffect, useState} from "react";
import axios from "axios";


const API_URL = "http://localhost:5000/api/items";

function App (){
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    axios
    .get(API_URL)
    .then((response) => setItems(response.data))
    .catch((error) => console.error("Error fetching items:", error));
  }, []);

const addItem = () => {
  axios
  .post(API_URL, {name: newItem})
  .then((response) => setItems([...items, response.data]))
  .catch((error) => console.error("Error adding items:", error));
};

const updateItem = (id, name) => {
  axios
  .put(`${API_URL}/${id}`, { name })
  .then((response) => {
    setItems(items.map((item) => (item.id === id ? response.data : item)));
  })
  .catch((error) => console.error("Error updating item:", error));
};

const deleteItem = (id) => {
  axios
  .delete(`${API_URL}/${id}`)
  .then(() => {
    setItems(items.filter((item) => item.id !== id));
  })
  .catch((error) => console.error("Error deleting item:", error));
};


return(
  <div> 
    <center>
    <h1>REact + Express REST API</h1>
    <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder = "New Item "/>
    <input type="button" value="Add Item" onClick={addItem}/>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
              <input type="text" value={item.name} onChange={(e) => updateItem(item.id, e.target.value)} />
              <input type="button" value="delete" onClick={() => deleteItem(item.id)} />
        </li>
      ))}
    </ul>
    </center>
  </div>
);

};

export default App;