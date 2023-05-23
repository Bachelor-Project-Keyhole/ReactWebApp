export interface IUserResponse {
    expiration?: string,
    refreshToken?: string,
    refreshTokenExpiration?: string,
    token?: string,
    user?: IUser
}

export interface IUser {
    email?: string,
    id?: string,
    username?: string,
    roles?: Array<string>
}