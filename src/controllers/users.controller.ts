import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';

export class UserController {
  public user = Container.get(UserService);

  /**
   * @summary 모든 사용자 조회
   * @description 모든 사용자를 조회합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary ID로 사용자 조회
   * @description ID를 사용하여 사용자를 조회합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 사용자 생성
   * @description 새로운 사용자를 생성합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 사용자 정보 업데이트
   * @description ID를 사용하여 사용자 정보를 업데이트합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 사용자 삭제
   * @description ID를 사용하여 사용자를 삭제합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
