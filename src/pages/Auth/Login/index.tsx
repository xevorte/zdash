import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as TYPE from '../../../utils/types';
import * as API from '../../../utils/apis';
import * as ACTION from '../../../bootstraps/bootstrapActions';

import { Input } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [seePassword, setSeePassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAction = useCallback(async (data: TYPE.loginTypes) => {
    const response = await API.loginApi(data);

    if (response?.status === 200) {
      if (response?.data?.message === 'LOGIN SUCCESS') {
        alert('Successfully Login');
        const { username, profileName, token } = response?.data?.data;

        dispatch(ACTION.setLogin({
          username ,
          profileName,
          token,
        }));
      } else {
        alert('Username or Password Wrong!');
      }
    } else {
      navigate('/404');
    }
  }, []);

  return (
    <div className='auth min-h-screen overflow-hidden'>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-4/5 bg-slate-200 border-[12px] border-indigo-100 rounded-xl md:w-[70%] lg:border-[16px] xl:w-6/12'>
          <div className='bg-white rounded-xl py-10 px-6 overflow-hidden sm:p-10'>
            <h3 className='font-extrabold text-indigo-600 text-4xl text-center mb-8 lg:text-5xl'>
              Z DASH
            </h3>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                loginAction(formData);
              }}
            >
              <div className='my-4'>
                <Input
                  type='text'
                  icon={FAS.faUser}
                  label='Username'
                  id='username'
                  value={formData.username}
                  placeholder='Enter your username'
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className='my-4'>
                <label
                  htmlFor='password'
                  className='block text-slate-500 text-sm font-semibold mb-2'
                >
                  Password
                </label>
                <div className='flex items-center border border-slate-300 py-2.5 px-4 rounded-lg'>
                  <FontAwesomeIcon
                    icon={FAS.faLock}
                    size='1x'
                    className='text-indigo-500 mr-4'
                  />
                  <input
                    type={seePassword ? 'text' : 'password'}
                    id='password'
                    name='password'
                    className='w-full text-[15px] font-medium text-slate-500 outline-none placeholder:text-slate-400'
                    placeholder='Enter your password'
                    value={formData?.password}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <FontAwesomeIcon
                    icon={seePassword ? FAS.faEyeSlash : FAS.faEye}
                    size='1x'
                    className='text-slate-400 cursor-pointer'
                    onClick={() => setSeePassword(!seePassword)}
                  />
                </div>
              </div>
              <button
                type='submit'
                className='w-full bg-indigo-500 text-white font-semibold text-lg rounded-lg pt-2 pb-2.5 px-2 mt-5 transition-all hover:bg-indigo-400'
              >
                Login
              </button>
            </form>
            <Link
              to='/registration'
              className='block text-indigo-500 text-sm text-center font-semibold mt-5'
            >
              Don't have an account? registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
