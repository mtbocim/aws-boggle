import React, { useState, useEffect } from "react";
import Button from "./Button.js";
import SelectedForm from "./SelectedForm.js";
import { v4 as uuid } from "uuid";
import UsernameForm from "./UsernameForm.js";
import Rooms from "./Rooms.js";
import axios from 'axios';

/** Smart component rendering the homepage
 *
 *  Props:
 *  - none
 *
 *  States:
 *  - form: like "create" or "join"
 *  - isUser: Boolean
 *  - formData: like { roomName } or { roomCode }
 *  - rooms: like [{ room }, ...]
 *    --room: like { roomName, id }
 *  - user: like { username }
 *
 *  App -> Homepage -> { SelectedForm, Button, UsernameForm, Rooms }
 */

function Homepage() {
  const [form, setForm] = useState({name: "", fn: null});
  const [isUser, setIsUser] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  const [testData, setTestData] = useState([{}])

  console.log("Homepage", form, isUser, rooms, "<ROOM",user);

  /** Identify which button was selected. Create or Join */
  function selectForm(evt) {
    console.log(evt.target.classList.value);
    const buttonClasses = evt.target.classList.value;

    if(buttonClasses.includes("create")) {
      setForm({
        name: "create",
        fn: addRoom
      });
    }

    else {
      setForm({
        name: "join",
        fn: joinRoom
      });
    }
  }

  // function TestConnect(){
  //   useEffect(() => {
  //     fetch("/members").then(
  //       res => res.json()
  //     ).then(
  //       data => {
  //         setTestData(data)
  //         console.log(data, "<<< from backend");
  //       }
  //     )
  //   }, [])
  // }

  function AxiosTest(){
    useEffect(() => {
      axios.get("/members")
        .then(
            res => {
              setTestData(res.data)
              console.log(res.data, "<<< from backend");
          }
        )
    }, [] );
  }

  AxiosTest();

  // TestConnect();

  /** Add Room Function */
  function addRoom(room){
    const newRoom = {...room, id: uuid()};
    setRooms(rooms => [...rooms, newRoom]);
    //Make axios call to backend. Make query to update rooms table.
    //Take us to lobby
  }

  /** Add Room Function */
  function joinRoom(room){
    console.log("Joined Room!!", room);
    //on backend,
    //Make axios call and check if room exists
    //if it does, enter lobby. make get request to render the lobby html
  }

  /** Add User */
  function addUser(userData){
    setUser(userData);
    setIsUser(true);
  }


  return(
    <div className="Homepage">
      <h1>Boggle</h1>

      { isUser ?
      <div className="buttons">
        <Button click={selectForm} label="Create Room" type="create"/>
        <Button click={selectForm} label="Join Room" type="join"/>
      </div>
      : <UsernameForm addUser={addUser} /> }
      { form.name ? <SelectedForm type={form.name} fn={form.fn} /> : null }
      <Rooms rooms={rooms}/>
      { testData.members === undefined 
          ? null 
          : (
            testData.members.map((member,i) => (
              <p key={i}>{member}</p>
            ))
          )
      }
    </div>
  );
}

export default Homepage;

//TODO: show rooms that are in db (exists)