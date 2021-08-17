import React, { useEffect, useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import NoteCard from "../components/NoteCard";
import localforage from "localforage";

export default function Home() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      setNotes(notes);
    });
  }, []);

  const addNote = () => {
    if (text === "") {
      return;
    }
    localforage
      .setItem("notes", [text])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      notes.push(text);
      setNotes(notes);
      localforage.setItem("notes", notes).then(() => {
        return localforage.getItem("notes", function (err, notes) {
          console.log(notes);
        });
      });
    });

    setText("");
  };
  const updateText = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">Todo List</Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {notes.map((val, key) => (
          <NoteCard key={key} text={val} />
        ))}
      </div>
      <Button
        className={"position-fixed"}
        style={{
          right: "10%",
          zIndex: "1",
          lineHeight: "2%",
          bottom: "2%",
          width: "5%",
          height: "5%",
          borderRadius: "20%",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#f1f1f1",
          background: "#595a5c",
          boxShadow: "5px 5px 6px 0px rgba(0,0,0,0.8)",
        }}
        onClick={addNote}
      >
        +
      </Button>
      <input
        placeholder={"Enter Note"}
        type="text"
        className={"bottom-0 position-fixed w-100 p-1 btn-outline- border-0"}
        value={text.text}
        onChange={(e) => updateText(e)}
        style={{
          color: "#f1f1f1",
          fontSize: "16px",
          backgroundColor: "#595a5c",
          height: "80px",
        }}
      />
    </>
  );
}
