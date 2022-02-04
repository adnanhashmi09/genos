// react/next imports
import Head from 'next/head';

const Meta = ({ title, description }: { title: string; description: string }) => {
  return (
    <Head>
      <title>Project | {title} </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
