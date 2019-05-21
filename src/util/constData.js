export default {
  stationList: [
    { value: 'xiwan', label: '西万路加油站' },
    { value: 'ximen', label: '西门加油站' },
    { value: 'mingdemen', label: '明德门加油站' },
    { value: 'zhuhong', label: '朱宏路加油站' },
    { value: 'fengchengshilu', label: '凤城十路加油站' },
    { value: 'caotan', label: '草滩路加油站' }
  ],
  stationEventList: [
    { value: 'all', label: '全部' },
    { value: 'xiwan', label: '西万路加油站' },
    { value: 'ximen', label: '西门加油站' },
    { value: 'mingdemen', label: '明德门加油站' },
    { value: 'zhuhong', label: '朱宏路加油站' },
    { value: 'fengchengshilu', label: '凤城十路加油站' },
    { value: 'caotan', label: '草滩路加油站' }
  ],
  stationList2: {
    'xiwan': '西万路加油站',
    'ximen': '西门加油站',
    'mingdemen': '明德门加油站',
    'zhuhong': '朱宏路加油站',
    'fengchengshilu': '凤城十路加油站',
    'caotan': '草滩路加油站'
  },
  unloadActionList: [
    { value: '0', label: '全部' },
    { value: '1', label: '卸油口开启' },
    { value: '2', label: '接油管操作' },
    { value: '3', label: '油罐车到达' },
    { value: '4', label: '油罐车离开' },
    { value: '5', label: '卸油口关闭' },
    { value: '6', label: '断开静电夹' },
    { value: '7', label: '连接静电夹' },
    { value: '8', label: '员工离开' },
    { value: '9', label: '存在灭火器' },
    { value: '10', label: '油井巡检' },
    { value: '11', label: '水溶法检测操作' },
    { value: '12', label: '卸油口巡检' },
    { value: '13', label: '已放置消防器材' },
    { value: '14', label: '水溶法检测操作' },
    { value: '15', label: '非法入侵' }
  ],
  safeBoxActionList: [
    { value: '0', label: '全部' },
    { value: '1', label: '开启保险柜' },
    { value: '2', label: '关闭保险柜' },
    { value: '3', label: '保险柜打开' },
    { value: '4', label: '开启钱箱' }
  ],
  oilActionList: [
    { value: '0', label: '全部' },
    { value: '1', label: '服务不规范' },
    { value: '2', label: '油井巡检' },
    { value: '3', label: '巡检' },
    { value: '4', label: '未引导' },
    { value: '5', label: '未回零' },
    { value: '6', label: '胶管乱摆放' }
  ],
  checkoutActionList: [
    { value: '0', label: '全部' },
    { value: '1', label: '单手' },
    { value: '2', label: '双手接递' },
    { value: '3', label: '服务超时' }
  ],
  levelList: [
    { value: '0', label: '全部' },
    { value: '1', label: '合规' },
    { value: '2', label: '轻度违规' },
    { value: '3', label: '中度违规' },
    { value: '4', label: '重度违规' }
  ],
  levelList2: {
    '1': '合规',
    '2': '轻度违规',
    '3': '中度违规',
    '4': '重度违规'
  },
  xAxisData: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
  legendData: ['西万站', '西门站', '明德门站'], // 图例
  stationData: [
    "xiwan",
    "ximen",
    "mingdemen",
    "fengchengshilu",
    "zhuhong",
    "caotan"
  ],
  actionData: [
    // 卸油口
    "卸油口开启",
    "接油管操作",
    "油罐车到达",
    "油罐车离开",
    "卸油口关闭",
    "断开静电夹",
    "连接静电夹",
    "员工离开",
    "存在灭火器",
    "油井巡检", // 卸油口
    "水溶法检测操作", // 卸油口
    "卸油口巡检",
    "已放置消防器材",
    "胶管乱摆放", //
    "非法入侵", // 卸油口

    // 保险柜
    "开启保险柜",
    "关闭保险柜",
    "保险柜打开",
    "开启钱箱",

    // 加油区
    "服务不规范",
    "油井巡检",
    "巡检",
    "未引导",
    "未回零",

    // 收银台
    "单手",
    "双手接递",
    "服务超时"
  ],
  statusData: [
    "合规",
    "违规"
  ],
  categoryData: [
    "refuel_overview", // 加油区全景
    "refuel_side", // 加油区
    "checkout", // 收银台
    "safebox", //保险柜
    // "switching_room", // 配电房
    "unload" // 卸油口
  ],
  categoryData2: {
    "refuel_overview": "加油区全景",
    "refuel_side": "加油区",
    "checkout": "收银台",
    "safebox": "保险柜",
    // "switching_room": "配电房",
    "unload": "卸油口"
  }
}