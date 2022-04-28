import Link from 'next/link';

interface MenuItemProps {
  url?: string;
  texto: string;
  icone: any;
  onClick?: (e: any) => void;
  className?: string;
}

export default function MenuItem(props: MenuItemProps) {
  const render = () => {
    return (
      <a
        className={`flex flex-col justify-center items-center h-20 w-20 text-grey-600 dark:text-gray-200 ${props.className}`}
      >
        {props.icone}
        <span className='text-xs font-ligth'>{props.texto}</span>
      </a>
    );
  };
  return (
    <li
      className='hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
      onClick={props.onClick}
    >
      {props.url ? <Link href={props.url}>{render()}</Link> : render()}
    </li>
  );
}
