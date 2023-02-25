import * as TYPE from './types';
import { store } from '../bootstraps/index';
import axios from 'axios';

const BASE_URL = 'http://159.223.57.121:8090';

let states: any;

store.subscribe(() => {
  states = store.getState();
});

export const registrationApi = async (data: TYPE.registrationTypes) =>
  await axios.post(`${BASE_URL}/auth/register`, data);

export const loginApi = async (data: TYPE.loginTypes) =>
  await axios.post(`${BASE_URL}/auth/login`, data);

export const barangsGetAllApi = async ({ limit, offset, search }: TYPE.getAllTypes) =>
  await axios.get(`${BASE_URL}/barang/find-all`, {
    params: {
      limit,
      offset,
      search,
    },
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

export const barangsGetOneApi = async (params: number) =>
  await axios.get(`${BASE_URL}/barang/find-by-id/${params}`, {
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

export const barangsCreateApi = async (data: TYPE.barangTypes) =>
  await axios.post(`${BASE_URL}/barang/create`, data, {
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

  export const barangsUpdateApi = async (data: TYPE.barangTypes, params: number) =>
    await axios.put(`${BASE_URL}/barang/update/${params}`, data, {
      headers: {
        Authorization: `Bearer ${states.token}`,
      },
    });

export const suppliersGetAllApi = async ({ limit, offset, search }: TYPE.getAllTypes) =>
  await axios.get(`${BASE_URL}/supplier/find-all`, {
    params: {
      limit,
      offset,
      search,
    },
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

export const suppliersGetOneApi = async (params: number) =>
  await axios.get(`${BASE_URL}/supplier/find-by-id/${params}`, {
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

export const suppliersCreateApi = async (data: TYPE.supplierTypes) =>
  await axios.post(`${BASE_URL}/supplier/create`, data, {
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });

export const suppliersUpdateApi = async (data: TYPE.supplierTypes, params: number) =>
  await axios.put(`${BASE_URL}/supplier/update/${params}`, data, {
    headers: {
      Authorization: `Bearer ${states.token}`,
    },
  });