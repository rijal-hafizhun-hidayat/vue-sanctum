<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" id="btn-insert" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Tambah
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="store">
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Nama:</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="data.name" class="form-control">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Gender</label>
                            <div class="col-sm-10">
                                <select v-model="data.gender" class="form-select">
                                    <option selected value="">Pilih Gender</option>
                                    <option value="1">Laki-laki</option>
                                    <option value="0">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import { reactive } from '@vue/reactivity'
export default {
    name: 'Insert',
    setup(props, context){
        let data = reactive({
            name: '',
            gender: ''
        })

        function store(){
            axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.post(`http://localhost:8000/api/profile`, {
                name: this.data.name,
                gender: this.data.gender
            }).then((res) => {
                //console.log(res.data.data.name)
                console.log(context.emit('get', res.data.data.name, res.data.data.gender, res.data.data.id))
            }).catch((err) => {
                console.log(err);
            })
        }

        return {
            data, store
        }
    },

    // methods:{
    //     store(){
    //         axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    //         axios.post(`http://localhost:8000/api/profile`, {
    //             name: this.data.name,
    //             gender: this.data.gender
    //         }).then((res) => {
    //             //console.log(res.data.data.name)
    //             this.$emit('get', res.data.data.name, res.data.data.gender, res.data.data.id)
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // }
}
</script>
<style scoped>
    #btn-insert{
        margin-bottom: 30px;
    }
</style>