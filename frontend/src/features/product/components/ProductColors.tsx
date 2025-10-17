import { useSearchQuery } from '@/hooks/useSearchQuery';
import { colors } from '../constants';

export default function ProductColors() {
  const { queryValue, handleSearchQuery } = useSearchQuery('color', '');

  return (
    <div className='pb-4'>
      <h3 className='text-lg font-semibold'>Colors</h3>
      <ul className='mt-2 flex gap-x-4'>
        {colors.map((color) => (
          <li onClick={() => handleSearchQuery(color.id)}>
            <div
              className={`size-7 rounded-full ${
                color.name
              } border shadow-sm hover:cursor-pointer ${
                color.id === queryValue
                  ? `ring-3 ring-offset-2 ${color.ringValue}`
                  : ''
              }`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
