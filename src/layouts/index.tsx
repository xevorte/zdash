import * as ACTION from '../bootstraps/bootstrapActions'
import * as COMPONENT from '../components'
import * as FAS from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'classnames'
import { useLocation } from 'react-router-dom';

export default function Layout({ children }: any) {
  const { sidebarToggle }: any = useSelector(state => state)
  const dispatch = useDispatch()
  const location = useLocation()

  return (
    <main className='lg:flex'>
      <COMPONENT.Sidebar />
      <div className='w-full p-12'>
        <FontAwesomeIcon
          icon={FAS.faBars}
          size='2x'
          className={clsx(
            'text-indigo-500 mb-10 cursor-pointer transition-all',
            sidebarToggle && 'ml-56 md:ml-72 lg:ml-0',
            location.pathname === '/404' && 'hidden'
          )}
          onClick={() => dispatch(ACTION.setSidebar(!sidebarToggle))}
        />
        {children}
      </div>
    </main>
  );
}