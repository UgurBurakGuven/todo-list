import React, { useEffect, useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import NoteCard from "../components/NoteCard";
import localforage from "localforage";
import { error } from "next/dist/build/output/log";

export default function Home() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      setNotes(notes);
    });
  }, []);

  function onDelete(id) {
    localforage.getItem("notes", function (err, lsNotes) {
      const note = lsNotes.find((o) => o.id === id);
      const index = lsNotes.indexOf(note);
      if (index > -1) {
        lsNotes.splice(index, 1);
      }
      localforage.setItem("notes", lsNotes).then(() => setNotes(lsNotes));
    });
  }
  const addNote = () => {
    if (text === "") {
      return;
    }

    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      notes.push({
        text,
        id: new Date().getTime(),
      });
      setNotes(notes);
      localforage.setItem("notes", notes).then(() => {
        return localforage.getItem("notes", function (err, notes) {
          setText("");
        });
      });
    });
  };
  const updateText = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#" style={{ color: "#82d7f7" }}>
            Todo List
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} onDelete={onDelete} />
        ))}
      </div>

      <form onSubmit={addNote}>
        <Button
          className={"position-fixed"}
          type={"submit"}
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
            color: "black",
            background: "#82d7f7",
            boxShadow: "5px 5px 6px 0px rgba(0,0,0,0.8)",
          }}
        >
          +
        </Button>
        <input
          placeholder={"Enter Notes"}
          type="text"
          className={
            "bottom-0 position-fixed w-100 p-1 btn-outline- border-0 bg-dark"
          }
          value={text}
          onChange={(e) => updateText(e)}
          style={{
            color: "#f1f1f1",
            fontSize: "16px",
            height: "56px",
          }}
        />
      </form>
    </>
  );
}
