import Auth from "./firebase/authentic";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [newMovieName, setNewMovieName] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState<Number>();
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [movieList, setMovieList] = useState<
    Array<{ id: string; [key: string]: any }>
  >([]);

  const moviesCollectionRef = collection(db, "films");

  const getMovieList = async () => {
    // read data from database
    // set movie list
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSumbitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieName,
        release_date: newMovieReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "films", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovieTitle = async (id: string) => {
    try {
      const movieDoc = doc(db, "films", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input
          onChange={(e) => setNewMovieName(e.target.value)}
          value={newMovieName}
          placeholder="Movie title..."
          type="text"
        />
        <input
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
          value={Number(newMovieReleaseDate)}
          placeholder="Movie Release Date..."
          type="number"
        />
        <input
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          checked={isNewMovieOscar}
          type="checkbox"
        />
        <label>Received An Oscar</label>
        <button onClick={onSumbitMovie}>Sumbit Movies</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.release_date}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input
              onChange={(e) => setUpdatedTitle(e.target.value)}
              placeholder="Cambia titolo del film"
              type="text"
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Cambia titolo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
