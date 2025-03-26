import "./styles.css";
import json from "./data.json";
import { useState } from "react";

//First Understand the Pattern of Your Json
//As you see that every structure is returing the object and inside object it is returning the object
//So returning thge object is the frequent action which is taking place
//So we can write a function for that

const ListObjects = ({ listProp }) => {
  //To track the expanded state
  const [isExpanded, setisExpanded] = useState(false);

  return (
    <div className="container">
      {listProp.map((node) => (
        <div key={node.id}>
          {node.isFolder && (
            <span onClick={() => setisExpanded(!isExpanded)}>+</span>
          )}
          <span>{node.name}</span>
          {node.children && isExpanded && (
            <ListObjects listProp={node.children} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>File Explorer</h1>
      <ListObjects listProp={json} />
    </div>
  );
}
