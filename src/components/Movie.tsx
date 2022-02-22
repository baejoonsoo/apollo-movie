import { Link } from 'react-router-dom';

interface movieId {
  movieID: number;
}

const Movie = ({ movieID }: movieId) => {
  return (
    <div>
      <Link to={`/${movieID}`}>{movieID}</Link>
    </div>
  );
};

export default Movie;
