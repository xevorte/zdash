import * as API from '../../../utils/apis';
import * as TYPE from '../../../utils/types';
import { Input } from '../../../components';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Page() {
  const [formData, setFormData] = useState({
    namaSupplier: '',
    noTelp: '',
    alamat: '',
  });
  const navigate = useNavigate();
  const params: any = useParams();

  const suppliersGetOneAction = useCallback(async (params: number) => {
    const response = await API.suppliersGetOneApi(params);

    if (
      response?.status === 200 &&
      response?.data?.message === 'OPERTATION SUCCESS'
    ) {
      setFormData(response?.data?.data);
    } else {
      navigate('/404');
    }
  }, []);

  const suppliersUpdateAction = useCallback(
    async (data: TYPE.supplierTypes, params: number) => {
      const response = await API.suppliersUpdateApi(data, params);

      if (response?.status === 200) {
        if (response?.data?.message === 'UPDATE SUCCES') {
          alert('Successfully Update Supplier!');
          navigate('/suppliers');
        } else {
          alert('Failed Update Supplier!');
        }
      } else {
        navigate('/404');
      }
    },
    []
  );

  useEffect(() => {
    if (params.id) {
      suppliersGetOneAction(parseInt(params.id));
    }
  }, [params.id]);

  return (
    <>
      <h2 className='text-3xl text-indigo-500 font-bold md:text-4xl'>
        Update Supplier {formData.namaSupplier}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          suppliersUpdateAction(formData, parseInt(params.id));
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