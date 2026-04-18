interface Props {
  name: string;
  colors: string[];
}

export default function ColorPalette({ name, colors }: Props) {
  return (
    <div className='flex items-center gap-10'>
      <strong className='w-30 shrink-0 text-xl font-semibold uppercase'>
        {name}
      </strong>
      <div className='flex h-30 flex-1 border'>
        {colors.map((color) => (
          <div
            key={color}
            className={`flex h-full flex-1 items-center justify-center ${color}`}
          >
            <span className='text-sm text-white mix-blend-difference'>
              {color.split('bg-')[1]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
