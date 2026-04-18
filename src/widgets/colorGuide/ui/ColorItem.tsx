interface Props {
  name: string;
  className: string;
  description: string;
}

export default function ColorItem({ name, className, description }: Props) {
  return (
    <div className='bg-surface flex items-center gap-2 rounded-xl p-2'>
      <div
        className={`border-border flex h-15 w-15 shrink-0 items-center justify-center rounded-lg border ${className}`}
      >
        Aa
      </div>
      <div className='flex flex-1 flex-col items-start justify-start gap-1'>
        <code className='bg-surface-alt rounded px-2 py-1 text-xs font-bold'>
          {name}
        </code>
        <div className='text-text-secondary text-sm'>{description}</div>
      </div>
    </div>
  );
}
