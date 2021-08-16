import React from "react";
import { Card } from "react-bootstrap";

function Notes(props) {
  return (
    <Card className={" d-flex col-md-11 p-2  m-5"}>
      <Card.Header as="h5">NOT</Card.Header>
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Notes;
