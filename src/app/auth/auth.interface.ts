import { JWTPayload } from 'jose';
import { User } from '../domains/users/user.interface';

export interface AuthStateType {
  user: User;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ExtendedJwtPayload extends JWTPayload {
  userId: User['id'];
}
