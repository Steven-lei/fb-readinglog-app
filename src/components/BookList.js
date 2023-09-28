import React, { useState, useEffect } from "react";
import FBDataService from "../services/fbServices";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Image,
  Row,
  Table,
  ToggleButton,
} from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import BookReviews from "./BookReviews";
import Rating from "@material-ui/lab/Rating";
import "./BookList.css";
import { Select } from "@mui/material";
import { MenuItem } from "@material-ui/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function BookList({ books, orderby, setOrderby, orderMethod, setOrderMethod }) {
  console.log(books);
  const { user } = useUserAuth();
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25BE;
    </div>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Container>
              <Row>
                <Col style={{ verticalAlign: "center", display: "flex" }}>
                  <div>Books</div>
                </Col>
                <Col>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      onChange={(e) => {
                        setOrderby(e.target.value);
                      }}
                      value={orderby}
                    >
                      <MenuItem value="author">Order by Author</MenuItem>
                      <MenuItem value="title">Order by Title</MenuItem>
                      <MenuItem value="createdtime">Order by Add Time</MenuItem>
                      <MenuItem value="year">Order by Publish Year</MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={orderMethod}
                    onChange={(e) => {
                      setOrderMethod(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="asc"
                      control={<Radio />}
                      label="asc"
                      size="small"
                    />
                    <FormControlLabel
                      value="desc"
                      control={<Radio />}
                      label="desc"
                      size="small"
                    />
                  </RadioGroup>
                </Col>
              </Row>
            </Container>
          </th>
          <th>
            <Row>
              <Col>Reviews</Col>
            </Row>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => {
          console.log(book);
          return (
            <tr key={book.key}>
              <td>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td rowSpan={3}>
                        <Image
                          src={book.cover}
                          style={{ width: "120px", height: "120px" }}
                          roundedCircle
                        />
                      </td>
                      <td>{book.author}</td>
                    </tr>
                    <tr>
                      <td>{book.year}</td>
                    </tr>

                    <tr>
                      <td>{book.type}</td>
                    </tr>
                    <tr>
                      <td>
                        {user ? (
                          <Link to={`/show/${book.key}`}>
                            {book.title || "NO TITLE"}
                          </Link>
                        ) : (
                          book.title || "NO TITLE"
                        )}
                      </td>
                      <td>
                        <Rating
                          name="rating star"
                          value={
                            book.rating &&
                            book.rating.totalrating / book.rating.ratingcount
                          }
                          readOnly
                          precision={0.5}
                        ></Rating>
                      </td>
                    </tr>
                    <tr>
                      <td className="creator">
                        {book?.createdby?.name || "(NULL)"}
                      </td>
                      <td className="creator">
                        {book.createdtime &&
                          book.createdtime.toDate().toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>

              <td colSpan={2}>
                <BookReviews bookid={book.key}></BookReviews>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default BookList;
