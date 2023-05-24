const COMPONENT_TREE = {
    VButton: '<button id="{{id}}" class="v-button">{{propValue}}</button>',
    VText: '<span id="{{id}}" class="v-text">{{propValue}}</span>',
    Picture: '<img id="{{id}}" src="{{url}}" />',
    VInput: '<el-input id="{{id}}" v-model="inputModel" placeholder="{{placeholder}}"></el-input>',
    VSwitch: '<el-switch v-model="switchModel" active-text="{{onText}}" inactive-text="{{offText}}"></el-switch>',
    VRadio: '<el-radio v-model="{{propId}}" name="{{propName}}" label="{{propVal}}">{{propLabel}}</el-radio>',
    VCheckbox: '<el-checkbox v-model="{{propId}}" name="{{propName}}" label="{{propVal}}">{{propLabel}}</el-checkbox>',
    VSelect: `<el-select v-model="selectModel" clearable placeholder="{{placeholder}}">
        <el-option v-for="item in data-{{id}}" :key="item" :label="item" :value="item"></el-option>
    </el-select>`,
}

const FILE_TREE = {
    root: [{
        'App.vue': `
      <template>
        {{Template}}
      </template>

      <script>
      export default {
        data() {
            return {
                {{Data}}
            }
        }
      }
      </script>
    `,
    }],
}

const VUE_MAP = {
    COMPONENT_TREE,
    FILE_TREE,
}

export default VUE_MAP