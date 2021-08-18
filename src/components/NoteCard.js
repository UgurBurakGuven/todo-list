import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";

function NoteCard(props) {
  return (
    <Card className={" d-flex col-md-11 p-2 mx-5 my-3"}>
      <Card.Header as="h5">
        NOT{" "}
        <BiTrash
          onClick={() => props.onDelete(props.note.id)}
          className={"d-flex float-end"}
          style={{ cursor: "pointer" }}
        />
      </Card.Header>
      <Card.Body>
        <Card.Text>{props.note.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
