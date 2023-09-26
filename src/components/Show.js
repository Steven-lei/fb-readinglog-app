import React, { useEffect, useState } from "react";

import FBDataService from "../services/fbServices";

import { Link, useParams, useNavigate } from "react-router-dom";
import { Image, Table } from "react-bootstrap";
import BookReviews from "./BookReviews";
import Rating from "@material-ui/lab/Rating";

function Show() {
  const [book, setBook] = useState({});
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const docSnap = await FBDataService.getBook(params.id);
        console.log("the record is :", docSnap.data());
        setBook(docSnap.data());
      } catch (err) {}
    };
    getBook();
  }, [params.id]);

  const deleteBoard = async (id) => {
    alert("Deleting book ");
    await FBDataService.deleteBook(params.id);
    //getBoard();
    navigate("/");
  };
  return (
    <div className="container">
      <div className="panel-heading">
        <h3 className="panel-title">Show Book</h3>
      </div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <Link to="/" className="btn btn-primary">
              Book List
            </Link>
          </h4>

          <h3 className="panel-title">{book.title}</h3>
        </div>
        <div className="panel-body">
          <Table>
            <tbody>
              <tr>
                <th>Author:</th>
                <td>{book.author}</td>
                <th>Year:</th>
                <td>{book.year}</td>
              </tr>
              <tr>
                <th>Type:</th>
                <td>{book.type}</td>
                <th>Rating</th>
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
                <th>Cover:</th>
                <td colSpan={3}>
                  <Image
                    src={book.cover}
                    style={{ width: "120px", height: "120px" }}
                    alt="cover"
                    roundedCircle
                  ></Image>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <dt>Review/Comments:</dt>
            <dd>{book.book}</dd>
          </dl> */}
          <Link to={`/editbook/${params.id}`} className="btn btn-success">
            Edit
          </Link>
          &nbsp;
          <button onClick={deleteBoard} className="btn btn-danger">
            Delete
          </button>
          <BookReviews bookid={params.id}></BookReviews>
        </div>
      </div>
    </div>
  );
}

export default Show;
