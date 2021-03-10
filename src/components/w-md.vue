<template>
  <div class="md-container">
    <h4>1. reactive</h4>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span>import { reactive } from 'vue'</li><li><span class="line-num" data-line="2"></span></li><li><span class="line-num" data-line="3"></span>// reactive state</li><li><span class="line-num" data-line="4"></span>const state = reactive({</li><li><span class="line-num" data-line="5"></span>  count: 0</li><li><span class="line-num" data-line="6"></span>})</li></ol></code></pre>
    <p>
      vue3暴露了一系列
      <code>api</code>用于创建脱离模板的响应式对象,这些内容的本质是Proxy的封装
    </p>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span><span class="hljs-keyword">import</span> {ref, reactive,toRefs,} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span></li><li><span class="line-num" data-line="2"></span><span class="hljs-keyword">const</span> state = reactive({</li><li><span class="line-num" data-line="3"></span>    <span class="hljs-attr">count</span> :<span class="hljs-number">0</span>,</li><li><span class="line-num" data-line="4"></span>    <span class="hljs-attr">name</span>:<span class="hljs-string">&#x27;john&#x27;</span></li><li><span class="line-num" data-line="5"></span>})</li><li><span class="line-num" data-line="6"></span><span class="hljs-keyword">let</span>  num = ref(<span class="hljs-number">0</span>)</li><li><span class="line-num" data-line="7"></span>num.value++</li><li><span class="line-num" data-line="8"></span><span class="hljs-built_in">console</span>.log(++state.count)</li><li><span class="line-num" data-line="9"></span><span class="hljs-keyword">let</span> {count,name} = toRefs(state) </li><li><span class="line-num" data-line="10"></span><span class="hljs-built_in">console</span>.log(count) <span class="hljs-comment">//输出ref本身，要访问值请用.value</span></li><li><span class="line-num" data-line="11"></span><span class="hljs-built_in">console</span>.log(name)</li></ol><b class="name">javascript</b></code></pre>
    <p><strong>自动求值</strong></p>
    <p>
      1.当 ref 作为setup()的上下文,而且作为 setup
      ()返回的对象的属性时，它会自动解包到内部值。没有必要附加.value
    </p>
    <p>2.当ref 作为reactive 对象的属性时，行为与上述一致</p>
    <p><strong>解构</strong></p>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span><span class="hljs-keyword">import</span> {ref, reactive,toRefs,} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span></li><li><span class="line-num" data-line="2"></span><span class="hljs-keyword">const</span> state = reactive({</li><li><span class="line-num" data-line="3"></span>    <span class="hljs-attr">count</span> :<span class="hljs-number">0</span>,</li><li><span class="line-num" data-line="4"></span>    <span class="hljs-attr">name</span>:<span class="hljs-string">&#x27;john&#x27;</span></li><li><span class="line-num" data-line="5"></span>})</li><li><span class="line-num" data-line="6"></span></li><li><span class="line-num" data-line="7"></span><span class="hljs-keyword">let</span> {count,name} = toRefs(state) </li><li><span class="line-num" data-line="8"></span><span class="hljs-built_in">console</span>.log(count) <span class="hljs-comment">//输出ref本身，要访问值请用.value</span></li></ol><b class="name">javascript</b></code></pre>
    <h4>2.计算属性和监听器</h4>
    <p>
      vue3可以将计算属性和监听器分离，暴露为单独的api，建立一个计算属性函数或者监听器<br />
      <strong>计算属性</strong>
    </p>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span><span class="hljs-keyword">const</span> count = ref(<span class="hljs-number">1</span>)</li><li><span class="line-num" data-line="2"></span><span class="hljs-keyword">const</span> plusOne = computed(<span class="hljs-function">() =&gt;</span> count.value + <span class="hljs-number">1</span>)</li><li><span class="line-num" data-line="3"></span></li><li><span class="line-num" data-line="4"></span></li><li><span class="line-num" data-line="5"></span><span class="hljs-built_in">console</span>.log(plusOne.value) <span class="hljs-comment">// 2</span></li><li><span class="line-num" data-line="6"></span></li><li><span class="line-num" data-line="7"></span>plusOne.value++ <span class="hljs-comment">// error</span></li></ol><b class="name">javascript</b></code></pre>
    <p>
      plusOne 的值依赖于<code>()=&gt;count.value + 1</code
      >这个getter函数，<code>computed</code>函数返回一个reactive对象，且这个对象不可变<br />
      但是，一切并非这么绝对，当你传第一个拥有，<code>get</code>，<code>set</code>函数的对象时，<code>computed</code>函数将返回一个可写的响应式对象
    </p>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span><span class="hljs-keyword">const</span> count = ref(<span class="hljs-number">1</span>)</li><li><span class="line-num" data-line="2"></span><span class="hljs-keyword">const</span> plusOne = computed({</li><li><span class="line-num" data-line="3"></span>    <span class="hljs-attr">get</span>:<span class="hljs-function">()=&gt;</span>value</li><li><span class="line-num" data-line="4"></span>    <span class="hljs-attr">set</span>:<span class="hljs-function">(<span class="hljs-params">val</span>)=&gt;</span> <span class="hljs-built_in">console</span>.log(val)</li><li><span class="line-num" data-line="5"></span>})</li><li><span class="line-num" data-line="6"></span></li></ol><b class="name">javascript</b></code></pre>
    <p><strong>watchEffect</strong></p>
    <pre
      class="hljs"
    ><code><ol><li><span class="line-num" data-line="1"></span>const count = ref(0)</li><li><span class="line-num" data-line="2"></span></li><li><span class="line-num" data-line="3"></span>const stop =  watchEffect(() =&gt; console.log(count.value))</li><li><span class="line-num" data-line="4"></span>// -&gt; logs 0</li><li><span class="line-num" data-line="5"></span></li><li><span class="line-num" data-line="6"></span>setTimeout(() =&gt; {</li><li><span class="line-num" data-line="7"></span>  count.value++</li><li><span class="line-num" data-line="8"></span>  // -&gt; logs 1</li><li><span class="line-num" data-line="9"></span>}, 100)</li><li><span class="line-num" data-line="10"></span></li><li><span class="line-num" data-line="11"></span></li><li><span class="line-num" data-line="12"></span>//监听停止</li><li><span class="line-num" data-line="13"></span>stop()</li></ol></code></pre>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.md-container {
  padding: 20px;
  .hljs {
    background: rgba(3, 56, 52, 0.192);
  }
  * {
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
  }
  p,
  ol li,
  ul li {
    font-size: initial;
  }
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  overflow-y: scroll;
}
@import "/node_modules/highlight.js/scss/stackoverflow-light";
</style>
