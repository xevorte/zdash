import * as API from '../../../utils/apis';
import * as TYPE from '../../../utils/types';
import { Input } from '../../../components';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const [formData, setFormData] = useState({
    namaSupplier: '',
    noTelp: '',
    alamat: '',
  });
  const navigate = useNavigate();

  const suppliersCreateAction = useCallback(async (data: TYPE.supplierTypes) => {
    const response = await API.suppliersCreateApi(data);

    if (response?.status === 200) {
      if (response?.data?.message === 'SAVE SUCCESS') {
        alert('Successfully Create New Supplier!');
        navigate('/suppliers');
      } else {
        alert('Failed Create New Supplier!');
      }
    } else {
      navigate('/404');
    }
  }, []);

  return (
    <>
      <h2 className='text-3xl text-indigo-500 font-bold md:text-4xl'>
        Create New Supplier
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          suppliersCreateAction(formData);
        }}
      >
        <div className='grid grid-cols-1 gap-5 w-full bg-white border border-slate-200 shadow-md rounded-xl p-4 mt-8 md:grid-cols-2 md:p-8'>
          <div>
            <Input
              type='text'
              label='Supplier Name'
              id='namaSupplier'
              value={formData?.namaSupplier}
              placeholder='Enter supplier name'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  namaSupplier: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Input
              type='text'
              label='Supplier Contact Number'
              id='noTelp'
              value={formData?.noTelp}
              placeholder='Enter supplier contact number'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, noTelp: e.target.value }))
              }
            />
          </div>
          <div>
            <Input
              type='text'
              label='Supplier Address'
              id='alamat'
              value={formData?.alamat}
              placeholder='Enter supplier address'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, alamat: e.target.value }))
              }
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-indigo-500 text-white font-semibold py-3 mt-8 rounded-xl transition-all hover:bg-indigo-400'
        >
          Save
        </button>
      </form>
    </>
  );
};