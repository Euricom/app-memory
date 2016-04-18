import { StyleSheet } from 'react-native';

const mainColor = '#69BE28';
const correctColor = 'green';
const wrongColor = 'red';
const textColor = '#6D6E71';
const passwordTextColor = 'white';
const buttonTextColor = 'white';
const backColor = 'white';

const family = 'Arial';
const h1 = 34;
const h2 = 28;
const h3 = 22;
const h4 = 20;
const p1 = 18;
const p2 = 16;

const borderRadius = 5;
const borderWidth = 2;
const configImageButtonWidth = 90;

const globalMargin = 15;
const smallMargin = 2;
const gameMargin = 2;
const globalPadding = 10;

function calcWidth(width) {
    return width - (borderWidth * 2);
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backColor,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    innerContainer: {
        borderRadius,
        alignItems: 'center',
        width: 350,
    },
    mainImage: {
        marginTop: 65,
        padding: globalPadding,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 406,
        width: 224,
    },
    navButton: {
        borderRadius,
        marginTop: globalMargin,
        height: 55,
        width: 400,
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    navButtonText: {
        padding: 10,
        fontFamily: family,
        fontSize: h2,
        color: buttonTextColor,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    navSpace: {
        marginLeft: 50,
        marginRight: 50,
    },
    navSmallButton: {
        borderRadius,
        marginTop: globalMargin,
        height: 45,
        width: 250,
        backgroundColor: mainColor,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    wrongAmountText: {
        padding: globalPadding,
        fontFamily: family,
        fontSize: p1,
        color: wrongColor,
        textAlign: 'center',
    },
    navSmallButtonText: {
        padding: globalPadding,
        fontFamily: family,
        fontSize: h4,
        color: buttonTextColor,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        margin: smallMargin,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    text: {
        padding: globalPadding,
        fontFamily: family,
        fontSize: p1,
        color: textColor,
    },
    modalText: {
        fontFamily: family,
        fontSize: p2,
        color: textColor,
        textAlign: 'center',
    },
    wrappedList: {
        marginTop: smallMargin,
        marginLeft: globalMargin,
        marginRight: globalMargin,
        marginBottom: smallMargin,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        height: 50,
        padding: 4,
        fontFamily: family,
        fontSize: h3,
        borderWidth,
        borderColor: mainColor,
        borderRadius,
        color: textColor,
        justifyContent: 'center',
        textAlign: 'center',
    },
    gameButton: {
        height: configImageButtonWidth,
        width: configImageButtonWidth,
        flexWrap: 'wrap',
        margin: gameMargin,
    },
    activeGameButton: {
        margin: gameMargin,
        borderRadius,
        height: configImageButtonWidth,
        width: configImageButtonWidth,
        flexWrap: 'wrap',
        borderColor: mainColor,
        borderWidth,
    },
    gameImage: {
        borderRadius,
        height: configImageButtonWidth,
        width: configImageButtonWidth,
    },
    activeGameImage: {
        height: calcWidth(configImageButtonWidth),
        width: calcWidth(configImageButtonWidth),
    },
    modalButton: {
        borderRadius,
        marginTop: globalMargin,
        height: 48,
        width: 250,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: mainColor,
    },
    modalButtonText: {
        padding: globalPadding,
        fontFamily: family,
        fontSize: h1,
        color: buttonTextColor,
        textAlign: 'center',
        justifyContent: 'center',
    },
    modalInput: {
        width: 150,
        height: 50,
        fontFamily: family,
        fontSize: h3,
        borderWidth,
        borderColor: mainColor,
        borderRadius,
        color: passwordTextColor,
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
    },
    correctImage: {
        height: 200,
        width: 200,
        borderColor: correctColor,
        borderWidth,
        borderRadius,
    },
    wrongImage: {
        margin: globalMargin,
        height: 100,
        width: 100,
        borderColor: wrongColor,
        borderWidth,
        borderRadius,
    },
});
