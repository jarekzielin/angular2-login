export interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IMessage {
  body?: string;
  type?: string;
}

export interface ILoginResponse {
  authenticated: boolean;
  message: string;
}
