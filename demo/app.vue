<template>
    <div id="app">
        <div class="m-5">
            <button type="button" class="btn btn-primary" @click="show=!show">v-modal</button>
            <button type="button" class="btn btn-secondary" @click="alert">Alert</button>
            <button type="button" class="btn btn-success" @click="confirm">Confirm</button>
            <button type="button" class="btn btn-danger" @click="modal">modal</button>
            <button type="button" class="btn btn-info" @click="prevent">阻止关闭</button>
        </div>
        <v-modal v-model="show" @ok="show=!show">
            v-modal
        </v-modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
        modal() {
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
        alert() {
            this.$modal.alert('alert: hello world!', function () {
                alert('关闭了');
            });
        },
        confirm() {
            this.$modal.confirm('Confirm title', 'are you sure?', function () {
                alert('yes');
                return true;
            }, function () {
                alert('cancel')
            });
        },
        prevent() {
            this.$modal.alert('alert: prevent close', function () {
                alert('阻止了关闭');
                return true;
            });
        }
    }
}
</script>
