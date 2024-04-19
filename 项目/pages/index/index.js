// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  wechatLogin() {
    //检查登录态是否过期
    uni.checkSession({
      provider: 'weixin',
      success: function(loginRes) {
        console.log('checkSession成功',loginRes);
      },
      fail: function(loginRes) {
        console.log('checkSession失败',loginRes);
      },
    });
    
    //重新登录
    let jsCode = ''
    uni.login({
      provider: 'weixin',
      success: function(loginRes) {
        jsCode = loginRes.code;
        console.log('login重新登录',{
          jscode: loginRes.code,
          jscodeinfo:res
        });
      },
      fail: function(loginRes) {
        console.log(loginRes)
      }
    });
    
    // 获取用户信息
    uni.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: res => {
        console.log('获取你的昵称、头像',res);
        // 登录请求
        // api.apiPost("/api/member/wechatappauth", {
        // 	jscode: jsCode,
        // 	jscodeinfo:res
        // }, (res1) => {
        // 	console.log(res1)
        // 	if (res1.code == 0) {
        // 	} else {
        // 		uni.showModal({
        // 			title: '登录失败',
        // 			content: '请刷新小程序后重新操作',
        // 		});
        // 	}
        // })
      },
      fail: res => {
        console.log(2);
        console.log(res)
        //拒绝授权
        uni.showToast({
          title: '您拒绝了请求,不能正常使用小程序',
          icon: 'error',
          duration: 2000
        });
        return;
      }
    });
  },
  login() {
    uni.getUserProfile({
      desc: '你的授权信息',
      success: (res) => {
        // 将信息存到 vuex 中
        this.updateUserInfo(res.userInfo)
        this.getToken(res)
      },
      fail: (res) => {
        return uni.$showMsg('您取消了登录授权')
      }
    })//在methods节点中定义login
},

  
})
