// pages/pos/pos.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:defaultAvatarUrl,
    show:false,
    avatarUrls:''
  },
  onButton1Click: function() {
    const query = wx.createSelectorQuery();
    query.select('#button2').boundingClientRect();
    query.exec((res) => {
      const button2 = res[0];
      if (button2) {
        wx.pageScrollTo({
          scrollTop: button2.top,
          duration: 300
        });
        setTimeout(() => {
          wx.createSelectorQuery().select('#button2').trigger('tap');
        }, 300);
      }
    });
  },

  onButton2Click: function() {
    wx.showToast({
      title: '按钮2被点击了！',
      icon: 'none'
    });
  },
  /////////////////////////////////////////////////////////////////////////////////////////
  onGetUserInfo: function (e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      // 用户同意授权，可以获取到用户信息和头像
      const userInfo = e.detail.userInfo;
      const avatarUrl = userInfo.avatarUrl;
      console.log('用户头像URL:', avatarUrl);
      // 在这里可以将头像URL保存到本地或者上传到服务器
    } else {
      // 用户拒绝授权，可以根据需要进行处理
      console.log('用户拒绝授权');
    }
  },
//////////////////////////////////////////////////////////////////////////////////////////////////
  showModal: function() {
    wx.showModal({
      title: '提示', // 弹出层的标题
      content: '这是一个弹出层的内容', // 弹出层的内容
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击了确定按钮');
          // 在这里处理用户点击确定按钮的逻辑
        } else if (res.cancel) {
          console.log('用户点击了取消按钮');
          // 在这里处理用户点击取消按钮的逻辑
        }
      }
    });
  },
//获取微信头像
chooseavatar(e){
//  console.log(e)
 const{avatarUrl}=e.detail
 this.setData({
   avatarUrl,
 })
},
// showPopup() {
//   this.setData({ show: true });
// },

onClose() {
  this.setData({ show: false });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
this.setData({show:true})

wx.showModal({
  title: '是否获取头像', // 弹出层的标题
  content: '这是一个弹出层的内容', // 弹出层的内容
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击了确定按钮');
      // 在这里处理用户点击确定按钮的逻辑
      // this.chooseavatar
    } else if (res.cancel) {
      console.log('用户点击了取消按钮');
      // 在这里处理用户点击取消按钮的逻辑
    }
  }
});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  getUserInfo: function(e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  } 
})
