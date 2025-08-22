import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  /**
   * @summary 모든 사용자 조회
   * @description 모든 사용자를 조회합니다.
   * @returns {Promise<User[]>} 모든 사용자 정보
   */
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany();
    return allUser;
  }

  /**
   * @summary ID로 사용자 조회
   * @description ID를 사용하여 사용자를 조회합니다.
   * @param {number} userId - 사용자 ID
   * @returns {Promise<User>} 사용자 정보
   */
  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * @summary 사용자 생성
   * @description 새로운 사용자를 생성합니다.
   * @param {CreateUserDto} userData - 사용자 정보
   * @returns {Promise<User>} 생성된 사용자 정보
   */
  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.user.create({ data: { ...userData, password: hashedPassword } });
    return createUserData;
  }

  /**
   * @summary 사용자 정보 업데이트
   * @description ID를 사용하여 사용자 정보를 업데이트합니다.
   * @param {number} userId - 사용자 ID
   * @param {CreateUserDto} userData - 사용자 정보
   * @returns {Promise<User>} 업데이트된 사용자 정보
   */
  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData = await this.user.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  /**
   * @summary 사용자 삭제
   * @description ID를 사용하여 사용자를 삭제합니다.
   * @param {number} userId - 사용자 ID
   * @returns {Promise<User>} 삭제된 사용자 정보
   */
  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.user.delete({ where: { id: userId } });
    return deleteUserData;
  }
}
