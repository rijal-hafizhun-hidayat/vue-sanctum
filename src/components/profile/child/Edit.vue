<template>
    <!-- Button trigger modal -->
    <button type="button" @click="show" class="btn btn-success" data-bs-toggle="modal" :data-bs-target="'#exampleModal_'+id">
    Edit
    </button>

    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal_'+id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Show</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="update">
                        <div class="mb-3 row">
                            <label for="nama" class="col-sm-2 col-form-label">Nama:</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="nama" v-model="profile.name">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="gender" class="col-sm-2 col-form-label">Gender:</label>
                            <div class="col-sm-10">
                                <select v-if="profile.gender == 1" class="form-select" id="gender" v-model="profile.gender" aria-label="Default select example">
                                    <option disabled value="1">Laki-laki</option>
                                    <option value="0">Perempuan</option>
                                </select>
                                <select v-else class="form-select" id="gender" v-model="profile.gender" aria-label="Default select example">
                                    <option value="1">Laki-laki</option>
                                    <option disabled value="0">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
export default {
    name: 'Edit',
    props: ['id'],
    setup(props){
        let profile = reactive({
            name: null,
            gender: null
        })

        function show(){
            axios.get(`http://localhost:8000/api/profile/${props.id}`)
            .then((res) => {
                profile.name = res.data.data.name
                profile.gender = res.data.data.gender
                console.log(profile)
            }).catch((err) => {
                console.log(err)
            })
        }

        function update(){
            axios.defaults.headers.put['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.put(`http://localhost:8000/api/profile/${props.id}`,{
                name: profile.name,
                gender: profile.gender
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            profile, show, update
        }
    }
}
</script>