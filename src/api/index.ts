import axios from 'axios';

export const fleetDateFormat = new RegExp(/^\d{4}[.|-]\d{2}[.|-]\d{2}\s\d{2}:\d{2}$/);
export const isoDateRegex = new RegExp(/^\d{4}–\d{2}–\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,}|)Z$/);


export const proxy = 'https://israelProxy.y-it.co.il/ProxyService/ProxyService.svc/Proxy?url=';

export const encryptProxy = 'https://israelProxy.y-it.co.il/ProxyService/ProxyService.svc/EncryptProxy';


export const myWayUrl = 'https://4ynczhja78.execute-api.eu-west-1.amazonaws.com';

export const gpsServerUrl = 'https://vp7ldm0qg0.execute-api.eu-west-1.amazonaws.com';

export const ITURAN_API_URL = 'https://c6ubzg27cb.execute-api.eu-west-1.amazonaws.com/v1';

// temporary hard coded

export const proxy1 = 'https://proxy1.y-it.co.il/ProxyService/ProxyService.svc/Proxy';

export const testUrl = "http://reports.y-it.co.il:8080/fltctrl_11";

//

/**
 * Builds an encrypted URL to be used in the proxy.
 * @param {string} url - the URL to be encrypted.
 * @param {string} action - the action to be performed on the URL.
 * @returns {string} - the encrypted URL.
 */
export const buildEncriptedUrl = (url: string, action: string): string => {
    return `${encryptProxy}?url=${url}&action=${action}`;
};

export const buildTestUrl = (action: string) => {
    return `${proxy1}?url=${testUrl}/${action}`;
};

// const dateIsValid = (value: string): boolean => {
//    return fleetDateFormat.test(value) || isoDateRegex.test(value);
// };

const dateConvert = (key: string, value: unknown): unknown => {
    if (
        typeof value === 'string' &&
        (fleetDateFormat.test(value) || isoDateRegex.test(value)) // checking whether the date is valid
    )
        return new Date(value);

    return value;
};

const instance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformResponse: (res) => {
        try {
            return JSON.parse(res, dateConvert);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error, res);
            return res;
        }
    },
});
export const getInstanceWithTime = (timeout: number) => {
    return axios.create({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        timeout,
        transformResponse: (res) => {
            try {
                return JSON.parse(res, dateConvert);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error, res);
                return res;
            }
        },
    });
}
export default instance;
