import "./styles.css";
import json from "./data.json";
import { useState } from "react";

// Component to recursively render a tree structure
const ListObjects = ({ listProp, addnodetoList, deletNodeinList }) => {
  // To track the expanded state of folders
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className="container">
      {listProp.map((node) => (
        <div key={node.id}>
          {/* Display toggle button if the node is a folder */}
          {node.isFolder && (
            <span
              className="pointer"
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name], // Toggle expansion state
                }))
              }
            >
              {isExpanded[node.name] ? "-" : "+"}
            </span>
          )}

          {/* Display node name */}
          <span>{node.name}</span>

          {/* For adding the Folder */}
          {node.isFolder && (
            <span
              className="icons"
              onClick={() => {
                addnodetoList(node.id);
              }}
            >
              <img src="https://imgs.search.brave.com/GJuuAWtYZIX9c4AMY2M8GePGU40CwYBTTzfR6eurY0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZm9sZGVycy0y/Mi81MTIvRm9sZGVy/X1dpbl9BZGQucG5n"></img>{" "}
            </span>
          )}
          {/* For adding the Folder and Files */}
          <span
            className="icons"
            onClick={() => {
              deletNodeinList(node.id);
            }}
          >
            <img src="https://imgs.search.brave.com/ORAl-X3JHv-48rEpJzX8WqmvmZPBGvKsCdhv7gYKeq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9lZGl0LWRl/bGV0ZS1pY29uLTUx/Mng1MTItZHRzcjR2/MmsucG5n"></img>{" "}
          </span>

          {/* Render children if present and the node is expanded */}
          {node.children && isExpanded[node.name] && (
            <ListObjects
              listProp={node.children}
              addnodetoList={addnodetoList}
              deletNodeinList={deletNodeinList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [data, setData] = useState(json);

  const addnodetoList = (parentid) => {
    const name = prompt("Enter the Name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentid) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: "1234",
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const deletNodeinList = (itemid) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== itemid)
        .map((node) => {
          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children),
            };
          }
          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  return (
    <div className="App">
      <h1>File Explorer</h1>
      <ListObjects
        listProp={data}
        addnodetoList={addnodetoList}
        deletNodeinList={deletNodeinList}
      />
    </div>
  );
}
