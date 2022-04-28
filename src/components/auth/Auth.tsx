import Image from 'next/image';
import useAuth from '../../data/hook/useAuth';
import router from 'next/router';
import Head from 'next/head';

export default function Auth(props: any) {
  const { loading, usuario } = useAuth();

  const render = () => {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie?.includes('admin-template-auth')) {window.location.href = '/autenticacao'}`
            }}
          />
        </Head>
        {props.children}
      </>
    );
  };

  const renderLoading = () => {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-800'>
        <Image
          src='/images/loading.gif'
          alt='carregando'
          width={140}
          height={140}
        />
      </div>
    );
  };

  if (!loading && usuario?.email) {
    return render();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push('/autenticacao');
    return null;
  }
}
