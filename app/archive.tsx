import { StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native'
import React from 'react'
import { subDays, format } from 'date-fns';
import ArchivedGameSelector from '@/components/wlgyo/ArchivedGameSelector';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
// import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ThemedTitleText from '@/components/ThemedTitleText';

const archive = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;

    // get all archived games, from today to origin
    const today = new Date();
    const allDays = Array.from({ length: 10 }, (_, i) =>
        format(subDays(today, i), 'yyyy-MM-dd')
    );
    const daysData = allDays.map(d => { return ({ date: d }) });
    // on press, 
    const loadGameForDate = async () => {

    };

    // if subscribed, grab game, else show subscribe modal 
    const handleArchivePress = () => {
        if (true) {
            router.navigate('/wlgyoGame1');
        }
    };

    // {allDays.map((date) => {
    //     return 
    // })}

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.archiveView, { backgroundColor }]}>
                <ThemedTitleText style={styles.archiveTitle}>Archive</ThemedTitleText>
                <FlatList
                    style={styles.flatListView}
                    data={daysData}
                    renderItem={({ item }) => <ArchivedGameSelector key={item.date} date={item.date} onPressFn={() => { handleArchivePress() }} />}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default archive

const styles = StyleSheet.create({
    archiveView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListView: {
        width: '90%'
    },
    archiveTitle: {
        fontSize: 40
    }
})