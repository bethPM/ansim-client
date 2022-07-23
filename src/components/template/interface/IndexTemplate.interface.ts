export interface IKeyword {
  documents: IKeywordInfo[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: any[];
      selected_region: string;
    };
    total_count: number;
  };
}

export interface IKeywordInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface IAnsim {
  list: IAnsimInfo[];
  msg: string;
  result: string;
  totalCount: number;
}

export interface IAnsimInfo {
  adres: string;
  bsshNm: string;
  cl: string;
  clNm: string;
  etcAdres: string;
  hmpg: null;
  lcSn: number;
  lcinfoLa: number;
  lcinfoLo: number;
  rn: number;
  scope: null;
  scopeCd: null;
  telno: string;
  zip: string;
}
