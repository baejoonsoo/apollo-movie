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
        <Title>{data?.movie.title}</Title>
        <Subtitle>
          {data?.movie.language} • {data?.movie.rating}
        </Subtitle>
        <Description>{data?.movie.description_intro}</Description>
      </Column>
      {loading && <Poster></Poster>}
      {/* {!loading && data?.movie && <h1>{data.movie.title}</h1>} */}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Column = styled.div``;

const Poster = styled.div``;

const Title = styled.h1`
  font-size: 60px;
`;

const Subtitle = styled.h4`
  font-size: 45px;
`;

const Description = styled.p``;
