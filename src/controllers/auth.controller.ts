import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public authService = Container.get(AuthService);

  /**
   * @summary 회원가입
   * @description 사용자를 등록합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 로그인
   * @description 사용자를 로그인합니다.
   * @param {Request} req - 요청 객체
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @summary 로그아웃
   * @description 사용자를 로그아웃합니다.
   * @param {RequestWithUser} req - 요청 객체 (사용자 정보 포함)
   * @param {Response} res - 응답 객체
   * @param {NextFunction} next - 다음 미들웨어
   */
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
