import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

const Movies = () => {
  // useApolloClient hook
  const client = useApolloClient();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              id
              title
            }
          }
        `
      })
      .then((response) => setMovies(response.data.allMovies));
  }, [client]);
  return (
    <>
      <div>여기는 영화 목록보기 페이지 입니다</div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
