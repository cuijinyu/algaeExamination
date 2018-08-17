const realm = require('realm');

import React from 'react';
import  { ToastAndroid } from 'react-native';

export default class Realm {

    constructor() {
        this.Data = {
            name: 'Data',
            primaryKey: 'id',
            properties: {
                id: 'string',
                name:'string',
                time: 'string',
                camera: 'string',
                place: 'string',
                latitude: 'string',
                longitude: 'string',
                elevation: 'string',
                ecosystems: 'string',
                collections: 'string',
                substrate: 'string',
                temperature: 'string',
                ph: 'string',
                conductivity: 'string',
                salinity: 'string',
                nitrogen: 'string',
                phosphorus: 'string',
                evaluation: 'string',
            }
        };

        this.consor = new realm({schema: [this.Data]});
    }
    addData(param) {
        //新增数据文件
        try {
            let consor = this.consor;
            consor.write(() => {
                this.consor.create('Data', param);
                ToastAndroid.show('添加数据完成', ToastAndroid.SHORT);
            });
        }catch(error){
            ToastAndroid.show('添加数据失败', ToastAndroid.SHORT);
        }
    }

    deleteData(param){
        //删除数据
        try{
            let consor = this.consor;
            consor.write(()=>{
                let datas = consor.objects('Data');
                // console.error(datas);
                let str = 'id contains \"'+param+'\"';
                // console.error(str);
                let data = datas.filtered(str);
                // console.error(data);
                consor.delete(data);
            });
            ToastAndroid.show('删除数据完成', ToastAndroid.SHORT);
        }catch(error){
            ToastAndroid.show('删除数据失败', ToastAndroid.SHORT);
            // console.error(error);
        }
    }

    updateData(param){
        //修改数据
        try{
            let consor = this.consor;
            consor.write(()=>{
                let datas = consor.objects('Data');
                // let str = 'id contains \"'+param+'\"';
                // let data = datas.filtered(str);
                consor.create('Data', param, true);
            });
            ToastAndroid.show('修改成功', ToastAndroid.SHORT);
        }catch(error){
            ToastAndroid.show('修改失败', ToastAndroid.SHORT);
        }
    }

    searchData(param){
        try{
            let consor = this.consor;
            consor.write(()=>{
                datas = consor.objects('Data');
                for(let i in param){
                    let str = i+" contains \""+param[i]+"\"";
                    datas = datas.filtered(str);
                }

            });
            return datas;
        }catch(error){
            ToastAndroid.show('未找到', ToastAndroid.SHORT);
            return null;
        }
    }
}

