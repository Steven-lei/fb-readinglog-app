import React, { useState, useEffect } from "react";
import "./App.css";
import FBDataService from "./services/fbServices";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Image } from "react-bootstrap";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUserAuth } from "./context/UserAuthContext";
import { Select } from "@material-ui/core";

function App() {
  const { user } = useUserAuth();
  const [books, setBooks] = useState([]);
  const [orderby, setOrderby] = useState("createdtime");
  const [orderMethod, setOrderMethod] = useState("desc");
  const getBoards = () => {
    FBDataService.getAllBooks(orderby, orderMethod)
      .then((data) => {
        setBooks(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })));
      })
      .catch((err) => console.log(err));
  };
  // async function getRole(uid) {
  //   if (uid) {
  //     console.log("getrole", uid);
  //     try {
  //       const docsnap = await FBDataService.getrole(uid);
  //       if (docsnap.exists()) {
  //         console.log("roledata", docsnap.data());
  //         return docsnap.data();
  //       } else {
  //         console.log("no data");
  //         return { role: "undefined" };
  //       }
  //     } catch (err) {
  //       {
  //         return { role: "unknown" };
  //       }
  //       console.log(err);
  //     }
  //   }
  // }
  // console.log("render app");
  // if (user) {
  //   async function getrole() {
  //     const role = await getRole(user.uid);
  //     console.log(role);
  //   }
  //   getrole();
  //   console.log("finished get role");
  // }
  // console.log("out of get role");

  console.log(user);
  useEffect(() => {
    console.log("Use effect exectuted AppU");
    getBoards();
  }, [orderby, orderMethod]);
  console.log(user);

  return (
    <>
      <Navbar setBooks={setBooks}></Navbar>

      <Container>
        <Row className="panel-heading">
          <Col>
            <h3>All Books</h3>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            {user && (
              <Link
                as="Button"
                to="/createbook"
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                Add Book
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <BookList
              books={books}
              orderby={orderby}
              setOrderby={setOrderby}
              orderMethod={orderMethod}
              setOrderMethod={setOrderMethod}
            ></BookList>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
