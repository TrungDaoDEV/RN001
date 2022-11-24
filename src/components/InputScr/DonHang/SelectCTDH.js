/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  urlAPI,
  tabs,
  GET_CTDH,
  getDataWithHeader,
  DELETE_CTDH,
  INSERT_CTDH,
  UPDATE_CTDH,
} from '../../../common/config';
import axios from 'axios';

export default function SelectCTDH(props) {
  const {navigation, route} = props;
  const {setIdHH, setMau, setTenHH, idDH, setIdCTDH, idKH, tenKH, setSL_Det} =
    route.params;
  const [dataCTDH, setDataCTDH] = useState([]);
  const [idCTDHag, setIdCTDHag] = useState('');
  const [idDHag, setIdDHag] = useState('');
  const [idHHoa, setIdHHoa] = useState('');
  const [tenHHoa, setTenHHoa] = useState('');
  const [mauHHoa, setMauHHoa] = useState('');
  const [slHHoa, setSLHHoa] = useState('');
  const [slDet, setSLDet] = useState('');
  const header = {idDH: `${idDH}`};

  useEffect(() => {
    getDataWithHeader(GET_CTDH, setDataCTDH, header);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const DayNutBam = tabs.map(tab => {
    return (
      <TouchableOpacity
        key={tab}
        style={{
          flex: 1,
          height: 50,
          backgroundColor: 'gray',
          justifyContent: 'center',
          margin: 5,
          alignItems: 'center',
          borderRadius: 20,
        }}
        onPress={() => {
          switch (tab) {
            case 'Thêm':
              handleThemCTDH();
              break;
            case 'Sửa':
              handleSuaCTDH();
              break;
            case 'Xóa':
              handleXoaCTDH();
              break;
            default:
              handleChonCTDH();
              break;
          }
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>{tab}</Text>
      </TouchableOpacity>
    );
  });
  const handlePrintScr = ({idCTDH, idDH, idHH, TenHH, Mau, SL_Dat, SL_Det}) => {
    setIdCTDHag(idCTDH);
    setIdDHag(idDH);
    setIdHHoa(idHH);
    setTenHHoa(TenHH);
    setMauHHoa(Mau);
    setSLHHoa(SL_Dat);
    setSLDet(SL_Det);
  };
  const handleChonCTDH = () => {
    setIdCTDH(idCTDHag);
    setIdHH(idHHoa);
    setTenHH(tenHHoa);
    setMau(mauHHoa);
    setSL_Det(slDet);
    navigation.goBack();
  };
  const handleThemCTDH = () => {
    var url = urlAPI + INSERT_CTDH;
    idHHoa === '' || mauHHoa === '' || slHHoa === ''
      ? alert('Vui lòng nhập đủ Thông tin !!!')
      : axios
          .post(url, {idDH: idDH, idHH: idHHoa, Mau: mauHHoa, SL_Dat: slHHoa})
          .then(res => {
            getDataWithHeader(GET_CTDH, setDataCTDH, header);
          })
          .catch(err => console.log(err));
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  };
  const handleSuaCTDH = () => {
    var url = urlAPI + UPDATE_CTDH;
    axios
      .post(url, {
        idCTDH: idCTDHag,
        idDH: idDH,
        idHH: idHHoa,
        Mau: mauHHoa,
        SL_Dat: slHHoa,
      })
      .then(res => {
        getDataWithHeader(GET_CTDH, setDataCTDH, header);
      })
      .catch(err => console.log(err));
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  };
  const handleXoaCTDH = () => {
    var url = urlAPI + DELETE_CTDH;
    axios
      .post(url, {idCTDH: idCTDHag, idDH: idDH, idHH: idHHoa, Mau: mauHHoa})
      .then(res => {
        getDataWithHeader(GET_CTDH, setDataCTDH, header);
      })
      .catch(err => console.log(err));
    setIdDHag('');
    setMauHHoa('');
    setSLHHoa('');
    setTenHH('');
  };
  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        onPress={() => {
          handlePrintScr(item);
        }}>
        <Text>{item.idCTDH}</Text>
        <Text>Tên HH: {item.TenHH}</Text>
        <Text>Màu: {item.Mau}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView>
      <Text>SelectCTDH</Text>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text>Tên HH: {tenHHoa}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SelectHH', {
                idKH: idKH,
                tenKH: tenKH,
                setMauHHoa: setMauHHoa,
                setSLHHoa: setSLHHoa,
                setIdHHoa: setIdHHoa,
                setTenHHoa: setTenHHoa,
              });
            }}>
            <Text>Chọn Hàng</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Màu:</Text>
          <TextInput
            placeholder="Màu"
            onChangeText={txt => setMauHHoa(txt)}
            value={mauHHoa}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Dệt {slDet} / SL Đặt: </Text>
          <TextInput
            placeholder="SL Đặt"
            onChangeText={txt => setSLHHoa(txt)}
            value={'' + slHHoa}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {DayNutBam}
      </View>
      <FlatList
        data={dataCTDH}
        renderItem={renderItems}
        keyExtractor={item => item.idCTDH}
      />
    </SafeAreaView>
  );
}
