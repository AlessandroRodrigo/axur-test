import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type CreateRequisitionInput = {
  keyword: string;
};

type CreateRequisitionOutput = {
  id: string;
};

async function createRequisition({ keyword }: CreateRequisitionInput) {
  const response = await api.post<CreateRequisitionOutput>("/crawl", {
    keyword,
  });

  return response.data;
}

type GetRequisitionStatusInput = {
  id: string;
};

type GetRequisitionStatusOutput = {
  id: string;
  status: string;
  urls: string[];
};

async function getRequisitionStatus({ id }: GetRequisitionStatusInput) {
  const response = await api.get<GetRequisitionStatusOutput>(`/crawl/${id}`);

  return response.data;
}

export const RequisitionResources = {
  createRequisition,
  getRequisitionStatus,
};
