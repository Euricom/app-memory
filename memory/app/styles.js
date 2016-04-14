import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: 'white',
    },
    mainImage: {
        borderRadius: 65,
        marginTop: 65,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        height: 406,
        width: 224,
    },
    navButton: {
        borderRadius: 65,
        marginTop: 15,
        height: 65,
        width: 450,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    navButtonText: {
        padding: 10,
        fontSize: 35,
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 18,
    },
    wrappedList: {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input: {
        width: 250,
        height: 50,
        padding: 4,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 8,
        color: 'black',
        justifyContent: 'center',
        textAlign: 'center',
    },
});
