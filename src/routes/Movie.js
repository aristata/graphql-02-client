import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

const Movie = () => {
  const params = useParams();
  console.log("params =", params);

  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: params.id
    }
  });

  console.log("isLoading =", loading);
  console.log("data =", data);

  if (loading) return <h1>Movie data fetching...</h1>;

  return (
    <>
      <div>여기는 영화 상세보기 페이지 입니다</div>
      <h1>{data.movie.title}</h1>
      <Link to={"/"}>목록으로 돌아가기</Link>
    </>
  );
};

export default Movie;
