import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      rating
    }
  }
`;

interface dataType {
  movie: {
    __typename: string;
    title: String;
    medium_cover_image: string;
    rating: Number;
    description_intro: String;
  };
}

interface queryLoding {
  loading: boolean;
  data: dataType | undefined;
}

const Detail = () => {
  const { id } = useParams();

  const { loading, data }: queryLoding = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });

  console.log(data);

  return (
    <div>
      {loading && <h1>loading...</h1>}
      {!loading && data?.movie && <h1>{data.movie.title}</h1>}
    </div>
  );
};

export default Detail;
