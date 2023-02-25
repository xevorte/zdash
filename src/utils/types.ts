export type registrationTypes = {
  username: string;
  profileName: string;
  password: string;
};

export type loginTypes = {
  username: string;
  password: string;
};

export type getAllTypes = {
  limit: number;
  offset: number;
  search: string;
}

export type barangTypes = {
  namaBarang: string;
  harga: number;
  stok: number;
  supplier: any;
}

export type supplierTypes = {
  namaSupplier: string;
  alamat: string;
  noTelp: string;
}