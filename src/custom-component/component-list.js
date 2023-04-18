// 公共样式
export const commonStyle = {
    rotate: 0,
    opacity: 1,
}

export const commonAttr = {
    animations: [],
    events: {},
    groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
    isLock: false, // 是否锁定组件
    collapseName: 'style', // 编辑组件时记录当前使用的是哪个折叠面板，再次回来时恢复上次打开的折叠面板，优化用户体验
    linkage: {
        duration: 0, // 过渡持续时间
        data: [ // 组件联动
            {
                id: '', // 联动的组件 id
                label: '', // 联动的组件名称
                event: '', // 监听事件
                style: [{ key: '', value: '' }], // 监听的事件触发时，需要改变的属性
            },
        ],
    },
}

// 组件列表分类
export const types = [
    {
        key: '1',
        label: '基础组件',
    },
    {
        key: '2',
        label: '表单组件',
    },
    {
        key: '3',
        label: '特殊组件',
    },
]

// 编辑器左侧组件列表
export const componentList = [
    {
        component: 'VText',
        label: '文字',
        propValue: '双击编辑文字',
        icon: 'wenben',
        type: '1',
        request: {
            method: 'GET',
            data: [],
            url: '',
            series: false, // 是否定时发送请求
            time: 1000, // 定时更新时间
            paramType: '', // string object array
            requestCount: 0, // 请求次数限制，0 为无限
        },
        style: {
            width: 92,
            height: 28,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
        index: 0,
    },
    {
        component: 'VButton',
        label: '按钮',
        propValue: '按钮',
        icon: 'button',
        type: '1',
        style: {
            width: 100,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
        index: 1,
    },
    {
        component: 'VInput',
        label: '文本框',
        propValue: {
            content: '',
            placeholder: '请输入占位符',
        },
        icon: 'shurukuang',
        type: '2',
        style: {
            width: 180,
            height: 34,
            borderWidth: 1,
            borderColor: '',
            borderRadius: '',
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
        index: 2,
    },
    {
        component: 'Picture',
        label: '图片',
        icon: 'tupian',
        type: '1',
        propValue: {
            url: require('@/assets/title.jpg'),
            flip: {
                horizontal: false,
                vertical: false,
            },
        },
        style: {
            width: 300,
            height: 200,
            borderRadius: '',
        },
        index: 3,
    },
    {
        component: 'RectShape',
        label: '边框',
        propValue: '&nbsp;',
        icon: 'juxing',
        type: '1',
        style: {
            width: 200,
            height: 200,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            borderWidth: 1,
            backgroundColor: '',
            borderStyle: 'solid',
            borderRadius: '',
            verticalAlign: 'middle',
        },
        index: 4,
    },
    {
        component: 'LineShape',
        label: '分割线',
        propValue: '',
        icon: 'zhixian',
        type: '1',
        style: {
            width: 200,
            height: 2,
            backgroundColor: '#000',
        },
        index: 5,
    },
    {
        component: 'CircleShape',
        label: '圆形',
        propValue: '&nbsp;',
        icon: '24gl-circle',
        type: '3',
        style: {
            width: 200,
            height: 200,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            borderWidth: 1,
            backgroundColor: '',
            borderStyle: 'solid',
            borderRadius: '',
            verticalAlign: 'middle',
        },
        index: 6,
    },
    {
        component: 'SVGStar',
        label: '星形',
        icon: 'kongwujiaoxing',
        propValue: '',
        type: '3',
        style: {
            width: 80,
            height: 80,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        index: 7,
    },
    {
        component: 'SVGTriangle',
        label: '三角形',
        icon: 'xingzhuang-sanjiaoxing',
        propValue: '',
        type: '3',
        style: {
            width: 80,
            height: 80,
            fontSize: '',
            fontWeight: 400,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: 'center',
            color: '',
            borderColor: '#000',
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        index: 8,
    },
    {
        component: 'VTable',
        label: '表格',
        icon: 'biaoge',
        type: '1',
        propValue: {
            data: [
                ['表头1', '表头2', '表头3'],
                ['内容1', '内容2', '内容3'],
            ],
            stripe: true,
            thBold: true,
        },
        request: {
            method: 'GET',
            data: [],
            url: '',
            series: false,
            time: 1000,
            paramType: '', // string object array
            requestCount: 0, // 请求次数限制，0 为无限
        },
        style: {
            width: 600,
            height: 200,
            fontSize: '',
            fontWeight: 400,
            textAlign: 'center',
            color: '',
            backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        index: 9,
    },
    {
        component: 'VChart',
        label: '图表',
        icon: 'el-icon-data-analysis',
        type: '1',
        propValue: {
            chart: 'VChart',
            option: {
                title: {
                    text: '柱状图',
                    show: true,
                },
                legend: {
                    show: true,
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                },
                xAxis: {
                    show: true,
                    data: ['A', 'B', 'C', 'D', 'E'],
                },
                yAxis: {},
                series: {
                    type: 'bar',
                    name: '销量',
                    data: [23, 61, 35, 77, 35],
                    itemStyle: {
                        barBorderRadius: 5,
                        borderWidth: 1,
                        borderType: 'solid',
                        borderColor: '#73c0de',
                        shadowColor: '#5470c6',
                        shadowBlur: 3,
                    },
                },
            },
        },
        style: {
            width: 800,
            height: 500,
            borderRadius: '',
        },
        index: 10,
    },
    {
        component: 'VSwitch',
        label: '开关',
        propValue: {
            status: true,
            offText: '关',
            onText: '开',
        },
        icon: 'switch',
        type: '2',
        style: {
            width: 90,
            height: 20,
        },
        index: 11,
    },
    {
        component: 'VRadio',
        label: '单选框',
        propValue: {},
        icon: 'radio',
        type: '2',
        style: {},
        index: 12,
    },
    {
        component: 'VCheckbox',
        label: '复选框',
        propValue: {},
        icon: 'check-box',
        type: '2',
        style: {},
        index: 13,
    },
    {
        component: 'VSelect',
        label: '选择器',
        propValue: {},
        icon: 'select',
        type: '2',
        style: {},
        index: 14,
    },
]

for (let i = 0, len = componentList.length; i < len; i++) {
    const item = componentList[i]
    item.style = { ...commonStyle, ...item.style }
    componentList[i] = { ...commonAttr, ...item }
}
