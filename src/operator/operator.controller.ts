import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Operator } from './schemas/operator.schema';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('operators')
@Controller('operator')
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Admin Login' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The operator has been successfully created.',
    type: Operator,
  })
  @ApiBody({ type: AdminLoginDto })
  Login(@Body() adminLoginDto: AdminLoginDto) {
    return this.operatorService.adminlogin(adminLoginDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new operator' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The operator has been successfully created.',
    type: Operator,
  })
  @ApiBody({ type: CreateOperatorDto })
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorService.create(createOperatorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all operators' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of operators.',
    type: [Operator],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.operatorService.findAll(paginationDto);
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Retrieve an operator by ID' })
  // @ApiParam({ name: 'id', description: 'Operator ID', type: String })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'The operator with the specified ID.',
  //   type: Operator,
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: 'Operator not found.',
  // })
  // findOne(@Param('id') id: string) {
  //   return this.operatorService.findOne(id);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an operator by ID' })
  @ApiParam({ name: 'id', description: 'Operator ID', type: String })
  @ApiBody({ type: UpdateOperatorDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated operator.',
    type: Operator,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Operator not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.operatorService.update(id, updateOperatorDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deactivate an operator by ID' })
  @ApiParam({ name: 'id', description: 'Operator ID', type: String })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The operator has been successfully deactivated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Operator not found.',
  })
  remove(@Param('id') id: string) {
    return this.operatorService.deactivate(id);
  }
}
