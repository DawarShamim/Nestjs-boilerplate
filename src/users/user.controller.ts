// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   HttpCode,
//   HttpStatus,
//   Put,
//   Query,
// } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiBody,
// } from '@nestjs/swagger';

// import { PaginationDto } from 'src/common/dto/pagination.dto';
// import { UsersService } from './users.service';
// import { User } from './schemas/user.model';

// @ApiTags('users')
// @Controller('users')
// export class OperatorController {
//   constructor(private readonly usersService: UsersService) {}

//   // @Post('/login')
//   // @ApiOperation({ summary: 'Admin Login' })
//   // @ApiResponse({
//   //   status: HttpStatus.CREATED,
//   //   description: 'The operator has been successfully created.',
//   //   type: User,
//   // })
//   // @ApiBody({ type: user })
//   // Login(@Body() adminLoginDto: AdminLoginDto) {
//   //   return this.operatorService.adminlogin(adminLoginDto);
//   // }

//   @Post()
//   @ApiOperation({ summary: 'Create a new operator' })
//   @ApiResponse({
//     status: HttpStatus.CREATED,
//     description: 'The operator has been successfully created.',
//     type: Operator,
//   })
//   @ApiBody({ type: CreateOperatorDto })
//   create(@Body() createOperatorDto: CreateOperatorDto) {
//     return this.operatorService.create(createOperatorDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Retrieve all operators' })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'List of operators.',
//     type: [Operator],
//   })
//   findAll(@Query() paginationDto: PaginationDto) {
//     return this.operatorService.findAll(paginationDto);
//   }

//   // @Get(':id')
//   // @ApiOperation({ summary: 'Retrieve an operator by ID' })
//   // @ApiParam({ name: 'id', description: 'Operator ID', type: String })
//   // @ApiResponse({
//   //   status: HttpStatus.OK,
//   //   description: 'The operator with the specified ID.',
//   //   type: Operator,
//   // })
//   // @ApiResponse({
//   //   status: HttpStatus.NOT_FOUND,
//   //   description: 'Operator not found.',
//   // })
//   // findOne(@Param('id') id: string) {
//   //   return this.operatorService.findOne(id);
//   // }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update an operator by ID' })
//   @ApiParam({ name: 'id', description: 'Operator ID', type: String })
//   @ApiBody({ type: UpdateOperatorDto })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: 'The updated operator.',
//     type: Operator,
//   })
//   @ApiResponse({
//     status: HttpStatus.NOT_FOUND,
//     description: 'Operator not found.',
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Invalid input data.',
//   })
//   update(
//     @Param('id') id: string,
//     @Body() updateOperatorDto: UpdateOperatorDto,
//   ) {
//     return this.operatorService.update(id, updateOperatorDto);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Deactivate an operator by ID' })
//   @ApiParam({ name: 'id', description: 'Operator ID', type: String })
//   @ApiResponse({
//     status: HttpStatus.NO_CONTENT,
//     description: 'The operator has been successfully deactivated.',
//   })
//   @ApiResponse({
//     status: HttpStatus.NOT_FOUND,
//     description: 'Operator not found.',
//   })
//   remove(@Param('id') id: string) {
//     return this.operatorService.deactivate(id);
//   }
// }
