import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  // Mock user data
  const mockUser = {
    _id: '1',
    username: 'testuser',
    password: 'password123', // Use hashed passwords in a real application
  };

  // Create a mock UsersService
  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue(mockUser), // Mock findOne to return the mock user
  };

  // Create a mock JwtService
  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('access_token'), // Mock signAsync to return a token
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('signIn', () => {
    it('should return an access token when credentials are valid', async () => {
      const result = await authService.signIn('testuser', 'password123');
      expect(result).toEqual({ access_token: 'access_token' });
      expect(usersService.findOne).toHaveBeenCalledWith('testuser');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser._id,
        username: mockUser.username,
      });
    });

    it('should throw an UnauthorizedException if user is not found', async () => {
      // Change the mock to return null for this test
      mockUsersService.findOne.mockResolvedValueOnce(null);

      await expect(
        authService.signIn('unknownuser', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOne).toHaveBeenCalledWith('unknownuser');
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      // Mock the findOne method to return the user
      mockUsersService.findOne.mockResolvedValueOnce(mockUser);

      // Test with incorrect password
      await expect(
        authService.signIn('testuser', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
      expect(usersService.findOne).toHaveBeenCalledWith('testuser');
    });
  });
});
