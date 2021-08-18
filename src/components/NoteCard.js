import React, { Fragment, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

function NoteCard(props) {
  const [inputChange, setInputChange] = useState(props.note.text);
  const [visibleInput, setVisibleInput] = useState(false);

  function editVisible() {
    setVisibleInput(() => !visibleInput);
  }

  return (
    <Card
      style={{ backgroundColor: "#292C33" }}
      className={" d-flex col-md-11 p-2 mx-5 my-3"}
    >
      <Card.Body>
        {visibleInput ? (
          <>
            <form onSubmit={(id) => props.onEdit(inputChange, props.note.id)}>
              <input
                type="text"
                className={"w-75 p-1 "}
                value={inputChange}
                onChange={(e) => setInputChange(e.target.value)}
                style={{
                  fontSize: "1rem",
                  marginBottom: "0.3rem",
                  height: "3.4rem",
                  backgroundColor: "#DFDFDF",
                }}
              />

              <Button
                className={"flex-lg-wrap btn-success float-end"}
                onClick={(id) => props.onEdit(inputChange, props.note.id)}
              >
                save
              </Button>
            </form>
          </>
        ) : null}

        <div style={{ color: "white" }}>
          {props.note.text}

          <BiTrash
            onClick={() => props.onDelete(props.note.id)}
            className={"d-flex float-end "}
            style={{ cursor: "pointer", color: "#82D7F7" }}
          />
          <MdEdit
            onClick={editVisible}
            className={"float-end mx-3"}
            style={{ cursor: "pointer", color: "#82D7F7" }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
