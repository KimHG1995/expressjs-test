import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  /**
   * @summary 회원가입
   * @description 사용자를 등록합니다.
   * @param {CreateUserDto} userData - 사용자 정보
   * @returns {Promise<User>} 생성된 사용자 정보
   */
  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, password: hashedPassword } });

    return createUserData;
  }

  /**
   * @summary 로그인
   * @description 사용자를 로그인합니다.
   * @param {CreateUserDto} userData - 사용자 정보
   * @returns {Promise<{ cookie: string; findUser: User }>} 쿠키와 사용자 정보
   */
  public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  /**
   * @summary 로그아웃
   * @description 사용자를 로그아웃합니다.
   * @param {User} userData - 사용자 정보
   * @returns {Promise<User>} 로그아웃된 사용자 정보
   */
  public async logout(userData: User): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * @summary 토큰 생성
   * @description 사용자 정보를 기반으로 JWT 토큰을 생성합니다.
   * @param {User} user - 사용자 정보
   * @returns {TokenData} 토큰 데이터
   */
  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  /**
   * @summary 쿠키 생성
   * @description 토큰 데이터를 기반으로 쿠키를 생성합니다.
   * @param {TokenData} tokenData - 토큰 데이터
   * @returns {string} 쿠키 문자열
   */
  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
