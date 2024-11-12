// react
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

// components
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
    useBottomSheetModal,
} from '@gorhom/bottom-sheet';
export type Ref = BottomSheetModal;
import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import ThemedText from '../typography/ThemedText';

// navigation
import { Link } from 'expo-router';

// animation
import { useSharedValue } from 'react-native-reanimated';

// styles
import { defaultStyles } from '@/constants/Styles';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// types
import { carouselCard } from '@/types/components';


const Benefits = [
    'Access to all past daily WLGYO',
    'Star and label your favorite idioms',
    'Extra hints!',
    'Track your progress',
];

const SubscribeModal = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['90%'], []);
    const { dismiss } = useBottomSheetModal();
    const { bottom } = useSafeAreaInsets();

    const [signUpMode, setSignUpMode] = useState<'Sign up' | 'Subscribe'>('Sign up');
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                opacity={0.2}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
                onPress={dismiss}
            />
        ),
        []
    );
    const screenWidth = Dimensions.get('window').width;
    const carouselData: carouselCard[] = [
        {
            header: 'Free',
            content: '- daily idiom puzzles\n- ability to view completed daily puzzles'
        },
        {
            header: 'Paid ($3)',
            content: '- daily idiom puzzles\n- ability to view all past daily puzzles\n- ability to favorite and tag idioms'
        }
    ];
    const progress = useSharedValue(0);

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            handleComponent={null}>
            <View style={styles.modalBtns}>
                <Link href={'/login'} asChild>
                    <TouchableOpacity>
                        <Text style={styles.textBtn}>LOG IN</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity onPress={() => dismiss()}>
                    <Ionicons name="close" size={28} color={Colors.light.icon} />
                </TouchableOpacity>
            </View>
            <BottomSheetScrollView>
                <Text style={styles.containerHeadline}>When life gives you $3.{'\n'}Buy a lifetime of WLGYO.</Text>

                <View style={{ marginVertical: 20 }}>
                    {/* <MarkedList
                        counterRenderer={disc}
                        lineStyle={{ paddingHorizontal: 40, gap: 10, marginVertical: 10 }}>
                        {Benefits.map((value, index) => (
                            <Text key={index} style={styles.listText}>
                                {value}
                            </Text>
                        ))}
                    </MarkedList> */}
                    {/* change to side-by-side buttons later */}
                    <Carousel
                        loop={false}
                        width={screenWidth}
                        height={screenWidth * 2 / 3}
                        // autoPlay={true}
                        data={carouselData}
                        onProgressChange={progress}
                        onSnapToItem={(index) => {
                            index === 0 ? setSignUpMode('Sign up') : setSignUpMode('Subscribe')
                        }}
                        renderItem={({ item, index }) => (
                            <View
                                style={styles.carouselCard}
                            >
                                <ThemedText style={styles.carouselHeader}>
                                    {item.header}
                                </ThemedText>
                                <ThemedText style={styles.carouselText}>
                                    {item.content}
                                </ThemedText>
                            </View>
                        )}
                    />
                    <Pagination.Basic
                        progress={progress}
                        data={carouselData}
                        dotStyle={styles.dotStyle}
                        containerStyle={styles.dotContainer}
                    />
                </View>
                {/* <Text style={styles.disclaimer}>
                    Buy more oranges.
                </Text> */}
            </BottomSheetScrollView>
            <View style={[styles.footer, { paddingBottom: bottom }]}>
                <View style={styles.footerButtonView}>
                    <View style={styles.footerBtn}>
                        <Link href='/subscribe' asChild>
                            <TouchableOpacity
                                style={defaultStyles.btn}
                                onPress={() => dismiss()}
                            >
                                <Text style={defaultStyles.btnText}>
                                    {signUpMode}
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    {/* <View style={styles.footerBtn}>
                        <TouchableOpacity style={defaultStyles.btn}>
                            <Text style={defaultStyles.btnText}>Try it out!</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {/* <Text style={styles.footerText}>Preview ends after 24 hours.</Text> */}
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerHeadline: {
        fontSize: 34,
        padding: 20,
        textAlign: 'center',
        fontFamily: 'Nunito_400Regular',
    },
    image: {
        width: '90%',
        alignSelf: 'center',
        height: 40,
    },
    modalBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    textBtn: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    carouselCard: {
        flex: 1,
        // minHeight: 100,
        // height: '100%',
        padding: 30,
        margin: 30,
        backgroundColor: Colors.light.background,
        borderRadius: 10,
    },
    carouselText: {
        fontSize: 20,
        // fontStyle: 'italic',
        color: Colors.dark.buttonText
    },
    carouselHeader: {
        fontSize: 35,
        fontWeight: 'bold',
        color: Colors.dark.buttonText
    },
    dotContainer: {
        gap: 5,
        marginBottom: 10
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 50
    },
    listText: {
        fontSize: 14,
        flexShrink: 1,
        color: '#4f4f4f',
    },
    disclaimer: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#484848',
        marginHorizontal: 30,
        lineHeight: 18,
        marginBottom: 20,
    },
    footer: {
        backgroundColor: '#fff',
        marginTop: 'auto',
        paddingHorizontal: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        paddingTop: 20,
    },
    footerButtonView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 20,
        gap: 20
    },
    footerBtn: {
        paddingTop: 10,
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#484848',
        paddingTop: 10,
    },
});

export default SubscribeModal;