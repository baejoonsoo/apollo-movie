import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface movieId {
  movieID: number;
  background: string;
}

const Movie = ({ movieID, background }: movieId) => {
  return (
    <Container>
      <Link to={`/${movieID}`}>
        <Poster bg={background} />
      </Link>
    </Container>
  );
};

export default Movie;

const Container = styled.div`
  height: auto;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  overflow: hidden;
`;

const Poster = styled.div`
  background-image: url(${({ bg }: { bg: string }) => bg});
  height: 0%;
  width: 100%;
  padding-bottom: 150%;
  background-size: cover;
  background-position: center center;
`;
