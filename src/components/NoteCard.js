import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

import {
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiIndeterminateCircleFill,
} from "react-icons/ri";

function NoteCard(props) {
  const [inputChange, setInputChange] = useState(props.note.text);
  const [visibleInput, setVisibleInput] = useState(false);
  const test = props.note.situation;

  function editVisible() {
    setVisibleInput(() => !visibleInput);
  }

  return (
    <>
      {test === "true" ? (
        <Card
          style={{ backgroundColor: "green" }}
          className={" d-flex col-md-11 p-2 mx-5 my-3 "}
        >
          <Card.Body>
            {visibleInput ? (
              <>
                <form
                  onSubmit={() =>
                    props.onEdit(inputChange, "true", props.note.id)
                  }
                >
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
                      borderColor: "green",
                    }}
                  />

                  <Button
                    className={" float-end"}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() =>
                      props.onEdit(inputChange, "true", props.note.id)
                    }
                  >
                    save
                  </Button>
                </form>
              </>
            ) : null}

            <div style={{ color: "black" }}>
              {props.note.text}

              <BiTrash
                size={25}
                onClick={() => props.onDelete(props.note.id)}
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <MdEdit
                size={25}
                onClick={editVisible}
                className={"float-end mx-3"}
                style={{
                  cursor: "pointer",
                  color: "black",
                  boxShadow: "1px 1px 10px black",
                  borderRadius: "50%",
                }}
              />
              <RiCheckboxCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "true", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#00ff00",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiIndeterminateCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "stabil", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#F79E19",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiCloseCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "false", props.note.id)
                }
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "#C72A18",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
            </div>
          </Card.Body>
        </Card>
      ) : test === "false" ? (
        <Card
          style={{ backgroundColor: "#e22f1a" }}
          className={" d-flex col-md-11 p-2 mx-5 my-3"}
        >
          <Card.Body>
            {visibleInput ? (
              <>
                <form
                  onSubmit={() =>
                    props.onEdit(inputChange, "false", props.note.id)
                  }
                >
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
                      borderColor: "red",
                    }}
                  />

                  <Button
                    className={" float-end"}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() =>
                      props.onEdit(inputChange, "false", props.note.id)
                    }
                  >
                    save
                  </Button>
                </form>
              </>
            ) : null}

            <div style={{ color: "black", fontWeight: "bold" }}>
              {props.note.text}

              <BiTrash
                size={25}
                onClick={() => props.onDelete(props.note.id)}
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "black",
                  boxShadow: "1px 1px 10px black",
                  borderRadius: "50%",
                }}
              />
              <MdEdit
                size={25}
                onClick={editVisible}
                className={"float-end mx-3"}
                style={{
                  cursor: "pointer",
                  color: "black",
                  backgroundColor: "#C72A18",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiCheckboxCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "true", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#00ff00",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiIndeterminateCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "stabil", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#F79E19",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiCloseCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "false", props.note.id)
                }
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "#C72A18",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card
          style={{ backgroundColor: "#292C33" }}
          className={" d-flex col-md-11 p-2 mx-5 my-3"}
        >
          <Card.Body>
            {visibleInput ? (
              <>
                <form
                  onSubmit={() =>
                    props.onEdit(inputChange, "stabil", props.note.id)
                  }
                >
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
                    onClick={() =>
                      props.onEdit(inputChange, "stabil", props.note.id)
                    }
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
                size={25}
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "#82D7F7",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <MdEdit
                size={25}
                onClick={editVisible}
                className={"float-end mx-3"}
                style={{
                  cursor: "pointer",
                  color: "#82D7F7",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiCheckboxCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "true", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#00ff00",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiIndeterminateCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "stabil", props.note.id)
                }
                className={"d-flex float-end ms-1"}
                style={{
                  cursor: "pointer",
                  color: "#F79E19",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
              <RiCloseCircleFill
                size={25}
                onClick={() =>
                  props.editSituation(props.note.text, "false", props.note.id)
                }
                className={"d-flex float-end "}
                style={{
                  cursor: "pointer",
                  color: "#C72A18",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  boxShadow: "1px 1px 10px black",
                }}
              />
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NoteCard;
