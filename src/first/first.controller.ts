import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('first')
export class FirstController {
  @Get('getAll')
  getAllData(@Body() Data: any): string {
    console.log('Creating a new cat with data:', Data);
    // Logic to create a new cat
    return 'New cat created successfully';
  }

  @Post('create')
  createNewData(@Body() newData: any): string {
    console.log('Creating a new data:', newData);
    // Logic to create a new cat
    return 'New cat created successfully';
  }

  @Post('update')
  updatePreviousData(@Body() updatedData: any): string {
    console.log('Updating an Existing data:', updatedData);
    // Logic to update an existing cat
    return 'updated successfully';
  }
}
