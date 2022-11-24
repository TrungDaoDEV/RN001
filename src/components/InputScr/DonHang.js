/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  urlAPI,
  getDataIn,
  LOAD_DONHANG,
  UPDATE_MAYDET,
  INSERT_CHITIETDET,
} from '../../common/config';
import styleCommon from '../../theme/styleCommon';
import axios from 'axios';

export default function DonHang(props) {
  const {navigation, route} = props;
  const {InputSL, idMD, Ngay} = route.params;
  const [idKH, setIdKH] = useState('');
  const [tenKH, setTenKH] = useState('');
  const [idDH, setIdDH] = useState('');
  const [ngayDat, setNgayDat] = useState('');
  const [idHH, setIdHH] = useState('');
  const [idCTDH, setIdCTDH] = useState('');
  const [tenHH, setTenHH] = useState('');
  const [mau, setMau] = useState('');
  const [sl_Det, setSL_Det] = useState(0);
  //xuất ra màn hình
  const [dataDonHang, setDataDonHang] = useState([]);
  const {button1} = styleCommon;

  console.log('first ' + InputSL + '  idMD : ' + idMD + ' Ngày: ' + Ngay);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataIn(LOAD_DONHANG, setDataDonHang);
    });
    return () => {};
  }, []);
  const handleSelectDonHang = ({
    idKH,
    TenKH,
    idDH,
    NgayDat,
    idCTDH,
    Mau,
    SL_Dat,
    idHH,
    TenHH,
    SL_Det,
  }) => {
    setIdKH(idKH);
    setTenKH(TenKH);
    setIdDH(idDH);
    setNgayDat(NgayDat);
    setIdCTDH(idCTDH);
    setMau(Mau);
    setIdHH(idHH);
    setTenHH(TenHH);
    setSL_Det(SL_Det);
  };
  const handleSelectMayChay = SL_Det => {
    //lưu maydet.ChayVo và tạo mới chitietdet
    var url = urlAPI + UPDATE_MAYDET;
    axios
      .post(url, {
        idMD: idMD,
        ChayVo: idCTDH,
      })
      .then(res => {
        console.log('update chayVo');
      })
      .catch(err => console.log(err));
    SL_Det === '' || SL_Det === null
      ? ((url = urlAPI + INSERT_CHITIETDET),
        axios
          .post(url, {
            idMD: idMD,
            idCTDH: idCTDH,
            NgayDet: Ngay,
            SL_Ngay: 0,
            SL_TC: 0,
            SL_Dem: 0,
          })
          .then(res => {
            console.log('insert chi tiet det ban dau !!!');
          })
          .catch(err => console.log(err)))
      : '';

    navigation.popToTop();
  };

  const renderItems = ({item, index}) => {
    const {TenKH, NgayDat, TenHH, Mau, SL_Dat, SL_Det} = item;
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelectDonHang(item);
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{TenKH}</Text>
          <Text>{NgayDat}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{fontSize: 18}}>{TenHH}</Text>
          <Text>{Mau}</Text>
          <Text>
            Dệt {SL_Det}/{SL_Dat} Đặt
          </Text>
        </View>
        <View style={{borderBottomWidth: 1}} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text>Khách Hàng: {tenKH}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectKH', {
                setIdKH: setIdKH,
                setTenKH: setTenKH,
                setIdDH: setIdDH,
                setIdCTDH: setIdCTDH,
              });
            }}>
            <Text>Chọn KH</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <Text>Ngày đặt: {idDH === '' ? null : ngayDat}</Text>
          <TouchableOpacity
            onPress={() => {
              tenKH === ''
                ? alert('Nhập Khách hàng vào trước!')
                : navigation.navigate('SelectDH', {
                    idKH: idKH,
                    tenKH: tenKH,
                    setIdDH: setIdDH,
                    setNgayDat: setNgayDat,
                    setIdCTDH: setIdCTDH,
                    setTenHH: setTenHH,
                    setMau: setMau,
                  });
            }}>
            <Text>Chọn Đơn hàng</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'row', justifyContent: 'center', margin: 5}}>
          {InputSL ? (
            <View>
              <Text>idCTDH: {idCTDH === '' ? null : idCTDH}</Text>
              <Text>Vớ: {idCTDH === '' ? null : tenHH}</Text>
              <Text>Màu: {idCTDH === '' ? null : mau}</Text>
              <Text>SL Dệt: {idCTDH === '' ? null : sl_Det}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              ngayDat === ''
                ? alert('Chọn đơn hàng - Ngày đặt trước!')
                : navigation.navigate('SelectCTDH', {
                    idDH: idDH,
                    idKH: idKH,
                    tenKH: tenKH,
                    idCTDH: idCTDH,
                    setIdHH: setIdHH,
                    setIdCTDH: setIdCTDH,
                    setTenHH: setTenHH,
                    setMau: setMau,
                    setSL_Det: setSL_Det,
                  });
            }}>
            <Text>Chi Tiết ĐH</Text>
          </TouchableOpacity>
        </View>
        {InputSL ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={button1}>
              <Text>Quay lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleSelectMayChay(sl_Det);
              }}
              style={button1}>
              <Text>Chọn</Text>
            </TouchableOpacity>
          </View>
        ) : (
          ''
        )}
        <View style={{borderColor: 'black', borderBottomWidth: 1}} />
        <View style={{flex: 1}}>
          <FlatList
            data={dataDonHang}
            renderItem={item => renderItems(item)}
            keyExtractor={item => item.idCTDH}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}