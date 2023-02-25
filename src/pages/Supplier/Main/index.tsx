import * as COMPONENT from '../../../components';
import * as API from '../../../utils/apis';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSVLink } from 'react-csv';

export default function Page() {
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
  });
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const getAllSuppliersAction = useCallback(async () => {
    const response = await API.suppliersGetAllApi({
      limit,
      offset,
      search: filter.search,
    });

    if (response?.status === 200) {
      if (response?.data?.message === 'OPERTATION SUCCESS') {
        setSuppliers(response?.data?.data);
        setTotalPages(response?.data?.total_page);
      };
    } else {
      navigate('/404');
    };
  }, [offset, filter.search]);

  const csvHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Nama Supplier', key: 'name' },
    { label: 'No Handphone Supplier', key: 'contact_number' },
    { label: 'Alamat', key: 'address' },
  ];

  const csvData = suppliers.map((barang: any) => ({
    id: barang?.id,
    name: barang?.namaSupplier,
    contact_number: barang?.noTelp,
    address: barang?.alamat,
  }));

  useEffect(() => {
    getAllSuppliersAction();
  }, [getAllSuppliersAction]);

  useEffect(() => {
    setOffset(1);
  }, [filter]);

  return (
    <>
      <div className='md:flex flex-wrap items-center'>
        <h2 className='text-3xl text-indigo-500 font-bold mr-auto md:text-4xl'>
          Supplier
        </h2>
        <COMPONENT.ExportExcel headers={csvHeaders} data={csvData} />
        <Link
          to={`/suppliers/create`}
          className='
          flex items-center justify-center bg-indigo-500 text-white font-semibold rounded-lg px-8 py-2.5 mt-5
          transition-all hover:bg-indigo md:mr-5 md:mt-0'
        >
          <FontAwesomeIcon icon={FAS.faPlus} className='mr-3' />
          Create
        </Link>
        <div className='flex items-center w-full bg-slate-200 border py-2.5 px-4 mt-5 rounded-lg md:w-2/5 md:mt-0'>
          <FontAwesomeIcon
            icon={FAS.faSearch}
            size='lg'
            className='text-indigo-500 mr-4'
          />
          <input
            type='text'
            id='username'
            name='username'
            className='w-full bg-transparent text-[15px] font-medium text-slate-500 outline-none placeholder:text-slate-500'
            placeholder='Search...'
            value={filter?.search}
            onChange={(e: any) =>
              setFilter((prev: any) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className='min-w-full w-0 rounded-xl overflow-x-auto pb-8 mt-12'>
        <table className='w-full table-auto bg-white rounded-xl overflow-hidden'>
          <thead>
            <tr className='bg-indigo-500'>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>ID</th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Name
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Contact Number
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Address
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier: any, id: number) => (
                <tr key={id} className='border-t border-b'>
                  <td className='font-medium p-8'>{supplier?.id}</td>
                  <td className='font-medium p-8'>{supplier?.namaSupplier}</td>
                  <td className='font-medium p-8'>{supplier?.noTelp}</td>
                  <td className='font-medium p-8'>{supplier?.alamat}</td>
                  <td className='font-medium p-8'>
                    <Link
                      to={`/suppliers/update/${supplier?.id}`}
                      className='flex items-center justify-center w-max bg-indigo-500 text-white font-semibold rounded-lg px-8 py-2 mx-auto transition-all hover:bg-indigo'
                    >
                      <FontAwesomeIcon icon={FAS.faPencil} className='mr-3' />
                      Update
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className='text-xl text-rose-500 text-center font-bold px-2 py-6'
                >
                  No Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <COMPONENT.Pagination
        offset={offset}
        setOffset={setOffset}
        totalPages={totalPages}
      />
    </>
  );
}
