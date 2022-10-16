const config = require('./config.js')
const {cityInfo} = require("./city");
const moment = require('moment')


//获取微信的accessToken
const get_access_token = () => {
    return new Promise(resolve => {
        let app_id = config.app_id
        let app_secret = config.app_secret
        config.axios.post(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app_id}&secret=${app_secret}`)
            .then(res => {
                //获取成功
                let token = res.data.access_token;
                resolve(token);
            })
    })

}

//获取城市天气
const get_weather = (province, city) => {
    return new Promise(resolve => {
        //城市id
        const city_id = cityInfo[province][city].AREAID
        //毫秒级时间戳
        const t = Date.now();
        const url = `http://d1.weather.com.cn/dingzhi/${city_id}.html?_=${t}`

        config.axios.get(url, {
            headers: {
                "Referer": `http://www.weather.com.cn/weather1d/${city_id}.shtml`,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            }
        }).then(res => {
            let data = res.data.split(';')[0].split('=').slice(-1);
            data = JSON.parse(data)
            let weatherinfo = data.weatherinfo
            //信息包装
            let dataObj = {
                weather: weatherinfo.weather,
                temp: weatherinfo.temp,
                tempn: weatherinfo.tempn
            }
            resolve(dataObj);
        })

    })

}

//生日和在一起时间处理
const time_format = () => {
    let birthday = moment(config.birthday, 'YYYY-M-D')
    let loveday = moment(config.loveday, 'YYYY-M-D')
    let now = moment()
    birthday.set('year', moment().year())

    //生日已经过去 则年份+1
    if (now > birthday) {
        birthday.set('year', moment().year() + 1)
    }

    let loveday_gap = now.diff(loveday, 'days');
    let birthday_gap = -now.diff(birthday, "days")

    return {loveday_gap, birthday_gap}
}

//发送信息
const send_msg = async (dataObj) => {
    //读取配置
    let user = config.openid;
    let classes = config.classes

    let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //获取处理过的生日和在一起时间
    let timeObj = time_format()
    let url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${dataObj.token}`
    //数据包装
    dataObj = {
        ...dataObj, ...timeObj
    }
    //数据发送
    for (let i = 0; i < user.length; i++) {
        let theClass = classes[i][moment().weekday()]
        let theuser = user[i]
        console.log(theuser)
        let data = {
            "touser": theuser,
            "template_id": config.template_id,
            "url": "http://weixin.qq.com/download",
            "topcolor": "#FF0000",
            "data": {
                "date": {
                    "value": `${moment().format('YYYY-MM-DD')} ${weeks[moment().weekday()]}`,
                    "color": "#00FFFF"
                },
                "city": {
                    "value": config.city,
                    "color": "#808A87"
                },
                "weather": {
                    "value": dataObj.weather,
                    "color": "#ED9121"
                },
                "min_temperature": {
                    "value": dataObj.tempn,
                    "color": "#00FF00"
                },
                "max_temperature": {
                    "value": dataObj.temp,
                    "color": "#FF6100"
                },
                "love_day": {
                    "value": dataObj.loveday_gap,
                    "color": "#87CEEB"
                },
                "birthday": {
                    "value": dataObj.birthday_gap,
                    "color": "#FF8000"
                },
                "firstClass": {
                    "value": theClass[0],
                    "color": "#FF8000"
                },
                "secondClass": {
                    "value": theClass[1],
                    "color": "#FF8000"
                },
                "thirdClass": {
                    "value": theClass[2],
                    "color": "#FF8000"
                },
                "fourthClass": {
                    "value": theClass[3],
                    "color": "#FF8000"
                },
                "fifthClass": {
                    "value": theClass[4],
                    "color": "#FF8000"
                },
                "sixthClass": {
                   "value": theClass[5],
                   "color":"#FF8000"
                },
                "seventhClass": {
                   "value": theClass[6],
                   "color": "#FF8000"
                },
                "eighthCLass": {
                    "value": theClass[7],
                    "color": "#FF8000"
                },
                "ninthCLass":{
                    "value": theClass[8],
                    "color": "#FF8000"
                }
            }
        }
        let headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }

        let res = await config.axios.post(url, data, {headers})
        console.log(res.data)
    }
}


(
    async function () {
        let province = config.province;
        let city = config.city;

        let token = await get_access_token()
        let weather = await get_weather(province, city)

        let dataObj = {
            token,
            ...weather
        }
        await send_msg(dataObj)
    }
)()

