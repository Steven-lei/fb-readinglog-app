import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import FBDataService from "../services/fbServices";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fb-config";
import { FormSelect, ProgressBar } from "react-bootstrap";
import { Timestamp } from "@firebase/firestore";
import { Image } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("2022");
  const [type, setType] = useState("fiction");
  const [cover, setCover] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Should have a title at least");
      return;
    }
    saveBook();
  };
  const { user } = useUserAuth();
  const saveBook = async () => {
    const newBook = {
      title,
      author,
      year,
      type,
      cover: cover,
      createdby: { name: user.displayName, email: user.email },
      createdtime: Timestamp.fromDate(new Date()),
    };

    try {
      await FBDataService.addBook(newBook)
        .then((book) => {
          console.log(book);
        })
        .catch((err) => {
          throw err;
        });

      console.log("Data added ");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCover(downloadURL);
        });
      }
    );
  };
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">ADD BOOK</h3>
        </div>
        <div className="panel-body">
          <h4>
            <Link to="/" className="btn btn-primary">
              Book List
            </Link>
          </h4>

          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cover">Cover Image:</label>
            {cover && (
              <Image
                src={cover}
                roundedCircle
                alt="Cover"
                width={120}
                height={120}
              />
            )}
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleUpload}
            />
            <ProgressBar
              className="form-control"
              now={progresspercent}
              label={`${progresspercent}%`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              className="form-control"
              name="year"
              placeholder={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <FormSelect
              className="form-control"
              onSelect={(e) => setType(e.target.value)}
            >
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-fiction</option>
            </FormSelect>
          </div>

          <button onClick={handleSubmit} className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;
