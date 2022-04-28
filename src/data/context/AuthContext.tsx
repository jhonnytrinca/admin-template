import route from 'next/router';
import { createContext, useEffect, useState } from 'react';
import firebase from '../../firebase/config';
import Usuario from '../../model/Usuario';
import Cookies from 'js-cookie';

interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  logout?: () => Promise<void>;
  loading?: boolean;
}

interface AuthProviderProps {
  children: any;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

async function usuarioNormalizado(
  usuarioFirebase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName!,
    email: usuarioFirebase.email!,
    token,
    provedor: usuarioFirebase.providerData!,
    imagemUrl: usuarioFirebase.photoURL!
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set('admin-template-auth', 'true', { expires: 1 });
  } else {
    Cookies.remove('admin-template-auth');
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>();

  useEffect(() => {
    if (Cookies.get('admin-template-auth')) {
      const cancelar = firebase.auth().onIdTokenChanged(configSessao);
      return () => cancelar();
    } else {
      setLoading(false);
    }
  }, []);

  const configSessao = async (user: any) => {
    if (user?.email) {
      const usuario = await usuarioNormalizado(user);
      setUsuario(usuario);
      gerenciarCookie(true);
      setLoading(false);
      return usuario.email;
    } else {
      setUsuario(undefined);
      gerenciarCookie(false);
      setLoading(false);
      return false;
    }
  };

  const loginGoogle = async () => {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());

      await configSessao(resp.user!);
      route.push('/');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, senha: string) => {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, senha);

      await configSessao(resp.user);
      route.push('/');
    } finally {
      setLoading(false);
    }
  };

  const cadastrar = async (email: string, senha: string) => {
    try {
      setLoading(true);
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha);

      await configSessao(resp.user);
      route.push('/');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      await configSessao(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ usuario, loginGoogle, login, logout, cadastrar, loading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
