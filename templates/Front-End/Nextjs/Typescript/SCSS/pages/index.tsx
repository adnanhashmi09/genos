import type { NextPage } from 'next';

// components
import Meta from '../components/utils/Meta';

// styles
import styles from '../styles/components/Home.module.scss';

// Globals declarations
const metaData = {
  title: 'Home',
  description: 'Home page for ',
};

const Home: NextPage = () => {
  return (
    <>
      <Meta {...metaData} />
    </>
  );
};

export default Home;
