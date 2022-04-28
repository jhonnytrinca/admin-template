import useAuth from '../../data/hook/useAuth';
import { IconeCasa, IconeConfig, IconeNotif, IconLogout } from '../icons';
import Logo from './Logo';
import MenuItem from './MenuItem';

export default function MenuLateral() {
  const { logout } = useAuth();

  return (
    <aside className='flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-800'>
        <Logo />
      </div>
      <ul className='flex-grow'>
        <MenuItem url='/' texto='Início' icone={IconeCasa} />
        <MenuItem url='/ajustes' texto='Ajustes' icone={IconeConfig} />
        <MenuItem url='/notificacoes' texto='Notificações' icone={IconeNotif} />
      </ul>
      <ul>
        <MenuItem
          texto='Sair'
          icone={IconLogout}
          onClick={logout}
          className='text-red-600 dark:text-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white'
        />
      </ul>
    </aside>
  );
}
