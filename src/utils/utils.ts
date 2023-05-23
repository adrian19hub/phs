const END = '438';

// generate a valid number from a string
const getAscii = (str: string) => {
    let ascii = 0;
    for (let i = 0; i < str.length; i++) {
        ascii += str.charCodeAt(i);
    }
    return ascii;
};
    
const getValidKey = (key: string) => {
    // if is valid number return it as number
    if (!isNaN(Number(key))) {
        return Number(key);
    }
    // if is not valid number return the ascii value of the string
    return getAscii(key);
  }


const genV1 = (websiteName: string, key: string) => {
    if (websiteName.length < 3 || !key) { 
        return 'key or website ame is not valid';
    }

   const prefix = websiteName.slice(0, 3);
   
   const digitsPart =
      (prefix.charCodeAt(0) +
         prefix.charCodeAt(1) +
         prefix.charCodeAt(2)) *
      getValidKey(key);

   return prefix + String(digitsPart) + END;
};

export const genV2 = (websiteName: string, key: string): string => {
    return genV1(websiteName, key).split('').map((char, i) => {
        if (i === 0) { 
            return char.toUpperCase();
        } 
        return char;
    }).join('');
}

// const p = getP('open', key);
// console.log(p);
export { genV1 }