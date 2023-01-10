import { Tokens } from './types/tokens.types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: 'at_secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: 'rt_secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<Tokens> {
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refreshToken);
    return tokens;
  }
  async updateRtHash(userId: string, refreshToken: string) {
    const rtHash = await bcrypt.hash(refreshToken, 10);
    return this.usersService.findUserByIdAndUpdate(userId, {
      hashedRt: rtHash,
    });
  }
  async login(createUserDto: CreateUserDto): Promise<Tokens> {
    const user = await this.usersService.findUserByEmail(createUserDto.email);

    if (!user) throw new ForbiddenException("User doesn't exist");

    const isPasswordCorrect = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) throw new ForbiddenException('Wrong password');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.findUserByIdAndUpdate(userId, {
      hashedRt: null,
    });
    return true;
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new ForbiddenException("User doesn't exist");

    const isRtCorrect = await bcrypt.compare(rt, user.hashedRt);
    if (!isRtCorrect) throw new ForbiddenException('Wrong refresh token');

    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRtHash(user._id, tokens.refreshToken);

    return tokens;
  }
}
