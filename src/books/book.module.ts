import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { Book, BookSchema } from './schemas/book.schema'; // Adjust the path as necessary

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService], // If you need to use BooksService in other modules
})
export class BooksModule {}
