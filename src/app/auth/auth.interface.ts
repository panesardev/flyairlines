import { JWTPayload } from 'jose';
import { User } from '../domains/users/user.interface';

export interface AuthStateType {
  user: User;
  isAuthenticated: boolean;
  token: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  user: Partial<User>;
}

export interface ExtendedJwtPayload extends JWTPayload {
  userId: User['id'];
}
