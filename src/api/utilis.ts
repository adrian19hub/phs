import { AxiosResponse } from 'axios';

export const createPayload = (data: any): object => {
    const res = Object.keys(data).reduce((acc: any, curr: any): any => {
        acc[`$${curr}`] = data[curr];
        return acc;
    }, {});
    return res;
};
export const temp = '';

