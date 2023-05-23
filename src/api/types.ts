export interface IPayloadAuth {
    userName: string;
    password: string;
    dbUrl: string;
}

export interface IPayloadAuthToken {
    pinCode: string;
    dbUrl: string;
    username: string | null;
}

export enum LoginWSResponseCodes {
    Ok = 0,
    UserNameNotExist = 1,
    WrongPassword = 2,
    MailMissing = 3,
    UserNameNotValid = 4,
}

export enum SecondLoginWSResponseCodes {
    Ok = 0,
    MissingParams = 1,
    UserNameNotExist = 2,
    TwoFactorAuthFailure = 3,
    SqlError = 99,
}


export interface IAuthWSResponse {
    response: LoginWSResponseCodes;
    data: string;
}

export interface IAuthTwoFactorResponse {
    response: SecondLoginWSResponseCodes
    data: string | null;
}


// Reset Password Types 

export interface IPayloadWSResetPasswordByMail {
    url: string;
    userName: string;
    dbUrl: string;
}

export interface IResetPasswordByMailResponse {
    response: ResetPasswordByMailResponseCodes
    data: string | null
}

export enum ResetPasswordByMailResponseCodes {
    Ok = 0,
    userNameEmpty = 1,
    UserNameNotExist = 2,
    MissingMail = 3,
    SqlError = 99
}

export interface IPayloadWSCheckToken {
    token: string;
    dbUrl: string;
}

export interface ICheckTokenResponse {
    response: CheckTokenResponseCodes
    data: string | null
}

export enum CheckTokenResponseCodes {
    Ok = 0,
    TokenNotValid = 1,
    SqlError = 99
}

export interface IPayloadWSChangePassword {
    password: string;
    dbUrl: string;
    token: string;
}

export interface IChangePasswordResponse {
    response: ChangePasswordResponseCodes
    data: string | null
}

export enum ChangePasswordResponseCodes {
    Ok = 0,
    ChangePasswordFailure = 1,
    SqlError = 99
}
