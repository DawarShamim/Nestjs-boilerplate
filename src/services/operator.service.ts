import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOperatorDto } from '../dto/create-operator.dto';
import { UpdateOperatorDto } from '../dto/update-operator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { IOperator } from './interfaces/operator.interface';
import { Operator, OperatorDocument } from '../schemas/operator.schema';
import { PaginationDto } from 'src/utils/common/dto/pagination.dto';
import {
  getDocumentTotal,
  Pagination,
  paginationParams,
  PaginationResult,
} from 'src/utils/common/helpers/utility.helpers';
import { AdminLoginDto } from '../dto/admin-login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class OperatorService {
  constructor(
    @InjectModel(Operator.name)
    private readonly operatorModel: Model<OperatorDocument>,
  ) {}

  async create(createOperatorDto: CreateOperatorDto) {
    const existingOperator = await this.operatorModel
      .findOne({
        $or: [
          { email: createOperatorDto.email },
          { username: createOperatorDto.username },
        ],
      })
      .select('email username');
    if (existingOperator) {
      const ResponseMessage: string =
        existingOperator.email === createOperatorDto.email
          ? 'email'
          : 'username';
      throw new BadRequestException(
        `Operator with this ${ResponseMessage} already exists`,
      );
    }

    const newOperator = new this.operatorModel(createOperatorDto);

    return await newOperator.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ documents: Operator[]; paginated: PaginationResult }> {
    const { page, limit, skip } = paginationParams(paginationDto);

    const [result] = await this.operatorModel.aggregate([
      {
        $facet: {
          documents: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                username: 1,
                email: 1,
                role: 1,
                isSuperAdmin: 1,
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: 'value' }],
        },
      },
    ]);

    const { documents, totalCount } = result;
    const totalItems: number = getDocumentTotal(totalCount);
    const paginated = Pagination({ page, limit, totalItems });

    return { documents, paginated };
  }

  async adminlogin(adminLoginDto: AdminLoginDto) {
    // if (adminLoginDto.keepMeLoggedIn){

    // }

    const adminDetials = await this.operatorModel.findOne({
      username: adminLoginDto.username,
    });

    if (!adminDetials) {
      throw new BadRequestException(`User not found`);
    }
    const isPasswordMatch = await bcrypt.compare(
      adminLoginDto.password,
      adminDetials.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException(`Invalid Password`);
    }
    console.log('PasswordMacthed');
    return `This action returns a # operator`;
  }

  async update(
    id: string,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<Operator> {
    // Find the current operator by ID
    const existingOperator = await this.operatorModel.findById(id);
    if (!existingOperator) {
      throw new NotFoundException(`not found`);
    }

    // Check if updated email or username is already taken by other operators
    const conflictingOperator = await this.operatorModel.findOne({
      $and: [
        { _id: { $ne: id } }, // Ensure we're not checking against the current operator
        {
          $or: [
            { email: updateOperatorDto.email },
            { username: updateOperatorDto.username },
          ],
        },
      ],
    });

    if (conflictingOperator) {
      const responseMessage =
        conflictingOperator.email === updateOperatorDto.email
          ? 'email'
          : 'username';
      throw new BadRequestException(
        `Operator with this ${responseMessage} already exists`,
      );
    }

    // Update the operator
    await this.operatorModel.findByIdAndUpdate(id, updateOperatorDto, {
      new: true,
    });

    return this.operatorModel.findById(id);
  }

  async deactivate(id: string) {
    return `This action removes a #${id} operator`;
  }
}
