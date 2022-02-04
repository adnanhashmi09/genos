//components
import Meta from '../components/utils/Meta';

// styles
import styles from '../styles/Home.module.css';

const metaData = {
  title: 'Home',
  description: 'Home page',
};
export default function Home() {
  return (
    <>
      <Meta {...metaData} />
    </>
  );
}
