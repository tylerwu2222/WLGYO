import { StyleSheet, Text, View, useColorScheme, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { subDays, format } from 'date-fns';
import CollectionGameSelector from '@/components/collection/CollectionGameSelector';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
// import { FlashList } from '@shopify/flash-list';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ThemedTitleText from '@/components/typography/ThemedTitleText';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SubscribeModal from '@/components/modals/SubscribeModal';
import RadioButtonGroup from '@/components/inputs/buttons/RadioButtonGroup';
import { ThemeContext } from '@/providers/ThemeProvider';
import { Searchbar } from 'react-native-paper';

const collection = () => {
    // hooks
    const router = useRouter();
    const {
        textColor,
        tintTextColor,
        backgroundColor
    } = useContext(ThemeContext);
    const [collectionSearchQuery, setCollectionSearchQuery] = useState<string>('');
    const [displayedPuzzles, setDisplayedPuzzles] = useState<string>('');

    // subscribe modal
    const subscribeModalRef = useRef<BottomSheetModal>(null);
    const isSubscribed = false;

    // radio button
    const viewOptions = ['all', 'completed', 'favorites']
    const [selectedViewOption, setSelectedViewOption] = useState<string>('all');

    // get all archived games, from today to original date
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

    // filter games when search query changes
    useEffect(() => {
        // setDisplayedPuzzles()
    }, [collectionSearchQuery]);

    const styles = StyleSheet.create({
        collectionView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            paddingHorizontal: 20
        },
        collectionSearchView: {
            width: '100%'
        },
        searchBar: {
            borderRadius: 10
        },
        flatListView: {
            width: '100%'
        },
        collectionTitle: {
            fontSize: 40
        }
    })

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.collectionView}>
                <SubscribeModal ref={subscribeModalRef} />
                {/* title */}
                <ThemedTitleText style={styles.collectionTitle}>Collection</ThemedTitleText>
                {/* search */}
                <View style={styles.collectionSearchView}>
                    <Searchbar
                        placeholder='Search idioms'
                        onChangeText={setCollectionSearchQuery}
                        value={collectionSearchQuery}
                        style={styles.searchBar}
                        theme={{
                            colors: {
                                primary: tintTextColor,
                                onSurface: tintTextColor,
                                onSurfaceVariant: tintTextColor
                            }
                        }}
                    />
                </View>
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
                        <CollectionGameSelector
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
