/* eslint-disable react-native/no-inline-styles */
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import {urlAPI, getDataIn, LOAD_MAYCHAY} from '../common/config';
import StyleCommon from '../theme/styleCommon';

const LOAD_TTMAY = LOAD_MAYCHAY;

export default function Home({navigation}) {
  const [dataMaydet, setDataMaydet] = useState([]);
  const {text, bao, active, inactive} = StyleCommon;
  // const [time_D1M1, setTime_D1M1] = useState(new Date());

  useEffect(() => {
    // const socket = io(urlAPI, { jsonp: false });
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
    return () => {
      socket.close();
    };
  }, []);
  const getCurrentTime = () => {
    var dt = new Date();
    return dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds(); //format: d-m-y;
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{flex: 2}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={text}>{item.May}</Text>
            {/* <Text style={{}}>{item.Trangthai}</Text> */}
            {item.Trangthai === 1 ? (
              <Text style={{}}>
                {item.time_off} / {getCurrentTime()}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text>
              ON: {item.run}/{item.stop}: OFF
            </Text>
          </View>
        </View>
        <View style={[bao, item.Trangthai ? active : inactive]}>
          <Text style={text}>{item.Trangthai ? 'OFF' : 'ON'}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={dataMaydet}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        // extraData={dataMaydet}
      />
    </SafeAreaView>
  );
}
