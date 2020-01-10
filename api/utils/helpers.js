import crypto from 'crypto';


//random codes
export const genRandom = (howMany, chars) => {
    chars = chars || "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuWwXxYyZz0123456789";
    let rnd = crypto.randomBytes(howMany), value = new Array(howMany), len = chars.length;
    for (let i = 0; i < howMany; i++) {
        value[i] = chars[rnd[i] % len]
    };
    return value.join('');
};

