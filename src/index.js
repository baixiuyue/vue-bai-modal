import ModalComponent from './modal.vue';

/**
 * 统一处理弹窗
 * @param {Function} Vue Vue
 * @param {Object} options {propsData, methods}
 * @param {String} modalType 弹窗类型 alert confirm
 * @return {Object} 实例
 */
function showModalFn(Vue, options = {}, modalType = 'method') {
    const modal = Vue.extend(ModalComponent);
    const propsData = {
        mask: true,
    };
    const $modal = new modal({
        modalType,
        propsData: Object.assign(propsData, options.propsData),
        methods: options.methods,
        created() {
            this.$nextTick(() => this.showModal = true);

            // 关闭窗口时销毁Vue实例
            this.$watch('showModal', (val) => {
                if (!val) {
                    this.$nextTick(() => {
                        this.$destroy();
                    });
                }
            });
        },
        destroyed() {
            // 销毁实例后，等待动画执行完再移除dom
            setTimeout(() => document.body.removeChild(this.$el), 500);
        }
    }).$mount();
    document.body.appendChild($modal.$el);
    return $modal;
}

const noop = () => { };

export default {
    /**
     * @param {Function} Vue Vue对象
     * @param {Object} configs {title, ok, cancel, alertTitle}
     * @return {*} *
     */
    install: function (Vue, configs = {}) {
        function lang(field) {
            if (configs.i18n && configs[field]) {
                return configs.i18n.t(configs[field]);
            }
        }

        // 全局注册
        Vue.component('v-modal', ModalComponent);

        /**
         * 类似于artDialog的使用
         * @param {Object} param0 类似于artdialog的参数
         * @returns {Object} 弹窗组件
         */
        Vue.prototype.$modal = ({
            title = lang('title') || '标题',
            content = '',
            mask = false,
            ok = noop,
            cancel = noop,
            okText = lang('ok') || '确定',
            cancelText = lang('cancel') || '取消',
            size = ''
        }) => {
            return showModalFn(Vue, {
                propsData: { title, content, mask, ok: okText, cancel: cancelText, size },
                methods: {
                    okCallback: ok,
                    cancelCallback: cancel
                },
            });
        };

        /**
         * Alert
         * @param {String} message 内容
         * @param {Function} callback 关闭前的回调
         * @returns {Object} 弹窗组件
         */
        Vue.prototype.$modal.alert = (message, callback) => showModalFn(Vue, {
            propsData: { content: message, title: lang('alertTitle') || '提示' },
            methods: {
                cancelCallback: callback || noop,
            }
        }, 'alert');

        /**
         * Confirm
         * @param {String} title 标题
         * @param {String} message 内容
         * @param {Function} okCallback 确认操作的回调
         * @param {Function} cancelCallback 取消操作的回调
         * @returns {Object} 弹窗组件
         */
        Vue.prototype.$modal.confirm = (title, message, okCallback = noop, cancelCallback = noop) => {
            const vm = showModalFn(Vue, {
                propsData: { title, content: message },
                methods: {
                    okCallback: function () {
                        if (okCallback.call(this)) return;
                        vm.close();
                    },
                    cancelCallback,
                },
            }, 'confirm');
            return vm;
        };
    }
};