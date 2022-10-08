<template>
    <!-- Button trigger modal -->
    <button type="button" @click="show()" class="btn btn-warning" data-bs-toggle="modal" :data-bs-target="'#exampleModalShow_' + id">
    Show
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModalShow_' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Show</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="">
                    <div class="mb-3 row">
                        <label for="name" class="col-sm-2 col-form-label">Nama:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="name" :value="profile.name">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="gender" class="col-sm-2 col-form-label">Gender:</label>
                        <div class="col-sm-10">
                            <input v-if="profile.gender == 1" type="text" readonly class="form-control-plaintext" id="laki" value="Laki-laki">
                            <input v-else type="text" readonly class="form-control-plaintext" id="perempuan" value="Perempuan">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="created_at" class="col-sm-2 col-form-label">Di Buat:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="created_at" :value="profile.created_at">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="updated_at" class="col-sm-2 col-form-label">Terakhir di Ubah:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="updated_at" :value="profile.updated_at">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>

</template>
<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import moment from 'moment'

export default {
    name: 'Show',
    props: ['id'],
    setup(props) {
        let profile = reactive({
            name: '',
            gender: '',
            created_at: '',
            updated_at: ''
        })

        let id = props.id
        
        function show(){
            axios.get(`http://localhost:8000/api/profile/${id}`)
            .then((res) => {
                profile.name = res.data.data.name
                profile.gender = res.data.data.gender
                profile.created_at = moment(res.data.data.created_at).format('L')
                profile.updated_at = moment(res.data.data.updated_at).format('L')
                //console.log(profile)
            }).catch((err) => {
                console.log(err)
            })
        }

        return{
            profile, id, show
        }
    }
}
</script>

<style scoped>
    .btn-warning{
        margin: 0px 20px;
    }
</style>