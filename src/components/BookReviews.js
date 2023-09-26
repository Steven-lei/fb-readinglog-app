import React, { useState } from "react";
import FBDataService from "../services/fbServices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Container,
  InputGroup,
  Table,
} from "react-bootstrap";
import "./BookReviews.css";
import Form from "react-bootstrap/Form";
import { useUserAuth } from "../context/UserAuthContext";
import { Timestamp } from "@firebase/firestore";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

function BookReviews({ bookid }) {
  const [bookReviews, setBookReviews] = useState();
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5.5);
  const getReviews = async () => {
    const data = await FBDataService.getAllReviews(bookid);
    setBookReviews(data.docs.map((doc) => ({ ...doc.data(), key: doc.id })));
  };
  const { user } = useUserAuth();
  const handleAddReview = async () => {
    const data = {
      review: comment,
      rating: rating,
      author: { name: user.displayName, email: user.email },
      time: Timestamp.fromDate(new Date()),
    };
    console.log(data);
    await FBDataService.addReview(bookid, data);

    getReviews();
  };
  useEffect(() => {
    getReviews();
  }, [bookid]);
  return (
    <>
      {bookReviews &&
        bookReviews.map((review) => (
          <React.Fragment key={review.key}>
            <Container className="comment-author">
              <a href={"mailto://" + review.author.email}>
                {review.author && review.author.name}
              </a>{" "}
              at {review.time.toDate().toLocaleString()}:
            </Container>
            <Container className="comment-content">
              <StyledRating
                name="suggested heart"
                defaultValue={review.rating}
                size="small"
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                readOnly
              />
              {review.review}
            </Container>
          </React.Fragment>
        ))}
      {showInput && (
        <Container>
          <InputGroup>
            <Form.Control
              as="input"
              aria-label="With textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <StyledRating
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              size="small"
            />
          </InputGroup>
          <ButtonGroup className="mt-1">
            <Button
              onClick={() => {
                handleAddReview();
                setShowInput(false);
              }}
            >
              submit
            </Button>
            <Button
              onClick={() => {
                setShowInput(false);
              }}
            >
              cancel
            </Button>
          </ButtonGroup>
        </Container>
      )}
      {!showInput && user && (
        <Button className="mt-1" onClick={() => setShowInput(true)}>
          comment
        </Button>
      )}
    </>
  );
}

export default BookReviews;
