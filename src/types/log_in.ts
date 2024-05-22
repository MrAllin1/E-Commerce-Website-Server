interface LogInRequest {
  email: string;
  password: string;
}

interface LogInResponse {
  username?: string;
  email?: string;
  userId?: number;
  token?: string;
  role?: string;
  errors?: { msg: string }[];
}
export { LogInRequest, LogInResponse };