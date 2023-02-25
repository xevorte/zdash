import * as API from '../../../utils/apis';
import * as TYPE from '../../../utils/types';
import { Input } from '../../../components';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const [formData, setFormData] = useState({
    namaBarang: '',
    harga: 1,
    stok: 1,
    supplier: {
      namaSupplier: '',
      alamat: '',
      noTelp: '',
    },
  });
  const navigate = useNavigate();

  const barangsCreateAction = useCallback(async (data: TYPE.barangTypes) => {
    const response = await API.barangsCreateApi(data);

    if (response?.status === 200) {
      if (response?.data?.message === 'SAVE SUCCESS') {
        alert('Successfully Create New Barang!');
        navigate('/barangs');
      } else {
        alert('Failed Create New Barang!');
      }
    } else {
      navigate('/404');
    }
  }, []);

  return (
    <>
      <h2 className='text-3xl text-indigo-500 font-bold md:text-4xl'>
        Create New Barang
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          barangsCreateAction(formData);
        }}
      >
        <div className='grid grid-cols-1 gap-5 w-full bg-white border border-slate-200 shadow-md rounded-xl p-4 mt-8 md:grid-cols-2 md:p-8'>
          <div>
            <Input
              type='text'
              label='Barang Name'
              id='namaBarang'
              value={formData?.namaBarang}
              placeholder='Enter barang name'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, namaBarang: e.target.value }))
              }
            />
          </div>
          <div>
            <Input
              type='number'
              label='Barang Price'
              id='harga'
              value={formData?.harga}
              placeholder='Enter barang price'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  harga: e.target.value <= 1 ? 1 : e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Input
              type='number'
              label='Barang Stok'
              id='stok'
              value={formData?.stok}
              placeholder='Enter barang stok'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  stok: e.target.value <= 1 ? 1 : e.target.value,
                }))
              }
            />
          </div>
          <div>
            <Input
              type='text'
              label='Supplier Name'
              id='namaSupplier'
              value={formData?.supplier?.namaSupplier}
              placeholder='Enter supplier name'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  supplier: { ...prev.supplier, namaSupplier: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <Input
              type='text'
              label='Supplier Address'
              id='alamat'
              value={formData?.supplier?.alamat}
              placeholder='Enter supplier address'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  supplier: { ...prev.supplier, alamat: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <Input
              type='text'
              label='Supplier Contact Number'
              id='noTelp'
              value={formData?.supplier?.noTelp}
              placeholder='Enter supplier contact number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  supplier: { ...prev.supplier, noTelp: e.target.value },
                }))
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