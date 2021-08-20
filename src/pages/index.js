import React, { useEffect, useState } from "react";
import { Navbar, Container, Button, Col } from "react-bootstrap";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import NoteCard from "../components/NoteCard";
import localforage from "localforage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Link from "next/link";
import { BsQuestionCircle } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { CgAddR } from "react-icons/cg";

function Home() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [counter, setCounter] = useState(notes.length);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  useEffect(() => {
    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      setNotes(notes);
    });
    setCounter(notes.length);
  }, [notes]);

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
  const addNote = (event) => {
    event.preventDefault();
    if (text === "") {
      alert("Please Write Something!");
      return;
    }
    localforage.getItem("notes", function (err, notes) {
      notes = notes || [];
      notes.push({
        text,
        situation: "stabil",
        id: new Date().getTime(),
      });
      setNotes(notes);
      localforage.setItem("notes", notes).then(() => {
        return localforage.getItem("notes", function () {
          setText("");
        });
      });
    });
  };

  function editSituation(text, situation, id) {
    localforage.getItem("notes", function (err, Situation) {
      const newSituation = Situation.find((o) => o.id === id);
      const index = Situation.indexOf(newSituation);
      if (index > -1) {
        Situation.splice(index, 1);
      }

      Situation.push({
        text,
        id,
        situation,
      });
      localforage.setItem("notes", Situation);
    });
  }

  function onEdit(text, situation, id) {
    localforage.getItem("notes", function (err, lsNotes) {
      const note = lsNotes.find((o) => o.id === id);
      const index = lsNotes.indexOf(note);
      if (index > -1) {
        lsNotes.splice(index, 1);
      }
      lsNotes.push({
        text,
        situation,
        id,
      });
      localforage.setItem("notes", lsNotes).then(() => setNotes(lsNotes));
    });
  }

  const updateText = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" className={"d-flex w-100"} bg="dark">
        <Container>
          <Col className={""}>
            <Link href={"/"} style={{ color: "#82d7f7" }}>
              <a
                className={"text-decoration-none text-light ms-4"}
                style={{ fontSize: "1.5rem" }}
              >
                Todo List
              </a>
            </Link>
          </Col>
          <Col className={"w-100 "}>
            <ul
              className="nav w-100 justify-content-end"
              style={{ right: "2rem" }}
            >
              <li style={{ color: "white" }}>Notes = {counter}</li>
              <li>
                <BsQuestionCircle
                  className={"mx-3"}
                  style={{ color: "white", cursor: "pointer" }}
                  size={30}
                  id={"Popover1"}
                  type={"button"}
                />
                <Popover
                  placement="bottom"
                  isOpen={popoverOpen}
                  target="Popover1"
                  toggle={toggle}
                >
                  <PopoverHeader>User Guide</PopoverHeader>
                  <PopoverBody>
                    + You can remove your notes if you click trash icon{" "}
                    {<BiTrash size={20} />} <br />
                    <br />+ You can edit your notes if you click pencil icon{" "}
                    {<MdEdit size={20} />}
                    <br />
                    <br />+ You can add your note to Todo List{" "}
                    {<CgAddR size={20} />}
                  </PopoverBody>
                </Popover>
              </li>
            </ul>
          </Col>
        </Container>
      </Navbar>
      <TransitionGroup>
        {notes.map((note) => (
          <CSSTransition key={note.id} timeout={500} classNames="item">
            <NoteCard
              note={note}
              editSituation={editSituation}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div
        className={"w-100 bg-dark bottom-0 position-fixed"}
        style={{ height: "4rem" }}
      >
        <form onSubmit={addNote} className={"d-flex justify-content-end"}>
          <Button
            className={"position-fixed  float-end mx-sm-5"}
            type={"submit"}
            style={{
              cursor: "pointer",
              zIndex: "1",
              lineHeight: "1rem",
              bottom: "0.6rem",
              width: "3rem",
              height: "3rem",
              borderRadius: "20%",
              textAlign: "center",
              fontSize: "1.7rem",
              fontWeight: "bold",
              right: "1.5rem",
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
              cursor: "text",
              color: "#f1f1f1",
              fontSize: "1rem",
              marginBottom: "0.3rem",
              height: "3.4rem",
              left: "6%",
              backgroundColor: " #3c3c3c",
            }}
          />
        </form>
      </div>
    </>
  );
}

export default Home;
