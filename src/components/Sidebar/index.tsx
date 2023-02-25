import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as COMPONENT from '../../components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'classnames';

export default function Component() {
  const { sidebarToggle }: any = useSelector(state => state);
  const location = useLocation();

  return location.pathname !== '/404' ? (
    <div
      className={clsx(
        'fixed min-h-screen bg-white border-r border-r-slate-200 shadow-md overflow-y-auto transition-all z-10 lg:relative',
        sidebarToggle ? 'w-60 md:w-72 lg:w-80' : 'w-0'
      )}
    >
      <div className='absolute flex flex-col items-center justify-between w-full h-full py-10 px-6'>
        <div className='sidebar-header text-indigo-500 text-3xl font-bold'>
          Z DASH
        </div>
        <div className='sidebar-content w-full'>
          <COMPONENT.SidebarItem active={location.pathname === '/'} icon={FAS.faBolt} label='Overview' to='/' />
          <COMPONENT.SidebarItem active={location.pathname.includes('/barangs')} icon={FAS.faBoxesStacked} label='Barang' to='/barangs' />
          <COMPONENT.SidebarItem active={location.pathname.includes('/suppliers')} icon={FAS.faUsers} label='Supplier' to='/suppliers' />
        </div>
        <COMPONENT.SidebarFooter />
      </div>
    </div>
  ) : (
    <></>
  );
}