import { createContext, useEffect, useState } from 'react';

interface AppContextProps {
  tema: string;
  alternarTema: () => void;
}

interface AppProviderProps {
  children: any;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export function AppProvider(props: AppProviderProps) {
  const [tema, setTema] = useState('');

  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema');
    setTema(temaSalvo!);
  }, []);

  const alternarTema = () => {
    const novoTema = tema === '' ? 'dark' : '';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  return (
    <AppContext.Provider value={{ tema, alternarTema }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
