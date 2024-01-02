import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiListCheck, BiUndo } from "react-icons/bi";
import { RiDeleteBin3Fill } from "react-icons/ri";
// import Card from '../Card/Card'

import "./Peers.css"

const Peers = () => {
  let [state, setState] = useState({});
  let [comment, setComment] = useState("");
  let [flag, setFlag] = useState(true);
    useEffect(() => {
      async function initialRun() {
        try {
          const response = await axios.get("http://localhost:8000/otheruser");
          console.log("data",response.data)
          setState(response.data);
        } catch (error) {
          alert("Error message is : ", error);
        }
      }  
      initialRun();
    }, [flag]); //

    const handleDelete  =()=>{
      alert("You can't delete data from other's todo list")
    }
    const handleMove  =()=>{
      alert("You can't perform changes other's todo list")
    }
    const handleUndo  =()=>{
      alert("You can't perform changes other's todo list")
    }
  return (
    <div className="my_container">
      {Object.keys(state).map((user, index) => (
        <div className="my_card" key={index}>
          <h2>{user}'s ToDo List</h2>
          {Object.keys(state[user]).map((taskState, stateIndex) => (
            <div key={stateIndex}>
              <h3>{taskState.charAt(0).toUpperCase() + taskState.slice(1)} List</h3>
              <ul className="listname">
                {state[user][taskState].map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <BiListCheck onClick={() => handleMove(item._id)} />
                    {item.taskName}{" "}
                    <div>
                      <RiDeleteBin3Fill onClick={() => handleDelete(item._id)} />
                      {taskState === "in_progress" && <BiUndo onClick={() => handleUndo(item._id)} />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Peers;
