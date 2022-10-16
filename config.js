const axios = require("axios")

//公众号配置
//公众号appid
const app_id = "wx6c5580a57d5ca95d"
//公众号appSecret
const app_secret = "d427ad547117c8783cca953cc377511f"
//模板消息id
const template_id = "oSb4Zo4RtODh0o9YXwIlI3hsrOOvb5ON9ytVqTmY8WE"
//这是openid
const openid = ["o7Mys6fFvDC2h73Cu_UU6hCReCWo", "o7Mys6YG9T6tsXloAskEAwOL6vRQ"]


//基本信息配置
const province = "安徽"
const city = "宿州"
const birthday = "2005-6-27"
const loveday = "2021-8-10"
//课表 从周日开始
const classes = [
  [['自习', '都是自习', '好好自习 ', '不要玩手机', '晚上还有语文晚自习', ' ', ' ', ' ', '语文晚自习'],
     ['英', '语', '物', '生', '数', '数', '化', ' ', '生物晚自习'],
     ['语', '数', '化', '体', '英', '英', '物', '物', '英语晚自习'],
     ['英', '语', '数', '化', '物', '生', ' ', ' ', '化学晚自习'],
     ['语', '英', '物', '语', '数', '数', '化', '生', '数学晚自习'],
     ['语', '数', '英', '体', '化', '生', '物', ' ',  '物理晚自习'],
     ['数', '英', '生', '物', '语', '化', ' ', ' ', '自习']],

    [['自习', '都是自习', '好好自习 ', '不要玩手机', '晚上还有语文晚自习', ' ', ' ', ' ', '语文晚自习'],
     ['英', '语', '物', '生', '数', '数', '化', ' ', '生物晚自习'],
     ['语', '数', '化', '体', '英', '英', '物', '物', '英语晚自习'],
     ['英', '语', '数', '化', '物', '生', ' ', ' ', '化学晚自习'],
     ['语', '英', '物', '语', '数', '数', '化', '生', '数学晚自习'],
     ['语', '数', '英', '体', '化', '生', '物', ' ',  '物理晚自习'],
     ['数', '英', '生', '物', '语', '化', ' ', ' ', '自习']
    ]
]

//axios实例
axios.create({
    timeout: 5000
})

module.exports = {
    app_id,
    app_secret,
    template_id,
    openid,
    province,
    city,
    birthday,
    loveday,
    classes,
    axios
}