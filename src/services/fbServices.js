import { db } from "../fb-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  collectionGroup,
  setDoc,
  orderBy,
} from "firebase/firestore";

const metadata = {
  contentType: "image/jpeg",
};

class FBDataService {
  getrole = (uid) => {
    const data = doc(db, "users", uid);
    console.log(data);
    return getDoc(data);
  };
  addBook = (newData) => {
    return addDoc(collection(db, "books"), newData);
  };
  updateBook = (id, newData) => {
    const oldData = doc(db, "books", id);
    return updateDoc(oldData, newData);
  };
  deleteBook = (id) => {
    const data = doc(db, "books", id);
    return deleteDoc(data);
  };
  getBook = (id) => {
    console.log("getbook", id);
    const data = doc(db, "books", id);
    return getDoc(data);
  };
  getAllBooks = (orderby, ordermethod) => {
    const q = query(
      collection(db, "books"),
      orderBy(orderby || "createdtime", ordermethod || "desc")
    );
    return getDocs(q);
  };

  addReview = (bookid, newData) => {
    return new Promise(function (resolve, reject) {
      addDoc(collection(db, "books", bookid, "reviews"), newData)
        .then((data) => {
          const bookdoc = doc(db, "books", bookid);
          getDoc(bookdoc)
            .then((snapshot) => {
              const book = snapshot.data();
              const oldrating = book.rating || {
                totalrating: 0,
                ratingcount: 0,
              };
              const newrating = {
                totalrating: oldrating.totalrating + newData.rating,
                ratingcount: oldrating.ratingcount + 1,
              };
              updateDoc(bookdoc, {
                ...book,
                rating: newrating,
              })
                .then((data) => {
                  resolve(data);
                })
                .catch((reason) => {
                  reject(reason);
                });
            })
            .catch((reason) => reject(reason));

          resolve(data);
        })
        .catch((reason) => reject(reason));
    });
  };
  getReivew = (bookid, reviewid) => {
    const data = doc(collection(db, "books", bookid, "reviews"), reviewid);
    return getDoc(data);
  };
  deleteReview = (bookid, reviewid) => {
    const reviewdoc = this.getReivew(bookid, reviewid);
    return new Promise(function (resolve, reject) {
      deleteDoc(reviewdoc)
        .then(() => {
          this.getBook(bookid)
            .then((book) => {
              const oldrating = book.rating || {
                totalrating: 0,
                ratingcount: 0,
              };
              const newrating = {
                totalrating:
                  oldrating.totalrating > 0
                    ? oldrating.totalrating - reviewdoc.data().rating
                    : 0,
                ratingcount:
                  oldrating.ratingcount > 0 ? oldrating.ratingcount - 1 : 0,
              };

              updateDoc(book, {
                ...book,
                rating: newrating,
              })
                .then((data) => resolve(data))
                .catch((reason) => reject(reason));
            })
            .catch((reason) => reject(reason));
        })
        .catch((reason) => reject(reason));
    });
  };
  getAllReviews = (bookid) => {
    const q = query(
      collection(db, "books", bookid, "reviews"),
      orderBy("time", "desc")
    );
    return getDocs(q);
  };
  getMyComments = () => {
    const q = query(
      collectionGroup(db, "reviews"),
      where("author.email", "==", "leizhengwen0228@gmail.com")
    );
    return getDocs(q);
  };
  queryBookByTitle = (title) => {
    const q = query(collection(db, "books"), where("title", "==", title));
    return getDocs(q);
  };
  queryBookByAuthor = (author) => {
    console.log(author);
    const q = query(collection(db, "books"), where("author", "==", author));
    return getDocs(q);
  };
  queryBookByYear = (year) => {
    const q = query(collection(db, "books"), where("year", "==", year));
    return getDocs(q);
  };
}
export default new FBDataService();
