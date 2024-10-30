import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import React, { forwardRef, useCallback, useMemo } from 'react';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
    useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { defaultStyles } from '@/constants/Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
export type Ref = BottomSheetModal;

import disc from '@jsamr/counter-style/presets/disc';
import MarkedList from '@jsamr/react-native-li';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

const Benefits = [
    'Access to all past daily WLGYO',
    'Star and label your favorite proverbs',
    'Extra hints!',
    'Track your progress',
];

const SubscribeModal = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['90%'], []);
    const { dismiss } = useBottomSheetModal();
    const { bottom } = useSafeAreaInsets();

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
                <Text style={styles.containerHeadline}>When life gives you $4.{'\n'}Buy a lifetime of WLGYO.</Text>

                <View style={{ marginVertical: 20 }}>
                    <MarkedList
                        counterRenderer={disc}
                        lineStyle={{ paddingHorizontal: 40, gap: 10, marginVertical: 10 }}>
                        {Benefits.map((value, index) => (
                            <Text key={index} style={styles.listText}>
                                {value}
                            </Text>
                        ))}
                    </MarkedList>
                </View>
                <Text style={styles.disclaimer}>
                    Buy more oranges.
                </Text>
            </BottomSheetScrollView>
            <View style={[styles.footer, { paddingBottom: bottom }]}>
                <View style={styles.footerBtn}>
                    <TouchableOpacity style={defaultStyles.btn}>
                        <Text style={defaultStyles.btnText}>Purchase lifetime access</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerBtn}>
                    <TouchableOpacity style={defaultStyles.btn}>
                        <Text style={defaultStyles.btnText}>Preview</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.footerText}>Preview ends after 24 hours.</Text>
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