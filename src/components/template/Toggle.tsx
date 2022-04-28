import { IconMoon, IconSun } from '../icons';

interface ToggleProps {
  tema: string;
  alternar: () => void;
}

export default function Toggle(props: ToggleProps) {
  return props.tema === 'dark' ? (
    <div
      onClick={props.alternar}
      className='hidden sm:flex items-center cursor-pointer p-1 rounded-full w-20 lg:w-28 h-10 bg-gradient-to-r from-yellow-300 to-yellow-600'
    >
      <div className='flex items-center justify-center bg-white text-yellow-600 w-8 h-8 rounded-full'>
        {IconSun}
      </div>
      <div className='hidden lg:flex items-center ml-4 text-white'>
        <span>Claro</span>
      </div>
    </div>
  ) : (
    <div
      onClick={props.alternar}
      className='hidden sm:flex items-center justify-end cursor-pointer p-1 rounded-full w-20 lg:w-28 h-10 bg-gradient-to-r from-gray-500 to-gray-900'
    >
      <div className='hidden lg:flex items-center mr-2 text-gray-300'>
        <span>Escuro</span>
      </div>
      <div className='flex items-center justify-center bg-black text-yellow-300 w-8 h-8 rounded-full'>
        {IconMoon}
      </div>
    </div>
  );
}
