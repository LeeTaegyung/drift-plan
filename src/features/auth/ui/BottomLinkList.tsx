import Link from 'next/link';

interface Props {
  linkList: { name: string; url: string }[];
}

export function BottomLinkList({ linkList }: Props) {
  return (
    <ul className='text-text-secondary flex items-center text-sm'>
      {linkList.map((link) => (
        <li
          key={link.name}
          className='border-r-divider border-r-2 last-of-type:border-r-0'
        >
          <Link href={link.url} className='block px-2.5'>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
