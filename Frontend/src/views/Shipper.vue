<template>
    <div class="container">
        <div class="mt-3 row">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.Ship_Name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input v-model="form.Phone" type="tel" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890"
                        required>
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addShipper">Add New Shipper</button>
                    <button class="btn btn-primary ms-3" v-else @click="updateShipper">Update Shipper</button>
                </div>
            </form>
        </div>
        <div>
            <table class="table table-dark table-striped my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(s, i) in shippers" :key="i">
                        <td>{{ s.ShipperId }}</td>
                        <td>{{ s.Ship_Name }}</td>
                        <td>{{ s.Phone }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editShipper(s)"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteShipper(s.ShipperId, i)"><i class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="4">No shippers found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseURL: 'http://localhost:3000',
            updId: 0,
            shippers: [],
            form: {
                Ship_Name: '',
                Phone: '',
            },
            isEmpty: true,
            isEdit: false,
        }
    },
    methods: {
        async getShipperData() {
            try {
                const response = await axios.get(`${this.baseURL}/shipper/`);
                return response.data;
            }
            catch(err) {
                console.log(err);
            }
        },
        addShipper() {
            let $this = this;
            const sForm = document.querySelector('form');
            if(!sForm.checkValidity()) {
                sForm.reportValidity();
                sForm.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseURL}/shipper/`, this.form)
             .then(response => {
                $this.shippers.push({
                    ShipperId: response.data,
                    Ship_Name: $this.form.Ship_Name,
                    Phone: $this.form.Phone,
                });
                for(let i in $this.form) {
                    $this.form[i] = "";
                };
                sForm.classList.remove('was-validated');
                alert('New Shipper added!');
                if($this.shippers.length <= 1)
                    location.reload();
             })
        },
        editShipper(ship) {
            this.isEdit = true;
            this.form.Ship_Name = ship.Ship_Name;
            this.form.Phone = ship.Phone;
            this.updId = ship.ShipperId;
        },
        updateShipper() {
            let $this = this;
            const sForm = document.querySelector('form');
            if(!sForm.checkValidity()) {
                sForm.reportValidity();
                sForm.classList.add("was-validated");
                return;
            }
            if(this.updId > 0) {
                axios.put(`${this.baseURL}/shipper/${this.updId}`, this.form)
                 .then(response => {
                    if(response.status === 200) {
                        for(let i in $this.form) {
                            $this.form[i] = "";
                        }
                        sForm.classList.remove("was-validated");
                    }
                 })
                 .catch(err => {
                    console.log(err);
                 })
            }
        },
        deleteShipper(id, index) {
            let $this = this;
            if(!confirm('Are you sure you want to delete shipper?')) return;
            axios.delete(`${this.baseURL}/shipper/${id}`)
             .then(response => {
                if(response.status === 200) {
                    $this.shippers.splice(index, 1);
                    if($this.shippers.length <= 1) {
                        location.reload();
                    }
                }
             })
             .catch(err => {
                console.log(err);
             });
        }
    },
    mounted() {
        this.getShipperData().then(data => {
            this.shippers = data;
            if(this.shippers.length > 0) 
                this.isEmpty = false;
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>