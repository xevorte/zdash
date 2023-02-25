import * as FAS from '@fortawesome/free-solid-svg-icons'
import { setLogin } from '../../bootstraps/bootstrapActions'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export default function Component() {
  const { username, profileName }: any = useSelector(state => state)
  const dispatch = useDispatch()
  const now = dayjs().locale('id').format('dddd, D MMMM YYYY');

  return (
    <div className='sidebar-footer w-full'>
      <div className='flex flex-wrap items-center'>
        <div className='relative'>
          <img src='/src/assets/images/avatar.jpg' alt='avatar' width={50} />
          <div className='absolute top-[2px] left-9 block w-[18px] h-[18px] bg-emerald-500 border-[3px] border-white rounded-full' />
        </div>
        <div className='ml-4'>
          <p className='text-[15px] font-semibold'>{profileName}</p>
          <small className='text-medium'>{username}</small>
        </div>
        <FontAwesomeIcon
          icon={FAS.faRightFromBracket}
          size='lg'
          className='
        text-slate-400 ml-auto cursor-pointer
        transition-all hover:text-indigo-500'
          onClick={() =>
            dispatch(
              setLogin({
                token: undefined,
                username: '',
                profileName: '',
              })
            )
          }
        />
      </div>
      <div className='bg-emerald-500 text-white text-center font-medium pt-2 pb-2.5 rounded-lg cursor-pointer select-none mt-5'>
        <small>{now}</small>
      </div>
    </div>
  );
}