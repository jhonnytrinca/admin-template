import useAppData from '../../data/hook/useAppData';
import Avatar from './Avatar';
import Titulo from './Titulo';
import Toggle from './Toggle';

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
}

export default function Cabecalho(props: CabecalhoProps) {
  const { tema, alternarTema } = useAppData();

  return (
    <div className='flex'>
      <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
      <div className='flex flex-grow justify-end items-center gap-2'>
        <Toggle tema={tema} alternar={alternarTema} />
        <Avatar />
      </div>
    </div>
  );
}
