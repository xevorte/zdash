import * as FAS from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'classnames';

export default function Component({ offset, setOffset, totalPages }: any) {
  return (
    <div className='min-w-full w-0 rounded-lg overflow-x-auto pb-8'>
      <div className='flex items-center flex-shrink-0 mt-9'>
        {offset !== 1 && (
          <button
            className='bg-indigo-500 rounded-lg py-2.5 px-3.5 mr-4'
            onClick={() => setOffset((prev: any) => prev - 1)}
          >
            <FontAwesomeIcon
              icon={FAS.faChevronLeft}
              className='text-white'
              size='1x'
            />
          </button>
        )}
        {[...Array(totalPages)].map((el, id) => (
          <button
            key={id}
            className={clsx(
              'font-medium py-2.5 px-4 mx-2 rounded-lg transition-all hover:bg-indigo-500 hover:text-white',
              offset === id + 1
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-indigo-500'
            )}
            onClick={() => setOffset(id + 1)}
          >
            {id + 1}
          </button>
        ))}
        {offset !== totalPages && totalPages !== 0 && (
          <button
            className='bg-indigo-500 rounded-lg py-2.5 px-3.5 ml-4'
            onClick={() => setOffset((prev: any) => prev + 1)}
          >
            <FontAwesomeIcon
              icon={FAS.faChevronRight}
              className='text-white'
              size='1x'
            />
          </button>
        )}
      </div>
    </div>
  );
}