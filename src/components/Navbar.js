import ReactNavbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import FBDataService from "../services/fbServices";
import { useState } from "react";
function Navbar({ setBooks }) {
  const { user, logOut } = useUserAuth();
  const [searchCondition, setSearchCondition] = useState("");
  console.log(user);
  const navigate = useNavigate();
  function login() {
    navigate("/login");
  }
  async function logout() {
    await logOut();
    navigate("/");
  }

  console.log("render nav");
  return (
    <ReactNavbar className="navbar bg-body-tertiary justify-content-between">
      <div className="logo">
        <Image src="/logo.jfif" height="32px" className="mx-2"></Image>
        Mini book view
      </div>
      <Form className="form-inline">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              value={searchCondition}
              onChange={(e) => setSearchCondition(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <DropdownButton id="dropdown-basic-button" title="Search By...">
              <Dropdown.Item
                onClick={() => {
                  searchCondition !== "" &&
                    FBDataService.queryBookByTitle(searchCondition)
                      .then((data) => {
                        setBooks(
                          data.docs.map((doc) => ({
                            ...doc.data(),
                            key: doc.id,
                          }))
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }}
              >
                query by title
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log("query book by author");
                  searchCondition !== "" &&
                    FBDataService.queryBookByAuthor(searchCondition)
                      .then((data) => {
                        setBooks(
                          data.docs.map((doc) => ({
                            ...doc.data(),
                            key: doc.id,
                          }))
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }}
              >
                query by author
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  searchCondition !== "" &&
                    FBDataService.queryBookByYear(searchCondition)
                      .then((data) => {
                        setBooks(
                          data.docs.map((doc) => ({
                            ...doc.data(),
                            key: doc.id,
                          }))
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }}
              >
                query by year
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  searchCondition !== "" &&
                    FBDataService.getAllBooks()
                      .then((data) => {
                        setBooks(
                          data.docs.map((doc) => ({
                            ...doc.data(),
                            key: doc.id,
                          }))
                        );
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                }}
              >
                get all books
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Form>
      <Form className="form-inline">
        <Row>
          <Col>
            {(() => {
              console.log(user);
            })()}
            {!user ? (
              <Button onClick={login}>Login</Button>
            ) : (
              <>
                <Image src={user.photoURL} height="32px" />
                {user.displayName}
                <Button onClick={logout}>Login Out</Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </ReactNavbar>
  );
}
export default Navbar;
