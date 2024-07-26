import { JWTPayload } from 'jose';
import { User } from '../domains/users/user.interface';

export interface AuthStateType {
  user: User;
  isAuthenticated: boolean;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateAccountRequest {
  user: Partial<User>;
}

export interface AuthResponse {
  token: string | null;
  errored: boolean;  
  message: string;
}

export interface ExtendedJwtPayload extends JWTPayload {
  userId: User['id'];
}
