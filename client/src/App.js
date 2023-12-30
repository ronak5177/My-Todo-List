import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BiListCheck, BiUndo } from "react-icons/bi";
import { RiDeleteBin3Fill } from "react-icons/ri";


// import Card from './components/Card';
function App() {
  let [state, setState] = useState({});
  let [comment, setComment] = useState("");
  let [flag, setFlag] = useState(true);
  useEffect(() => {
    async function initialRun() {
      try {
        const response = await axios.get("http://localhost:8000/user");
        setState(response.data);
      } catch (error) {
        alert("Error message is : ", error);
      }
    }

    initialRun();
  }, [flag]); //

  const handleDelete = async (taskName) => {
    await axios.delete(`http://localhost:8000/user/${taskName}`)
     .then((res) => {
      // alert(`data deleted successfully for task ${taskName}`)
      setFlag(flag => !flag)
    })
    .catch((error)=>{
      alert(error.message)
    })
  }
  const handleUndo = async (taskName) => {
    await axios.patch(`http://localhost:8000/user/${taskName}`)
     .then((res) => {
      // alert(`Data updated successfully for task ${taskName}`)
      setFlag(flag => !flag)
    })
    .catch((error)=>{
      alert(error.message)
    })
  }

  const handleMove = async (taskName) => {
    await axios.patch(`http://localhost:8000/${taskName}`)
     .then((res) => {
      // alert(`Data moved successfully for task ${taskName}`)
      setFlag(flag => !flag)
    })
    .catch((error)=>{
      alert(error.message)
    })
  }

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8000/user`, {
        task: comment,
        user: "Ronak",
        state: "running",
      })
      .then((res) => {
        setFlag(p => !p)
        setComment("");
      })
      .catch((error)=>{
        alert({error: error.message})
      })
  };
  return (
    <>
      {/* <Card /> */}
      <div className="container">
        <div className="card">
          <h2>ToDo List</h2>
          <div className="addData">
          <input
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handleSubmit}>Add</button>
          
          </div>
          <ul className="listname">
            {state.running?.map((item, index) => (
              <li key={index}>
                <BiListCheck onClick={()=> handleMove(item)}/>
                {item}{" "}
                <div>
                <RiDeleteBin3Fill onClick={()=> handleDelete(item)} />
                </div>
              </li>
            ))}
            {/* Add button inside li tags if needed */}
          </ul>
        </div>
        <div className="card">
          <h2>In-progress List</h2>
          <ul className="listname">
            {state.in_progress?.map((item, index) => (
              <li key={index}>
                <BiListCheck onClick={()=> handleMove(item)} />
                {item}{" "}
                <div>
                  <RiDeleteBin3Fill onClick={()=> handleDelete(item)} />
                  < BiUndo onClick={()=> handleUndo(item)} />
                </div>
              </li>
            ))}
            {/* Add button inside li tags if needed */}
          </ul>
        </div>
        <div className="card">
          <h2>Done List</h2>
          <ul className="listname">
            {state.done?.map((item, index) => (
              <li key={index}>
                {/* <BiListCheck onClick={()=> handleMove(item)} /> */}
                <BiListCheck />
                {item}{" "}
                <div>
                  <RiDeleteBin3Fill onClick={()=> handleDelete(item)} />
                  < BiUndo onClick={()=> handleUndo(item)} />
                </div>
              </li>
            ))}
            {/* Add button inside li tags if needed */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
