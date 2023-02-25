import * as COMPONENT from '../../../components';
import * as API from '../../../utils/apis';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';

export default function Pages() {
  const [barangs, setBarangs] = useState([]);
  const [filter, setFilter] = useState({
    search: '',
  });
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const getAllBarangsAction = useCallback(async () => {
    const response = await API.barangsGetAllApi({
      limit,
      offset,
      search: filter.search,
    });

    if (response?.status === 200) {
      if (response?.data?.message === 'OPERTATION SUCCESS') {
        setBarangs(response?.data?.data);
        setTotalPages(response?.data?.total_page);
      };
    } else {
      navigate('/404');
    };
  }, [offset, filter.search]);

  const csvHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Nama Barang', key: 'name' },
    { label: 'Harga Barang', key: 'price' },
    { label: 'Stok Barang', key: 'stock' },
    { label: 'Nama Supplier', key: 'supplier_name' },
    { label: 'Alamat Supplier', key: 'supplier_address' },
    { label: 'No Handphone Supplier', key: 'supplier_contact_number' },
  ];

  const csvData = barangs.map((barang: any) => ({
    id: barang?.id,
    name: barang?.namaBarang,
    price: barang?.harga,
    stock: barang?.stok,
    supplier_name: barang?.supplier?.namaSupplier,
    supplier_address: barang?.supplier?.alamat,
    supplier_contact_number: barang?.supplier?.noTelp,
  }));

  useEffect(() => {
    getAllBarangsAction();
  }, [getAllBarangsAction]);

  useEffect(() => {
    setOffset(1);
  }, [filter]);

  return (
    <>
      <div className='md:flex flex-wrap items-center'>
        <h2 className='text-4xl text-indigo-500 font-bold pr-4 mr-auto -mt-1 mb-8 md:mb-0'>
          Barang
        </h2>
        <COMPONENT.ExportExcel headers={csvHeaders} data={csvData} />
        <Link
          to={`/barangs/create`}
          className='
          flex items-center justify-center bg-indigo-500 text-white font-semibold rounded-lg px-5 py-2.5 mt-5
          transition-all hover:bg-indigo md:mr-5 md:mt-0'
        >
          <FontAwesomeIcon icon={FAS.faPlus} className='mr-3' />
          Create
        </Link>
        <div className='flex items-center w-full bg-slate-200 border py-2.5 px-4 mt-5 rounded-lg md:w-2/5 md:mt-0'>
          <FontAwesomeIcon
            icon={FAS.faSearch}
            size='lg'
            className='text-indigo-500 mr-3'
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
        <table className='w-full table-auto bg-white border rounded-xl overflow-hidden'>
          <thead>
            <tr className='bg-indigo-500'>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>ID</th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Name
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Price
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Stock
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Supplier Name
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Supplier Address
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Supplier Contact
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {barangs.length > 0 ? (
              barangs.map((barang: any, id: number) => (
                <tr key={id} className='border-t border-b'>
                  <td className='font-medium p-8'>{barang?.id}</td>
                  <td className='font-medium p-8'>{barang?.namaBarang}</td>
                  <td className='font-medium p-8'>
                    Rp {barang?.harga?.toLocaleString('id-ID')}
                  </td>
                  <td className='font-medium p-8'>{barang?.stok} PCS</td>
                  <td className='font-medium p-8'>
                    {barang?.supplier?.namaSupplier}
                  </td>
                  <td className='font-medium p-8'>
                    {barang?.supplier?.alamat}
                  </td>
                  <td className='font-medium p-8'>
                    {barang?.supplier?.noTelp}
                  </td>
                  <td className='font-medium p-8'>
                    <Link
                      to={`/barangs/update/${barang?.id}`}
                      className='flex items-center bg-indigo-500 text-white font-semibold rounded-lg px-4 py-2 transition-all hover:bg-indigo'
                    >
                      <FontAwesomeIcon icon={FAS.faPencil} className='mr-2' />
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
