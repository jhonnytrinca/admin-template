import type { NextPage } from 'next';
import Layout from '../components/template/Layout';

const Home: NextPage = () => {
  return (
    <div className=''>
      <Layout
        titulo='Pagina Inicial'
        subtitulo='Estamos construindo um template Admin!'
      >
        <h3>Conteúdo...</h3>
      </Layout>
    </div>
  );
};

export default Home;
