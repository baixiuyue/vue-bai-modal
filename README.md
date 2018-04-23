基于Bootstrap V4的模态弹窗

## 使用方法
```js
import Vue from 'vue';

import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapModal from 'vue-bai-modal';
Vue.use(BootstrapModal, configs);
```
`configs` {Object} 参数说明：
- `i18n`：`vue-i18n`模块，如果需要传入参数，则该属性必须存在
- `title`：对应语言配置文件中 **标题** 对应的路径
- `alertTitle`：对应语言配置文件中 **Alert弹窗的标题** 对应的路径
- `ok`：对应语言配置文件中 **确认按钮的文本** 对应的路径
- `cancel`：对应语言配置文件中 **取消按钮的文本** 对应的路径


## 全局组件
```html
<template>
    <div>
        <v-modal v-model="show" @ok="show=!show">内容</v-modal>
    </div>
</template>
<script>
export default {
    data(){
        show: false
    }
}
</script>
```

## 直接调用
```html
<template>
    <div>
        <button @click="modal">modal</button>
        <button @click="alert">alert</button>
        <button @click="confirm">confirm</button>
    </div>
</template>
<script>
export default {
    data(){
        show: false
    },
    methods:{
        modal(){
            this.$modal({
                title: 'this is title',
                content: 'here is content',
                ok() {
                    alert('click ok button');
                    this.close();
                },
                cancel() {
                    alert('click cancel button');
                }
            });
        },
        alert(){
            this.$modal.alert('提示信息');
        },
        confirm(){
            this.$modal.confirm('标题', '提示信息', function(){
                alert('确认');
            }, function(){
                alert('取消');
            });
        }
    }
}
</script>
```

## 参数
参数名 | 类型 | 备注
---- | --- | ---
`title` | String | 标题
`content` |  String | 内容
`ok` | Function | 确定回调函数，该函数返回`true`则会阻止关闭，需要手动调用`this.close()`进行关闭
`okText` | String | 确定按钮文本
`cancel` | Function | 取消回调函数，该函数返回`true`则会阻止关闭(`this.$modal.confirm`除外)，需要手动调用`this.close()`进行关闭
`cancelText` | String | 取消文牛的文本
`mask` | Boolean | 是否显示遮罩层。`true`显示，`false`不显示
`size` | String | 显示窗口的尺寸。默认为空字符串，可选参数有：`sm`, `lg`

## 直接调用方法
```js
this.$modal(options)
```
```js
this.$modal.alert(content, cancelFn)
```
```js
this.$modal.confirm(title, content, okFn, cancelFn)
```

## 示例
执行`npm run dev`可查看demo。示例代码位于demo文件夹