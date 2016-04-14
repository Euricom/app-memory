/* eslint-disable camelcase*/
import img_0 from './img_0.jpg';
import img_1 from './img_1.jpg';
import img_2 from './img_2.jpg';
import img_3 from './img_3.jpg';
import img_4 from './img_4.jpg';
import img_5 from './img_5.jpg';
import img_6 from './img_6.jpg';
import img_7 from './img_7.jpg';
import img_8 from './img_8.jpg';
import img_9 from './img_9.jpg';
import img_10 from './img_10.jpg';
import img_11 from './img_11.jpg';
import img_12 from './img_12.jpg';
import img_13 from './img_13.jpg';
import img_14 from './img_14.jpg';
import img_15 from './img_15.jpeg';
import img_16 from './img_16.jpg';
import img_17 from './img_17.jpg';
import img_18 from './img_18.jpg';
import img_19 from './img_19.jpg';
import img_20 from './img_20.png';
// import img_21 from './img_21.jpg';
// import img_22 from './img_22.jpg';
// import img_23 from './img_23.jpg';
// import img_24 from './img_24.jpg';
// import img_25 from './img_25.jpg';
// import img_26 from './img_26.jpg';
// import img_27 from './img_27.jpg';
// import img_28 from './img_28.jpg';
// import img_29 from './img_29.jpg';
import logo from './logo.png';
import question from './question.png';
export const pw = '5374';

export const Logo = logo;
export const Question = question;

const Images = [
    { reference: 'img_0', image: img_0 },
    { reference: 'img_1', image: img_1 },
    { reference: 'img_2', image: img_2 },
    { reference: 'img_3', image: img_3 },
    { reference: 'img_4', image: img_4 },
    { reference: 'img_5', image: img_5 },
    { reference: 'img_6', image: img_6 },
    { reference: 'img_7', image: img_7 },
    { reference: 'img_8', image: img_8 },
    { reference: 'img_9', image: img_9 },
    { reference: 'img_10', image: img_10 },
    { reference: 'img_11', image: img_11 },
    { reference: 'img_12', image: img_12 },
    { reference: 'img_13', image: img_13 },
    { reference: 'img_14', image: img_14 },
    { reference: 'img_15', image: img_15 },
    { reference: 'img_16', image: img_16 },
    { reference: 'img_17', image: img_17 },
    { reference: 'img_18', image: img_18 },
    { reference: 'img_19', image: img_19 },
    { reference: 'img_20', image: img_20 },
    // { reference: 'img_21', image: img_21 },
    // { reference: 'img_22', image: img_22 },
    // { reference: 'img_23', image: img_23 },
    // { reference: 'img_24', image: img_24 },
    // { reference: 'img_25', image: img_25 },
    // { reference: 'img_26', image: img_26 },
    // { reference: 'img_27', image: img_27 },
    // { reference: 'img_28', image: img_28 },
    // { reference: 'img_29', image: img_29 }
];

function shuffle(list) {
    const listToReturn = [...list];
    let j;
    let x;
    for (let i = listToReturn.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = list[i - 1];
        listToReturn[i - 1] = listToReturn[j];
        listToReturn[j] = x;
    }
    return listToReturn;
}

export function getImages(amount) {
    let am = amount;
    if (am > Images.length) {
        am = Images.length;
    }
    const list = Images;
    return list.slice(0, am);
}

/*
    This function will shuffle and double the inserted images array.
*/
export function getImagesShuffledAndDoubled(images) {
    let list = [...images];
    list.push(...list);
    list = shuffle(list);
    return list;
}

/*
    This function will generate x-amount of images with a max of 30 images.
    these images will be doubled and shuffled.
    Returns a list of images ready to add into a memory game
*/
export function getImagesShuffledAndDoubledByAmount(amount) {
    let amountToReturn = amount;
    if (amountToReturn > Images.length) {
        amountToReturn = Images.length;
    }
    let list = Images;

    list = shuffle(list);

    const toReturn = list.slice(0, amountToReturn);

    return getImagesShuffledAndDoubled(toReturn);
}

/* eslint-enable camelcase*/
