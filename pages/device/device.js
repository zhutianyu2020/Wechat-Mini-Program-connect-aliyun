// pages/device/device.js
var message=""
var mqtt = require('../../utils/mqtt.min.js') //根据自己存放的路径修改
const crypto = require('../../utils/hex_hmac_sha1.js'); //根据自己存放的路径修改
Page({

  data: {
      type:"ZC51-4HB",
      date:"2021-5-8",
      time:"5h-47m-35s",
      
      temperature:"获取失败，请检查设备是否连接",
      humidity:"获取失败，请检查设备是否连接",
      PH:"获取失败，请检查设备是否连接",
  },

 //开源代码 
  onLoad: function () {
  	//注意：这里在程序运行后会直接进行连接，如果你要真机调试，记得关掉模拟器或者使用一个按钮来控制连接，以避免模拟器和真机同时进行连接导致两边都频繁断线重连！
    this.doConnect()
  },
  doConnect(){
    var _this=this;
    const deviceConfig = {
      productKey: "a1yOBJ8EEEQ",
      deviceName: "device2",
      deviceSecret: "7528df9720a4933d56f640da58b9b216",
      regionId: "cn-shanghai"//根据自己的区域替换
    };
    const options = this.initMqttOptions(deviceConfig);
    console.log(options)
    //替换productKey为你自己的产品的（注意这里是wxs，不是wss，否则你可能会碰到ws不是构造函数的错误）
    const client = mqtt.connect('wxs://a1yOBJ8EEEQ.iot-as-mqtt.cn-shanghai.aliyuncs.com',options)
    client.on('connect', function () {
      console.log('连接服务器成功')
      //注意：订阅主题，替换productKey和deviceName(这里的主题可能会不一样，具体请查看控制台-产品详情-Topic 类列表下的可订阅主题)
      client.subscribe('/a1yOBJ8EEEQ/device2/user/get', function (err) {
        if (!err) {
           console.log('订阅成功！');
        }
      })
    })
	//接收消息监听
    client.on('message', function (topic, message) {
      // message is Buffer
      message=message.toString();
      // 接收 自己编写
      message=message.replace("{","");
      message=message.replace("}","");

      var temp=[];
      temp=message.split(",");
      var temp_temperature=temp[3].lastIndexOf(":"); //温度
      var temp_humiditye=temp[2].lastIndexOf(":"); //湿度
      var temp_PH=temp[4].lastIndexOf(":"); //ph
      _this.setData({
        temperature:temp[3].substring(temp_temperature+1)+" °C",
        humidity:temp[2].substring(temp_humiditye+1)+" %RH",
        PH:temp[4].substring(temp_PH+1),
      })

      //结束
      let msg = message.toString();
      console.log('收到消息：'+msg);
     //关闭连接 client.end()
    })
  },
  //IoT平台mqtt连接参数初始化
 initMqttOptions(deviceConfig) {

    const params = {
      productKey: deviceConfig.productKey,
      deviceName: deviceConfig.deviceName,
      timestamp: Date.now(),
      clientId: Math.random().toString(36).substr(2),
    }
    //CONNECT参数
    const options = {
      keepalive: 60, //60s
      clean: true, //cleanSession不保持持久会话
      protocolVersion: 4 //MQTT v3.1.1
    }
    //1.生成clientId，username，password
    options.password = this.signHmacSha1(params, deviceConfig.deviceSecret);
    options.clientId = `${params.clientId}|securemode=2,signmethod=hmacsha1,timestamp=${params.timestamp}|`;
    options.username = `${params.deviceName}&${params.productKey}`;

    return options;
  },

/*
  生成基于HmacSha1的password
  参考文档：https://help.aliyun.com/document_detail/73742.html?#h2-url-1
*/
 signHmacSha1(params, deviceSecret) {

    let keys = Object.keys(params).sort();
    // 按字典序排序
    keys = keys.sort();
    const list = [];
    keys.map((key) => {
      list.push(`${key}${params[key]}`);
    });
    const contentStr = list.join('');
    return crypto.hex_hmac_sha1(deviceSecret, contentStr);
  },
})
