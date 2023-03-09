import { HttpClient } from "../lib/api";

type CreateRequisitionInput = {
  keyword: string;
};

type CreateRequisitionOutput = {
  id: string;
};

async function createRequisition({ keyword }: CreateRequisitionInput) {
  const response = await HttpClient.post<CreateRequisitionOutput>("/crawl", {
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
  const response = await HttpClient.get<GetRequisitionStatusOutput>(
    `/crawl/${id}`
  );

  return response.data;
}

export const RequisitionResources = {
  createRequisition,
  getRequisitionStatus,
};
