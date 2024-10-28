export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小，根据你的设计稿大小调整
      propList: ['*'], // 可以转化的属性列表，* 表示所有属性
      unitPrecision: 5, // 转换后的精度，即小数点位数
      mediaQuery: false, // 不转换媒体查询中的 px
      minPixelValue: 1, // 小于 1px 不转换
    },
  },
}
