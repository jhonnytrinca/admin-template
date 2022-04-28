import Link from 'next/link';
import Image from 'next/image';
import useAuth from '../../data/hook/useAuth';

interface AvatarProps {
  className?: string;
}

export default function Avatar(props: AvatarProps) {
  const { usuario } = useAuth();
  return (
    <Link href='/perfil' passHref>
      <Image
        src={usuario?.imagemUrl ?? '/images/avatar.svg'}
        alt='Avatar do usuário'
        className={`w-10 h-10 rounded-full cursor-pointer text-gray-200 ${props.className}`}
        height={40}
        width={40}
      />
    </Link>
  );
}
