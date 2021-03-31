<template>
  <div class="doc" id="doc">
    <!-- Button -->
    <div class="section-doc">
      <div class="title">
        Buttons
      </div>
      <div class="content card-body">
        <div class="doc-block">
          <span class="tips">
            默认样式:
          </span>
          <w-button>default</w-button>
          <span class="tips">
            <code class="code">
              {{"<w-button>default</w-button>"}}
            </code>
          </span>
        </div>
        <div class="doc-block">
          <span class="tips">
            边框:
          </span>
          <w-button class="border-dark">border-dark</w-button>
          <span class="tips">
            <code class="code">
              {{`<w-button class="border-dark">border-dark</w-button>`}}
            </code>
          </span>
          <w-button class="border-dark-lg">border-dark-large</w-button>
          <code class="code">
            {{` <w-button class="border-dark-lg">border-dark-large</w-button>`}}
          </code>
        </div>
        <div class="doc-block">
          <span class="tips">
            颜色：
          </span>
          <w-button class="btn-primary">Primary</w-button>
          <w-button class="btn-secondary">Secondary</w-button>
          <w-button class="btn-tertiary">Tertiary</w-button>
          <w-button class="btn-info">Info</w-button>
          <w-button class="btn-success">Success</w-button>
          <w-button class="btn-warning">Warning</w-button>
          <w-button class="btn-danger">Danger</w-button>
          <span class="code">
            <code>{{` <w-button class="btn-xxx"></w-button>`}} </code>
          </span>
        </div>
        <div class="doc-block">
          <span class="tips">
            大小：
          </span>
          <w-button class="btn-primary" size="small">Small</w-button>
          <w-button class="btn-primary">Normal</w-button>
          <w-button class="btn-primary" size="large">Large</w-button>
          <span class="code">
            <code>{{` <w-button size="xxx"></w-button>`}} </code>
          </span>
        </div>
      </div>
    </div>
    <!-- Button -->
    <!-- CheckBox -->
    <div class="section-doc">
      <div class="title">CheckBox</div>
      <div class="content card-body">
        <span class="tips">Normal:正常</span>
        <w-checkbox v-model="checked">Normal</w-checkbox>
        <div class="tips">Disable:禁用</div>
        <w-checkbox v-model="checked" disabled></w-checkbox>
        <code
          >{{` <w-checkbox v-model="checked" disabled></w-checkbox>`}}
        </code>
      </div>
    </div>
    <!-- CheckBox -->
    <!-- Cards -->
    <div class="section-doc">
      <div class="title">Cards</div>
      <div class="content card-body">
        <div class="tips">Normal</div>
        <w-card title="normal"> </w-card>
        <code>{{` <w-card title="normal"> </w-card>`}}</code>
        <div class="tips">Green</div>
        <w-card color="green" title="green"> </w-card>
        <code>{{` <w-card color="green" title="green"> </w-card>`}}</code>
        <div class="tips" title="bule">Bule</div>
        <w-card color="bule"> </w-card>
        <code>{{` <w-card color="bule"> </w-card>`}}</code>
        <code>{{` <w-card color="bule" \:color="'bule'"> </w-card>`}}</code>
      </div>
    </div>
    <!-- Cards -->
    <!-- Dialog -->
    <div class="section-doc">
      <div class="title">Dialog</div>
      <div class="content card-body" :style="getStyle(container)">
        <w-dialog
          :defaultStyle="defaultStyle"
          :isHidden="isHidden"
          @hidden="hidden"
        >
          <w-icon icon="like" size="30" />
          <w-icon icon="github" size="30" />
          <w-icon icon="shake" size="30" />
          <w-icon icon="game" size="30" />
        </w-dialog>
      </div>
    </div>
    <!-- Dialog -->
  
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getComponents } from "@/utils/tool";
import { getStyle } from "@/utils/style";

const components: any = getComponents();
const Doc = defineComponent({
  components: {
    ...components,
  },
  name: "doc",
  setup(props, context) {
    onMounted(() => {
      // FullScreen()
     
    });
    return { getStyle };
  },
  provide() {
    return {
      container: this.container,
    };
  },
  methods: {
    hidden() {
      this.isHidden = true;
    },
  },
  data() {
    return {
      checked: true,
      defaultStyle: {
        width: 200,
        top: 50,
        left: 50,
        height: 100,
      },
      isHidden: false,
      container: {
        width: 400,
        height: 400,
      },
    };
  },
});
export default Doc;
</script>
<style lang="scss" scoped>

code {
  font-size: rpx(10px);
  color: #00797c;
}
.editor {
  width: 800px;
  height: 500px;
}
.doc {
  @include container;
  overflow-x: hidden;
  background-color: #00797c;
  font-family: Pxiel;
  text-align: left;
  .section-doc {
    position: relative;
    line-height: rpx(20px);
    margin: 0 auto;
    padding: 30px;
    width: 80%;
    .title {
      color: white;
      font-size: rpx(18px);
    }
    .content {
      position: relative;
      background-color: rgb(219, 216, 216);
    }
    .tips {
      margin: 0 rpx(5px);
      font-size: rpx(10px);
  font-family: Pxiel;

    }

    .doc-block {
      line-height: rpx(30px);
    }
  }
}
</style>
