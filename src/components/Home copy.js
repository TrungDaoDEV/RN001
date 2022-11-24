import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import axios from 'axios';
import { urlAPI, getDataIn } from '../common/config';
import StyleCommon from '../theme/styleCommon';

const LOAD_TTMAY = 'data';

export default function Home({ navigation }) {
  const [dataMaydet, setDataMaydet] = useState([]);
  const { text, bao, active, inactive } = StyleCommon;
  const [time_D1M1, setTime_D1M1] = useState(new Date());

  useEffect(() => {
    // const socket = io(urlAPI, { jsonp: false });
    const socket = io(urlAPI, { transports: ['websocket'] });
    socket.on("Server-send-TTM", function (items) {
      console.log(" SOCKET IO May : " + items.may + " SL: "
        + items.sl + " chay: " + items.chay);
      getDataIn(LOAD_TTMAY, setDataMaydet);
    });
    return () => {
      socket.close();
    }
  }, []);
  const getCurrentTime = () => {
    var dt = new Date();
    return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();//format: d-m-y;
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={text}>{item.May}</Text>
            <Text style={{}}>{item.Trangthai}</Text>
            {
              item.Trangthai === 0 ? (
                <Text style={{}}>{item.TG_OFF} / {getCurrentTime()}</Text>
                // <Text style={{}}>{calculatorTime(item.TG_OFF)}</Text>
              )
                : ''
            }
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text>{item.TenHH}</Text>
            <Text>{item.Mau}</Text>
          </View>
        </View>
        <View
          style={[bao,
            item.Trangthai ? inactive : active]}
        >
          <Text
            style={text}
          >
            {item.Trangthai ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataMaydet}
        renderItem={renderItem}
        keyExtractor={item => item.idMD}
      // extraData={dataMaydet}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})