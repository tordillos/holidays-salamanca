import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { onError, onResponse } from "../utils/axios";

const API_BASE_URL = "https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json", language: "es" },
});

const api = ({ ...options }: AxiosRequestConfig) => {
  return axiosInstance(options).then(onResponse).catch(onError);
};

export type GetDataRes<Data> = Promise<{
  results: Data[];
  total_count: number;
}>;

export type GetAllHolidaysReq = {
  fecha_fiesta: string;
  limit: number;
  pageParam: number;
};

export type GetAllHolidaysRes = GetDataRes<{
  provincia: string;
  municipio: string;
  fecha_fiesta: string;
  nombre_fiesta: string;
  ine: number;
}>;

export const getAllHolidays = async ({
  fecha_fiesta,
  limit,
  pageParam,
}: GetAllHolidaysReq): GetAllHolidaysRes => {
  const opts = {
    url: `catalog/datasets/fiestas-locales-calendario-de-fiestas-de-caracter-local/records?where=provincia="SALAMANCA"%20and%20fecha_fiesta>="${fecha_fiesta}"&order_by=fecha_fiesta&limit=${limit}&offset=${pageParam}`,
    method: "get",
  };
  return api({ ...opts });
};
