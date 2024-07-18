import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  readonly title: string;
  readonly author: string;
  readonly publishedDate: Date;
}
