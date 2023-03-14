export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRegistration extends UserCredentials {
  emailAddress: string
  roles: string[]
}

export interface Token {
  token: string
}
