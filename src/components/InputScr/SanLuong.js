/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {urlAPI, LOAD_SANLUONG, getDataIn} from '../../common/config';

export default function SanLuong(props) {
  const [dataIn, setDataIn] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      getDataIn(LOAD_SANLUONG, setDataIn);
      console.log('SANLUONG - addlistener');
    });
    setDate(getCurrentDate());
    return () => {};
  }, []);

  const handleNgay = () => {
    setDate(getCurrentDate());
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const getCurrentDate = () => {
    var dt = new Date();
    var hour = dt.getHours();

    hour < 12
      ? (dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 1))
      : dt;
    // You can turn it in to your desired format
    return dt; //format: d-m-y;
  };
  const handleRefresh = () => {
    setDataIn([]);
    getDataIn(LOAD_SANLUONG, setDataIn);
    console.log('handle refresh: ');
  };
  const renderItems = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <TouchableOpacity
            style={{flex: 1, margin: 5}}
            onPress={() => {
              props.navigation.navigate('NhapSanLuong', {
                idMD: item.idMD,
                May: item.May,
                TenHH: item.TenHH,
                Mau: item.Mau,
                idCTDH: item.idCTDH,
                ChayVo: item.ChayVo,
                setDataIn: setDataIn,
                Ngay: `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`,
              });
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.title}>{item.May}</Text>
              {/* <Text style={styles.txt}>So May Chay: {item.SoMayChay}</Text>
              <Text style={styles.txt}>So Ngay Det: {item.SoNgayDet}</Text> */}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={styles.txt}>{item.TenHH}</Text>
              <Text style={styles.txt}>{item.Mau}</Text>
              <Text style={styles.txt}>
                {item.TongDet}/{item.SL_Dat}
              </Text>
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={styles.txt}>Ngay: {item.SL_Ngay}</Text>
              <Text style={styles.txt}>TC: {item.SL_TC}</Text>
              <Text style={styles.txt}>Đêm: {item.SL_Dem}</Text>
            </View> */}
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>Ngày Nhập: {date.toLocaleDateString()}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Chọn Ngày:</Text>
          <TouchableOpacity
            onPress={() => {
              handleNgay();
            }}
          />
          {/* <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            // is24Hour={true}
            onChange={onChange}
            style={{width: 100, margin: 3}}
          /> */}
        </View>
      </View>
      <View style={{borderBottomWidth: 1, borderBottomColor: 'powderblue'}} />
      <FlatList
        style={{flex: 1}}
        data={dataIn}
        renderItem={renderItems}
        keyExtractor={item => item.idMD}
        extraData={dataIn}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
