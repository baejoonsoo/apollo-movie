import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import returnBtn from '../img/returnBtn.png';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
      rating
      language
      isLiked @client
    }

    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

interface dataType {
  __typename?: string;
  id: number;
  title: String;
  medium_cover_image: string;
  rating: Number;
  description_intro: String;
  language: string;
  isLiked: boolean;
}

interface suggestionsDataType {
  id: number;
  __typename?: string;
  title: string;
  medium_cover_image: string;
}

interface queryLoding {
  loading: boolean;
  data: { movie: dataType; suggestions: suggestionsDataType[] } | undefined;
}

const Detail = () => {
  const { id } = useParams();
  const [hover, setHover] = useState<boolean>(false);

  const { loading, data }: queryLoding = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });

  console.log(data);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <Container>
      <Link to="/">
        <ReturnBtn src={returnBtn} />
      </Link>
      <Column>
        <Title>
          {loading ? 'Loading...' : data?.movie.title}
          {data?.movie.isLiked && ' ❤️'}
        </Title>

        <Subtitle>
          {data && `${data.movie.language} • ${data.movie.rating}`}
        </Subtitle>
        <Description>{data?.movie.description_intro}</Description>
      </Column>
      <Poster background={data?.movie.medium_cover_image}></Poster>
      <BottonBar onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <Suggestions
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        top={hover ? '10px' : '-170px'}
      >
        {data?.suggestions.map((movie: suggestionsDataType) => (
          <div key={movie.id}>
            <Link to={`/${movie.id}`}>
              <SuggestionsMovie
                alt="Suggestions movie"
                title={movie.title}
                src={movie.medium_cover_image}
              />
            </Link>
          </div>
        ))}
      </Suggestions>
    </Container>
  );
};

export default Detail;

const ReturnBtn = styled.img`
  position: fixed;
  top: 10px;
  left: 15px;
  width: 20px;
  height: 20px;
`;

const SuggestionsMovie = styled.img`
  width: 110px;

  transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05) translateY(-5px);
  }
`;

const Suggestions = styled.div`
  position: fixed;
  align-items: flex-end;
  transition: 0.3s ease-in-out;

  bottom: ${({ top }: { top: string }): string => top};
  left: 90px;
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 30px;
`;

const BottonBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 30px;
  width: 45%;
  height: 50px;
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  overflow: hidden;
`;

const Column = styled.div`
  width: 50%;
`;

const setPosterImg = ({
  background,
}: {
  background: string | undefined;
}): string | undefined => {
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
