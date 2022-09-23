import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  {
    allMovies {
      id
      title
    }
  }
`;

const Movies = () => {
  // useQuery hook
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return (
      <>
        <h1>Data loading...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Whats up!! Error!!!</h1>
      </>
    );
  }
  return (
    <>
      <div>여기는 영화 목록보기 페이지 입니다</div>
      <ul>
        {data.allMovies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
