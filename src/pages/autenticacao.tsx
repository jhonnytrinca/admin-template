/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import AuthInput from '../components/auth/AuthInput';
import { IconAviso } from '../components/icons';
import useAuth from '../data/hook/useAuth';

export default function Autenticacao() {
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [erro, setErro] = useState(null);
  const { cadastrar, login, loginGoogle } = useAuth();

  const handleSubmit = async () => {
    if (email && senha) {
      try {
        if (modo === 'login') {
          await login(email!, senha!);
        } else {
          await cadastrar(email!, senha!);
        }
      } catch (e: any) {
        exibirErro(e?.message ?? 'Erro desconhecido');
      }
    }
  };

  const exibirErro = (msg: any, tempo = 5) => {
    setErro(msg);
    setTimeout(() => setErro(null), tempo * 1000);
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='hidden md:block md:w-1/2 lg:w-2/3'>
        <img
          src='https://source.unsplash.com/random'
          alt='Imagem Tela de Login'
          className='h-screen w-full object-cover'
        />
      </div>
      <div className='m-10 w-full md:w-1/2 lg:w-1/3'>
        <h1 className='text-3xl font-bold mb-5'>
          {modo === 'login'
            ? 'Entre com sua conta'
            : 'Cadastre-se na plataforma'}
        </h1>
        {erro ? (
          <div className='flex gap-2 py-3 px-5 my-2 border border-red-700 rounded-lg bg-red-400 text-white'>
            {IconAviso} <span className='ml-3'>{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          label='Email'
          value={email}
          onChange={setEmail}
          type='email'
          required
        />
        <AuthInput
          label='Senha'
          value={senha}
          onChange={setSenha}
          type='password'
          required
        />
        <button
          onClick={handleSubmit}
          className='w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6'
        >
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
        <hr className='my-6 border-gray-300 w-full' />
        <button
          onClick={loginGoogle}
          className='w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 '
        >
          Entrar com Google
        </button>
        {modo === 'login' ? (
          <p className='mt-8'>
            Novo por aqui?
            <a
              onClick={() => setModo('cadastro')}
              className='ml-3 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer underline'
            >
              Crie uma conta
            </a>
          </p>
        ) : (
          <p className='mt-8'>
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo('login')}
              className='ml-3 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer underline'
            >
              Entre com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
