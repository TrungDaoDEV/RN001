import { StyleSheet } from 'react-native';

const StyleCommon = StyleSheet.create({
    viewMain: {
        padding: 20
    },
    button1: {
        width: 80,
        backgroundColor: 'gray',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    active: {
        backgroundColor: 'red'
    },
    inactive: {
        backgroundColor: 'green'
    },
    bao: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 7,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default StyleCommon;
