<template>
    <div>
        <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
            <div class="modal animated-fast" tabindex="-1" v-show="showModal">
                <div class="modal-dialog" :class="mSize+' '+(mask?'':'shadow')">
                    <div class="modal-content" :class="{'no-radius':!mask}">
                        <div class="modal-header">
                            <h5 class="modal-title">{{title}}</h5>
                            <button type="button" class="close">
                                <span @click="cancelEvent()">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div v-if="content" v-html="content"></div>
                            <slot v-else>...</slot>
                        </div>
                        <div class="modal-footer">
                            <template v-if="$options.modalType==='alert'">
                                <button type="button" class="btn btn-primary" :class="mBtn" @click="cancelEvent">{{ok}}</button>
                            </template>
                            <template v-else>
                                <button type="button" class="btn btn-secondary" :class="mBtn" @click="cancelEvent">{{cancel}}</button>
                                <button type="button" class="btn btn-primary" :class="mBtn" @click="okEvent">{{ok}}</button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" v-if="mask">
            <div class="modal-backdrop animated-fast" v-show="showModal"></div>
        </transition>
    </div>
</template>

<script>
// import 'animate.css/animate.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '标题'
        },
        cancel: {
            type: String,
            default: '关闭'
        },
        ok: {
            type: String,
            default: '确定'
        },
        size: {
            type: String,
            default: '' // lg / sm
        },
        mask: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            default: null
        },
    },
    data() {
        return {
            showModal: this.value,
            mSize: this.getSize('modal'),
            mBtn: this.getSize('btn'),
        };
    },
    watch: {
        value(val) {
            document.body.classList[val ? 'add' : 'remove']('modal-open');
            this.showModal = val;
        }
    },
    methods: {
        getSize(type) {
            return this.size ? `${type}-${this.size}` : '';
        },
        close() {
            this.showModal = false;
        },
        okEvent() {
            this.okCallback ? this.okCallback() : this.$emit('ok');
        },
        cancelEvent() {
            // confirm中的取消与关闭不需要阻止
            if (this.cancelCallback && this.cancelCallback() && this.$options.modalType !== 'confirm') return;
            this.close();
            this.$emit('input', false);

            // if (this.$options.modalType === 'alert' || this.$options.modalType === undefined) {
            //     this.$emit('input', false);
            // } else {
            //     this.cancelCallback && this.cancelCallback();
            // }
        }
    },
}
</script>
<style scoped>
    .modal {
        display: block;
    }
    .modal-backdrop {
        background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-dialog.shadow {
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
    }
    .modal-content.no-radius {
        border-radius: unset;
    }
    .animated-fast {
        animation-duration: 0.5s;
    }
</style>
