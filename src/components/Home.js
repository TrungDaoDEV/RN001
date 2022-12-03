/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  FlatList,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {urlAPI, getDataIn, LOAD_MAYCHAY} from '../common/config';
import StyleCommon from '../theme/styleCommon';

const LOAD_TTMAY = LOAD_MAYCHAY;

export default function Home({navigation}) {
  const [dataMaydet, setDataMaydet] = useState([]);
  const {
    centeredView,
    modalView,
    modalText,
    headerTXT,
    text,
    bao,
    h2,
    txt,
    active,
    inactive,
  } = StyleCommon;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemMayDet, setItemMayDet] = useState(0);

  useEffect(() => {
    const socket = io(urlAPI, {transports: ['websocket']});
    socket.on('Server-send-TTM', function (items) {
      console.log(
        ' SOCKET IO May : ' +
          items.M +
          ' SL: ' +
          items.SL +
          ' chay: ' +
          items.TT,
      );
      getDataIn(LOAD_TTMAY, setDataMaydet);
    });
    // const unsubscribe = navigation.addListener('focus', () => {
    getDataIn(LOAD_TTMAY, setDataMaydet);
    // });
    return () => {
      socket.close();
    };
  }, []);
  const getCurrentTime = () => {
    var dt = new Date();
    return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds(); //format: d-m-y;
  };
  const renderCTMCodesModal = () => {
    if (dataMaydet.length === 0) {
      return;
    }
    const {May, SL, time_off, run, stop, Trangthai} = dataMaydet[itemMayDet];
    return (
      <View style={centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={centeredView}>
              <View style={modalView}>
                {Trangthai ? (
                  <Text style={[modalText, {marginBottom: 10, color: 'red'}]}>
                    Máy {May}
                  </Text>
                ) : (
                  <Text style={[modalText, {marginBottom: 10, color: 'green'}]}>
                    Máy {May}
                  </Text>
                )}
                <View style={{justifyContent: 'space-around'}}>
                  {Trangthai ? (
                    <Text style={txt}>Giờ Đứng: {time_off}</Text>
                  ) : null}
                  <Text style={txt}>Tổng TG Đứng: {stop}</Text>
                  <Text style={txt}>Tổng TG Chạy: {run}</Text>
                  <Text style={txt}>Tổng SL: {SL}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setItemMayDet(index);
        }}
        style={[bao, item.Trangthai ? active : inactive, {flex: 1 / 3}]}>
        <Text style={text}>{item.May}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={headerTXT}>TÌNH TRẠNG MÁY</Text>
        {/* <Text>Tổng Máy đang đứng: </Text>
        <Text>Tổng Thời gian đứng: </Text>
        <Text>Tổng Sản lượng Ca: </Text> */}
      </View>
      <View style={{borderBottomWidth: 1, marginVertical: 10}} />
      <FlatList
        data={dataMaydet}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        // extraData={dataMaydet}
      />
      {renderCTMCodesModal()}
    </SafeAreaView>
  );
}
