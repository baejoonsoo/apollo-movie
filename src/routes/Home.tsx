import { gql, useQuery, DocumentNode, ApolloError } from '@apollo/client';
import styled from 'styled-components';

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
  const { loading }: queryLoding = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo Movie</Title>
        <Subtitle>GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
    </Container>
  );
};
export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;
