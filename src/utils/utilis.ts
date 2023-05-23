/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */

export const mobilePhoneRegex = new RegExp(/^05[0-9]{1}(-)?\d{7}$/);

export const digitRegex = new RegExp('[0-9]');
export const onlyDigitRegex = new RegExp('^[0-9]*$');
export const isoDateRegex = new RegExp(/^\d{4}–\d{2}–\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,}|)Z$/);
export const positiveNumberRegex = /^[0-9]*$/;
export const fleetDateFormat = new RegExp(/^\d{4}[.|-]\d{2}[.|-]\d{2}\s\d{2}:\d{2}$/);
export const digitOrPlusSymbolRegex = /^$|^([+]?\d{1,32})$/;
export const digitOrCharRegex = /[A-Za-z0-9]/;

// 'hh:mm'
export const timeDigit = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

