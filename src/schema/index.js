import LANG_MAP from './origin'
import { cloneDeep } from 'lodash'

export function getFileCodeTree(componentData, options = {
    lang: 'vue',
}) {
    const MAP = cloneDeep(LANG_MAP[options.lang])
    const { COMPONENT_TREE, FILE_TREE } = MAP
    let compStr = ''
    let dataStr = ''

    if (componentData.find((item) => item == null)) {
        throw new Error('存在空数据，无法出码')
    }
    const len = componentData.length
    for (let i = 0; i < len; i++) {
        const comp = componentData[i]
        let str = COMPONENT_TREE[comp.component] // 通过遍历到的组件的 component 属性，例如 VButton、VText等，保存模板解析树

        // 对组件进行分类处理
        if (comp.component === 'VButton') {
            let suffix = i === len - 1 ? '' : '\n      '
            let res = str.replace(/{{id}}/ig, comp.id).replace(/{{propValue}}/ig, comp.propValue) + suffix
            compStr += res
        }
        if (comp.component === 'VText') {
            let suffix = i === len - 1 ? '' : '\n      '
            let res = str.replace(/{{id}}/ig, comp.id).replace(/{{propValue}}/ig, comp.propValue) + suffix
            compStr += res
        }
        if (comp.component === 'Picture') {
            let suffix = i === len - 1 ? '' : '\n      '
            let res = str.replace(/{{id}}/ig, comp.id).replace(/{{url}}/ig, comp.propValue.url) + suffix
            compStr += res
        }
        if (comp.component === 'VInput') {
            let suffix = i === len - 1 ? '' : '\n      '
            let tmlp = str.replace(/{{id}}/ig, comp.id)
            .replace(/{{placeholder}}/ig, comp.propValue.placeholder) + suffix
            compStr += tmlp

            let dataSuffix = ',\n'
            dataStr += 'inputModel: "' + comp.propValue.content + '"' + dataSuffix
        }
        if (comp.component === 'VSwitch') {
            let suffix = i === len - 1 ? '' : '\n      '
            let tmlp = str.replace(/{{id}}/ig, comp.id)
            .replace(/{{onText}}/ig, comp.propValue.onText)
            .replace(/{{offText}}/ig, comp.propValue.offText) + suffix
            compStr += tmlp

            let dataSuffix = ',\n'
            dataStr += 'switchModel: ' + comp.propValue.status + dataSuffix
        }
        if (comp.component === 'VRadio') {
            let suffix = i === len - 1 ? '' : '\n      '
            let tmlp = str.replace(/{{propId}}/ig, comp.propValue.id)
            .replace(/{{propName}}/ig, comp.propValue.name)
            .replace(/{{propVal}}/ig, comp.propValue.value)
            .replace(/{{propLabel}}/ig, comp.propValue.label) + suffix
            compStr += tmlp

            let dataSuffix = ',\n'
            dataStr += comp.propValue.id + ': ' + comp.propValue.value + dataSuffix
        }
        if (comp.component === 'VCheckbox') {
            let suffix = i === len - 1 ? '' : '\n      '
            let tmlp = str.replace(/{{propId}}/ig, comp.propValue.id)
            .replace(/{{propName}}/ig, comp.propValue.name)
            .replace(/{{propVal}}/ig, comp.propValue.value)
            .replace(/{{propLabel}}/ig, comp.propValue.label) + suffix
            compStr += tmlp

            let dataSuffix = ',\n'
            dataStr += comp.propValue.id + ': "' + comp.propValue.value + '"' + dataSuffix
        }
        if (comp.component === 'VSelect') {
            let suffix = i === len - 1 ? '' : '\n      '
            let tmlp = str.replace(/{{id}}/ig, comp.id)
            .replace(/{{placeholder}}/ig, comp.propValue.placeholder)
            .replace(/{{propVal}}/ig, comp.propValue.value)
            .replace(/{{propData}}/ig, comp.propValue.data) + suffix
            compStr += tmlp

            let dataSuffix = ',\n'
            dataStr += '"data-' + comp.id + '": ["' + comp.propValue.data.join('", "') + '"]' + dataSuffix
        }
    }
    // 拼接模板树
    const res = FILE_TREE.root[0]['App.vue'].replace(/{{Template}}/ig, compStr).replace(/{{Data}}/ig, dataStr)
    FILE_TREE.root[0]['App.vue'] = res

    return FILE_TREE
}