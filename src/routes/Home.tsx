import { gql, useQuery, DocumentNode, ApolloError } from '@apollo/client';

const GET_MOVIES: DocumentNode = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

interface dataType {
  movies: {
    __typename: string;
    id: number;
    medium_cover_image: string;
  }[];
}

interface queryLoding {
  loading: boolean;
  error?: ApolloError | undefined;
  data: dataType | undefined;
}
const Home = () => {
  const { loading, data }: queryLoding = useQuery(GET_MOVIES);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      {data?.movies.map((movie) => (
        <h1 key={movie.id}>{movie.id}</h1>
      ))}
    </div>
  );
};

export default Home;
