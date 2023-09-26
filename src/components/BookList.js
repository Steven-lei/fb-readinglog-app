import React, { useState, useEffect } from "react";
import FBDataService from "../services/fbServices";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Table } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import BookReviews from "./BookReviews";
import Rating from "@material-ui/lab/Rating";
import "./BookList.css";
function BookList({ books }) {
  console.log(books);
  const { user } = useUserAuth();
  return (
    <Table>
      <thead>
        <tr>
          <th>Book</th>
          <th>Reviews</th>
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
                        {book.createdby && book.createdby.name}
                      </td>
                      <td className="creator">
                        {book.createdtime &&
                          book.createdtime.toDate().toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </td>

              <td>
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
