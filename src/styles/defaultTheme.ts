// eslint-disable-next-line import/named
import { DefaultTheme } from 'styled-components';

export const colors = {
    white: '#fff',
    black: 'rgb(0,0,0)',
    blue: '#2196F3',
    lightBlue: 'rgba(180, 190, 201, 0.303)',
    seaBlue: 'rgba(33, 150, 243, 0.08)',
    gray: '#C4C4C4',
    lightGray: '#EEEEEE',
    veryLightGray: '#F9F9F9',
    mediumLightGray: '#E8EBEF',
    lightYellow: '#FFEDB1',
    blueOcean: '#BCEFFF',
    muiRed: '#d32f2e',
};

export const msColors = {
    primaryTextcolor: '#494949',
    darkTextcolor: '#333333',
    lightTextColor: '#484644',
    veryLightTextColor: '#BEBEBE',
    yellow: '#FFD42A',
};
export const widgetsSidebarConfig = {
    largeWidth: '650px',
    mediumWidth: '535px',
    smallWidth: '480px',
};

export const fontSizes = {
    s: '14px',
    sm: '16px',
    m: '18px',
    ml: '24px',
    lg: '30px',
    xl: '36px',
};

export const fontFamilies = {
    SalsaRegular: 'Salsa-Regular',
    Rubik: 'Rubik',
};

export const deviceSizes = {
    desktopS: 1720,
    laptopM: 1605,
    laptopS: 1440,
    tablet: 768,
    mobileL: 550,
    mobileM: 375,
    mobileS: 320,
};

export const breakPoints = {
    tablet: `(max-width: ${deviceSizes.tablet}px)`,
    mobileL: `(max-width: ${deviceSizes.mobileL}px)`,
    mobileM: `(max-width: ${deviceSizes.mobileM}px)`,
    mobileS: `(max-width: ${deviceSizes.mobileS}px)`,
    laptopS: `(max-width: ${deviceSizes.laptopS}px)`,
    laptopM: `(max-width: ${deviceSizes.laptopM}px)`,
    desktopS: `(max-width: ${deviceSizes.desktopS}px)`,
};

const defaultTheme: DefaultTheme = {
    colors,
    msColors,
    fontFamilies,
    breakPoints,
    widgetsSidebarConfig,
};

export default defaultTheme;
