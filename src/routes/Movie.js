import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const Movie = () => {
  // react router dom
  // Movies 컴포넌트에서 Link 를 통해 페이지를 옮길 때 함께 전달한 params 를 가져오는 훅
  const params = useParams();
  console.log("params =", params);

  const {
    data,
    loading,
    client: { cache }
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: params.id
    }
  });

  console.log("isLoading =", loading);
  console.log("data =", data);

  if (loading) return <h1>Movie data fetching...</h1>;

  const onClickHandler = () => {
    // apollo server 의 cache 의 특정 부분만 수정할 때 writeFragment 를 사용한다
    // id 를 선언하면, 해당 id 의 cache fragment 를 수정한다
    // fragment gql 은 문법이기 때문에 아래와 같은 형식으로 사용하면 된다
    // data 에 입력된 값으로 값이 수정된다
    cache.writeFragment({
      id: `Movie:${params.id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked
      }
    });
  };
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClickHandler}>
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Movie;
