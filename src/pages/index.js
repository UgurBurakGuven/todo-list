import React, { useEffect, useState } from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import NoteCard from "../components/NoteCard";
import localforage from "localforage";
import Link from "next/link";
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
        <div className={"mx-2"}>
          <Link href={"#"} style={{ color: "#82d7f7" }}>
            <a
              className={"text-decoration-none text-light ms-4"}
              style={{ fontSize: "1.5rem" }}
            >
              Todo List
            </a>
          </Link>
        </div>
      </Navbar>
      <div>
        {notes.map((note, index) => (
          <NoteCard key={index} note={note} onDelete={onDelete} />
        ))}
      </div>
      <div
        className={"w-100 bg-dark bottom-0 position-fixed"}
        style={{ height: "4rem" }}
      >
        <form onSubmit={addNote} className={"d-flex justify-content-end"}>
          <Button
            className={"position-fixed  float-end mx-sm-5"}
            type={"submit"}
            style={{
              zIndex: "1",
              lineHeight: "1rem",
              bottom: "0.6rem",
              width: "3rem",
              height: "3rem",
              borderRadius: "20%",
              textAlign: "center",
              fontSize: "1.7rem",
              fontWeight: "bold",
              color: "black",
              background: "#82d7f7",
              boxShadow: "0.3rem 0.3rem 0.4rem 0rem rgba(0,0,0,0.8)",
            }}
          >
            +
          </Button>

          <input
            placeholder={"Enter Notes"}
            type="text"
            className={
              "bottom-0 position-fixed  w-75 p-1 btn-outline- border-0 "
            }
            value={text}
            onChange={(e) => updateText(e)}
            style={{
              color: "#f1f1f1",
              fontSize: "1rem",
              marginBottom: "0.3rem",
              height: "3.4rem",
              left: "2rem",
              backgroundColor: " #3c3c3c",
            }}
          />
        </form>
      </div>
    </>
  );
}
