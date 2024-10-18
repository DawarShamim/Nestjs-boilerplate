import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.model';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  // Mock data
  const mockUser = {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  };

  const mockUserModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockUser]),
    }),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
      expect(userModel.find).toHaveBeenCalled();
      expect(userModel.find().exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const result = await service.findOne(mockUser.username);
      expect(result).toEqual(mockUser);
      expect(userModel.findOne).toHaveBeenCalledWith({
        username: mockUser.username,
      });
      expect(userModel.findOne().exec).toHaveBeenCalled();
    });

    // it('should return null if user not found', async () => {
    //   // Adjust the mock to return null
    //   userModel.findOne.mockReturnValueOnce({
    //     exec: jest.fn().mockResolvedValueOnce(null),
    //   });

    //   const result = await service.findOne('nonexistentuser');
    //   expect(result).toBeNull();
    //   expect(userModel.findOne).toHaveBeenCalledWith({
    //     username: 'nonexistentuser',
    //   });
    //   expect(userModel.findOne().exec).toHaveBeenCalled();
    // });
  });
});
