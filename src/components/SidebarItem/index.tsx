import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import clsx from 'classnames'

type PropTypes = {
  active?: boolean
  icon: any
  label: string | number
  to?: string
}

export default function Component({ active, icon, label, to }: PropTypes) {
  return (
    <Link
      to={to || '/'}
      className={clsx(
        'sidebar-item flex items-center font-semibold rounded-xl py-2.5 pl-4 my-5 cursor-pointer transition-all',
        active
          ? 'bg-indigo-500 text-white'
          : 'text-slate-400 hover:text-indigo-500'
      )}
    >
      <FontAwesomeIcon icon={icon} size='lg' />
      <span className='ml-4'>{label}</span>
    </Link>
  );
}