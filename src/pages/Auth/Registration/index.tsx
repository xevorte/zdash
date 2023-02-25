import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as TYPE from '../../../utils/types';
import * as API from '../../../utils/apis';
import * as ACTION from '../../../bootstraps/bootstrapActions';

import { Input } from '../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Page() {
  const [formData, setFormData] = useState({
    username: '',
    profileName: '',
    password: '',
    confirmPassword: '',
  });
  const [seePassword, setSeePassword] = useState(false);
  const navigate = useNavigate();

  const registrationAction = useCallback(async (data: TYPE.registrationTypes) => {
    const response = await API.registrationApi(data);

    if (response?.status === 200) {
      console.log(response);
      if (response?.data?.message === 'REGISTER SUCCESSFUL') {
        alert('Successfully Registration');
        navigate('/login');
      } else {
        alert(response?.data?.message || 'Failed Registration');
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
                if (formData.password === formData.confirmPassword) {
                  registrationAction(formData);
                } else {
                  alert('Password is not same!');
                }
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
                <Input
                  type='text'
                  icon={FAS.faUser}
                  label='Profile Name'
                  id='profileName'
                  value={formData.profileName}
                  placeholder='Enter your Profile Name'
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      profileName: e.target.value,
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
              <div className='my-4'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-slate-500 text-sm font-semibold mb-2'
                >
                  Confirm Password
                </label>
                <div className='flex items-center border border-slate-300 py-2.5 px-4 rounded-lg'>
                  <FontAwesomeIcon
                    icon={FAS.faLock}
                    size='1x'
                    className='text-indigo-500 mr-4'
                  />
                  <input
                    type={seePassword ? 'text' : 'password'}
                    id='confirmPassword'
                    name='confirmPassword'
                    className='w-full text-[15px] font-medium text-slate-500 outline-none placeholder:text-slate-400'
                    placeholder='Re enter your password'
                    value={formData?.confirmPassword}
                    onChange={(e: any) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        confirmPassword: e.target.value,
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
                Registration
              </button>
            </form>
            <Link
              to='/login'
              className='block text-indigo-500 text-sm text-center font-semibold mt-5'
            >
              Already have an account? login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
