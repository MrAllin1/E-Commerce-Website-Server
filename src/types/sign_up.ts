interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  role: 'Administrator' | 'Shopper';
}

interface SignUpResponse {
  username?: string;
  email?: string;
  token?: string;
  role?: string;
  errors?: { msg: string }[];
}
export { SignUpRequest, SignUpResponse };