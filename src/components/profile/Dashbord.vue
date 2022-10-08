<template>
    <div class="container">
        <div class="d-flex">
            <Insert @get="insertProfile" :id="deff"/>
            <button @click="logOut" id="btn-logOut" class="ms-auto btn btn-danger">Log Out</button>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="( profile, index ) in profiles" :key="profile.id">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ profile.name }}</td>
                                <td v-if="profile.gender == 1">Laki-laki</td>
                                <td v-else>Perempuan</td>
                                <td>
                                    <div class="group-btn">
                                        <button type="button" @click="destroy(profile.id, index)" class="btn btn-danger">Hapus</button>
                                        <Show :id="profile.id"/>
                                        <Edit :id="profile.id" />
                                        <!-- <button type="" class="btn btn-success">Edit</button> -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- <p>{{ result }}</p> -->
        <Chart :jumlah="result"/>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import Insert from './child/Insert.vue';
import Show from './child/Show.vue';
import { onMounted, onUpdated } from '@vue/runtime-core';
import { useRouter } from 'vue-router'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Edit from './child/Edit.vue'
import Chart from './child/Chart.vue';

export default {
    name: "Dashbord",
    components: { Insert, Show, Edit, Chart },
    setup(){
        let profiles = ref([])
        const route = useRouter();
        let deff = Math.floor(Math.random() * 100)
        let jumlah = []
        let result = ref('')

        //console.log(result)

        // var arr = ['rijak', 'hafizhun', 'hidayat']
        // arr[0] = 'rijal'
        // console.log(result)

        onMounted(() => {
            //console.log(localStorage.getItem('token'))
            getProfile()
            count()

            //console.log(result)
        });

        function getProfile(){
            axios.get(`http://localhost:8000/api/profile`)
            .then((res) => {
                profiles.value = res.data.data
            }).catch((err) =>{
                console.log(err)
            })
        }

        function destroy(id, index){
            axios.defaults.headers.delete['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.delete(`http://localhost:8000/api/profile/${id}`)
            .then((res) => {
                console.log(res)
                profiles.value.splice(index, 1)
                Swal.fire({
                    title: 'Success',
                    text: 'destroy profile data complete',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            }).catch((err) => {
                console.log(err)
            }).finally((after) => {
                console.log(after)
            })
        }

        function logOut(){
            axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            axios.post(`http://localhost:8000/api/logout`)
            .then((res) => {
                return route.push({ name: 'login' })
            }).catch((err) => {
                console.log(err)
            })
        }

        function count(){
            axios.get(`http://localhost:8000/api/count`)
            .then((res) => {
                jumlah = res.data
                result.value = jumlah.map(a => a.total);
                //console.log(result)
            }).catch((err) => {
                console.log(err)
            })
        }

        return{
            profiles, route, deff, jumlah, result, getProfile, count, destroy, logOut
        }
    },

    methods:{
        insertProfile(name, gender, id){
            // console.log(name)
            // console.log(gender)
            // console.log(id)
            this.profiles.push({
                id: id,
                name: name,
                gender: gender
            })
        }
    }
}
</script>
<style scoped>
    .container{
        margin-top: 50px;
        width: 700px;
    }
    #btn-logOut{
        margin-bottom: 30px;
        margin-left: 30px !important;
    }
</style>