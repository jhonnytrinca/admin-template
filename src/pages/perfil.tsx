import type { NextPage } from 'next';
import Layout from '../components/template/Layout';

const Notificacoes: NextPage = () => {
  return (
    <div>
      <Layout
        titulo='Perfil do usuário'
        subtitulo='Administre as suas informações de usuário!'
      >
        <h3>Conteúdo</h3>
      </Layout>
    </div>
  );
};

export default Notificacoes;
