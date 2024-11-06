import { HttpException } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
export interface PaginationResult {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export function paginationParams(dto: PaginationDto): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Number(dto.page) ?? 1; // Default to 1 if page is undefined
  const limit = Number(dto.limit) ?? 10; // Default to 10 if limit is undefined
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function getDocumentTotal(totalCount: [{ value: number }] | []) {
  return totalCount && totalCount.length > 0 ? totalCount[0].value : 0;
}

export function Pagination({ totalItems, page, limit }): PaginationResult {
  const currentPage = page;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage,
    totalPages,
    limit,
    totalItems,
  };
}
interface ResponseData {
  [key: string]: string | number | boolean;
}

export function successHandler(message: string, data: ResponseData) {
  return { message, ...data };
}

export function failureHandler(
  statusCode: number,
  message: string,
  data: ResponseData,
) {
  throw new HttpException(message, statusCode, { ...data });
}
