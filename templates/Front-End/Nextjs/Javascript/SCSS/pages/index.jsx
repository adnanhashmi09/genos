//components
import Meta from '../components/utils/Meta';

// styles
import styles from '../styles/components/Home.module.scss';

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
