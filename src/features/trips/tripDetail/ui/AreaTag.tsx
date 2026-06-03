interface Props {
  text: string;
}

export default function AreaTag({ text }: Props) {
  return (
    <span className='bg-info-bg border-info-border text-info-text rounded-[4px] border px-1 text-sm'>
      {text}
    </span>
  );
}
