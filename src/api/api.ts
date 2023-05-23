
import querystring from 'querystring';
import { AxiosResponse } from 'axios';
import { createPayload } from '../api/utilis';
import {
    IPayloadAuth,
    IAuthWSResponse,
    IPayloadAuthToken,
    IAuthTwoFactorResponse,
    IResetPasswordByMailResponse,
    IPayloadWSResetPasswordByMail,
    ICheckTokenResponse,
    IPayloadWSCheckToken,
    IPayloadWSChangePassword,
    IChangePasswordResponse
} from './types';
import instance, { buildEncriptedUrl, getInstanceWithTime, buildTestUrl } from '../api/index';


export const getGeneralLogin = async ({
    dbUrl,
    ...restArgs // should be the ws payload
}: IPayloadAuth): Promise<AxiosResponse<IAuthWSResponse>> => {
    const data = querystring.stringify({
        ...createPayload(restArgs),
    });


    return instance.post(buildTestUrl('ws_Util_General_Login'), data);
};

export const getTwoFactorLogin = async ({
    dbUrl,
    ...restArgs // should be the ws payload
}: IPayloadAuthToken): Promise<AxiosResponse<IAuthTwoFactorResponse>> => {
    const data = querystring.stringify({
        ...createPayload(restArgs),
    });


    return instance.post(buildTestUrl('ws_Util_Check_Login_By_Pin_Code'), data);
};

export const WSResetPasswordByMail = async ({
    dbUrl,
    ...restArgs // should be the ws payload
}: IPayloadWSResetPasswordByMail): Promise<AxiosResponse<IResetPasswordByMailResponse>> => {
    const data = querystring.stringify({
        ...createPayload(restArgs),
    });


    return instance.post(buildTestUrl('ws_Util_Reset_Password_By_Mail'), data);
};

export const WSCheckToken = async ({
    dbUrl,
    ...restArgs // should be the ws payload
}: IPayloadWSCheckToken): Promise<AxiosResponse<ICheckTokenResponse>> => {
    const data = querystring.stringify({
        ...createPayload(restArgs),
    });


    return instance.post(buildTestUrl('ws_Util_Validate_Token'), data);
};

export const WSChangePassword = async ({
    dbUrl,
    ...restArgs // should be the ws payload
}: IPayloadWSChangePassword): Promise<AxiosResponse<IChangePasswordResponse>> => {
    const data = querystring.stringify({
        ...createPayload(restArgs),
    });


    return instance.post(buildTestUrl('ws_Util_Update_Password'), data);
};