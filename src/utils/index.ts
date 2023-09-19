import { HttpException, HttpStatus } from '@nestjs/common';

export const formatedResponse = (data: any) => {
  const id = data._id.toString() || data.id;
  const dataFormated = { ...data, id };
  delete dataFormated['_id'];
  delete dataFormated['__v'];
  return dataFormated;
};

export const getFileName = (path: string) => {
  return path.replace(/\.[0-9a-z]+$/i, '');
};

export const getFileExtension = (path) => {
  return path.match(/\.[0-9a-z]+$/i)[0];
};

export const getParamsPagination = (args: PagingParms) => {
  const limit = args?.limit || 10;
  const page = args?.page || 1;
  const skip = (page - 1) * limit;
  return { skip, limit, page };
};

export const makePaging = <T>(
  items: T,
  totalItems: number,
  params: PagingParms,
): PaginResponse<T> => {
  return {
    items,
    totalItems,
    page: params.page,
    limit: params.limit,
    totalPages: Math.ceil(totalItems / params.limit),
    paging: false,
  };
};

export const handleError = (error: any) => {
  const { message, response } = error;
  const status = error?.status || response?.status || error?.statusCode;

  if (message && status) {
    throw new HttpException(message, status);
  } else throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
};
