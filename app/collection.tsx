import { StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { subDays, format } from 'date-fns';
import ArchivedGameSelector from '@/components/wlgyo/ArchivedGameSelector';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
// import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ThemedTitleText from '@/components/ThemedTitleText';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SubscribeModal from '@/components/SubscribeModal';
import Checkbox from '@/components/Checkbox';
import RadioButton from '@/components/RadioButton';
import RadioButtonGroup from '@/components/RadioButtonGroup';

const collection = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].background;
    const subscribeModalRef = useRef<BottomSheetModal>(null);
    const isSubscribed = false;
    const viewOptions = ['all', 'completed', 'favorites']
    const [selectedViewOption, setSelectedViewOption] = useState<string>('all');
    // get all archived games, from today to origin
    const today = new Date();
    const allDays = Array.from({ length: 20 }, (_, i) =>
        format(subDays(today, i), 'MMM. dd, yyyy')
    );
    const daysData = allDays.map(d => { return ({ date: d }) });


    const handleShowSubscribeModal = () => {
        subscribeModalRef.current?.present();
    };

    // if subscribed, grab game, else show subscribe modal 
    const handleArchivePress = (date: string) => {
        if (date === format(today, 'MMM. dd, yyyy') || isSubscribed) {
            router.navigate('/wlgyoGame1');
        }
        else {
            handleShowSubscribeModal();
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.collectionView, { backgroundColor }]}>
                <SubscribeModal ref={subscribeModalRef} />
                {/* title */}
                <ThemedTitleText style={styles.collectionTitle}>Collection</ThemedTitleText>
                {/* checkboxes */}
                <View>
                    <RadioButtonGroup
                        options={viewOptions}
                        selectedOption={selectedViewOption}
                        setSelectedOption={setSelectedViewOption}
                        orientation='horizontal'
                    />
                </View>
                <FlatList
                    style={styles.flatListView}
                    data={daysData}
                    renderItem={({ item }) =>
                        <ArchivedGameSelector
                            key={item.date}
                            date={item.date}
                            isLocked={item.date != format(today, 'MMM. dd, yyyy')}
                            onPressFn={() => { handleArchivePress(item.date) }} />
                    }
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default collection;

const styles = StyleSheet.create({
    collectionView: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListView: {
        width: '90%'
    },
    collectionTitle: {
        fontSize: 40
    }
})