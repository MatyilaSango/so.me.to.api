export interface IAuthUser {
  Uuid: string;
  Role: string;
}

export interface IJwtToken {
  accessToken: string;
  expiresIn: string;
}
