import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './interfaces/book.interface';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationResult } from '../common/helpers/utility.helpers';
import {
  getDocumentTotal,
  Pagination,
  paginationParams,
} from 'src/common/helpers/utility.helpers';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ documents: Book[]; paginated: PaginationResult }> {
    const { page, limit, skip } = paginationParams(paginationDto);

    const [result] = await this.bookModel.aggregate([
      {
        $facet: {
          documents: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: 'value' }],
        },
      },
    ]);

    const { documents, totalCount } = result;
    const totalItems: number = getDocumentTotal(totalCount);
    const paginated = Pagination({ page, limit, totalItems });

    return { documents, paginated };
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto);
  }
}
