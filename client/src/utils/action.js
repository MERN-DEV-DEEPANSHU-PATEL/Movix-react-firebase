import { db } from "./firebase-config";
import {
  collection,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

const wishListRef = collection(db, "wishlist");

export async function addMovieInWishlist(userId, movie) {
  if (userId) {
    const wishlistDocRef = doc(wishListRef, userId.uid);
    try {
      const wishlistDoc = await getDoc(wishlistDocRef);
      if (wishlistDoc.exists()) {
        const previewMovies = await wishlistDoc.data().movies;
        const indexOfAlreadyAdded = previewMovies.findIndex(
          (previewMovie) => previewMovie.id === movie.id
        );
        if (indexOfAlreadyAdded !== -1) {
          return "Already Added";
        } else {
          const data = await updateDoc(wishlistDocRef, {
            movies: arrayUnion(movie),
          });
          return [...wishlistDoc.data().movies, movie];
        }
      } else {
        await setDoc(wishlistDocRef, {
          movies: [movie],
        });
        return [movie];
      }
    } catch (error) {
      return error;
    }
  } else {
    return "Not User";
  }
}

export async function getMoviesFromWishlist(userId) {
  try {
    const wishlistDocRef = doc(wishListRef, userId.uid);
    const wishlistDoc = await getDoc(wishlistDocRef);
    if (wishlistDoc.exists()) {
      return await wishlistDoc.data().movies;
    } else {
      return "No Movie";
    }
  } catch (error) {
    return error;
  }
}

export async function removeMovieFromWishlist(userId, movie) {
  const wishlistDocRef = doc(wishListRef, userId.uid);
  try {
    const wishlistDoc = await getDoc(wishlistDocRef);
    const previewMovies = await wishlistDoc.data().movies;
    const indexToRemove = previewMovies.findIndex(
      // Find the index of the movie to remove
      (previewMovie) => previewMovie.id === movie.id
    );
    if (indexToRemove !== -1) {
      previewMovies.splice(indexToRemove, 1); // Remove the movie from the array by index
      await updateDoc(wishlistDocRef, {
        movies: previewMovies, // Update the FireStore document with the modified array
      });
      return previewMovies;
    } else {
      return previewMovies;
    }
  } catch (error) {
    return error;
  }
}
