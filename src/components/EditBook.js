import React, { useState, useEffect } from "react";
import FBDataService from "../services/fbServices";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FormSelect, Image, ProgressBar } from "react-bootstrap";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../fb-config";
function EditBook() {
  const [book, setBook] = useState({});
  const [progresspercent, setProgresspercent] = useState(0);
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    console.log("Get Book executed" + params.bookid);
    try {
      const docSnap = await FBDataService.getBook(params.bookid);
      console.log("the record is :", docSnap.data());
      setBook(docSnap.data());
    } catch (err) {}
  };
  const handleSubmit = (e) => {
    updateBook();
    navigate(`/show/${params.bookid}`);
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
          console.log("newurl:", downloadURL);
          setBook({ ...book, cover: downloadURL });
        });
      }
    );
  };

  const updateBook = async () => {
    await FBDataService.updateBook(params.bookid, book);
  };
  return (
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Edit Book</h3>
        </div>
        <div class="panel-body">
          <h4>
            <Link to="/" class="btn btn-primary">
              Book List
            </Link>
          </h4>

          <div class="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              class="form-control"
              name="title"
              placeholder="title"
              value={book.title}
              required
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </div>

          <div class="form-group">
            <label for="author">Author:</label>
            <input
              type="text"
              class="form-control"
              name="author"
              placeholder="author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>
          <div class="form-group">
            <label for="type">Type:</label>
            <FormSelect
              id="type"
              value={book.type}
              onChange={(e) => setBook({ ...book, type: e.target.value })}
            >
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
            </FormSelect>
          </div>
          <div class="form-group">
            <label for="year">Year:</label>
            <input
              type="text"
              class="form-control"
              name="year"
              placeholder="year"
              value={book.year}
              onChange={(e) => setBook({ ...book, year: e.target.value })}
            />
          </div>
          <div class="form-group">
            <label for="cover">Cover:</label>
            <input
              id="file"
              type="file"
              className="form-control"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <Image
              for="file"
              src={book.cover}
              alt="cover"
              style={{ width: "120px", height: "120px" }}
            ></Image>
            <label for="file">
              <span>Click to modify</span>
            </label>
            <ProgressBar now={progresspercent} label={`${progresspercent}%`} />
          </div>
          <button onClick={handleSubmit} class="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
