import { gql, useQuery } from '@apollo/client';
import { type } from 'os';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      rating
      language
    }
  }
`;

interface dataType {
  __typename?: string | undefined;
  title: String | undefined;
  medium_cover_image: string | undefined;
  rating: Number | undefined;
  description_intro: String | undefined;
  language: string | undefined;
}

interface queryLoding {
  loading: boolean;
  data: { movie: dataType } | undefined;
}

const Detail = () => {
  const { id } = useParams();

  const { loading, data }: queryLoding = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });

  console.log(data);

  return (
    <Container>
      <Column>
        <Title>{!data ? 'Loading...' : data.movie.title}</Title>
        {!loading && data && (
          <>
            <Subtitle>
              {data.movie.language} • {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      <Poster background={data?.movie.medium_cover_image || ''}></Poster>
    </Container>
  );
};

export default Detail;

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
  width: 50%;
`;

const setPosterImg = ({ background }: { background: string }): string => {
  return background;
};

const Poster = styled.div`
  width: 25%;
  height: 0px;
  padding-bottom: 37%;
  background-image: url(${setPosterImg});
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h1`
  font-size: 55px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 30px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;
