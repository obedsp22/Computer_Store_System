<template>
    <div class="container">
        <div class="row mt-3">
            <form class="offset-sm-3 col-sm-6">

                <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.Sup_Name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input v-model="form.Address" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>City</label>
                    <input v-model="form.City" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Zip</label>
                    <input v-model="form.Zip" type="text" class="form-control" pattern="[0-9]{5}" placeholder="12345" required>
                </div>
                <div class="form-group">
                    <label>Country</label>
                    <input v-model="form.Country" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input v-model="form.Phone" type="tel" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required>
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addSupplier">Add Supplier</button>
                    <button class="btn btn-primary ms-3" v-else @click="updateSupplier">Update Supplier</button>
                </div>
            </form>
        </div>

        <div class="my-4">
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(s,i) in suppliers" :key="i">
                        <td>{{ s.Sup_Name }}</td>
                        <td>{{ s.Address }}</td>
                        <td>{{ s.City }}</td>
                        <td>{{ s.Zip }}</td>
                        <td>{{ s.Country }}</td>
                        <td>{{ s.Phone }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editSupplier(s)"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteSupplier(s.SupplierId, i)"><i class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="7">No suppliers found.</td>
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
                suppliers: [],
                form: {
                    Sup_Name: '',
                    Address: '',
                    City: '',
                    Zip: '',
                    Country: '',
                    Phone: '',
                },
                isEmpty: true,
                isEdit: false,
            }
        },
        methods: {
            async getSupplierData() {
                try{
                    const response = await axios.get(`${this.baseURL}/supplier/`);
                    return response.data;
                } 
                catch (err) {
                    console.log(err);
                }
            },
            addSupplier() {
                let $this = this;
                const sForm = document.querySelector('form');
                if(!sForm.checkValidity()) {
                    sForm.reportValidity();
                    sForm.classList.add("was-validated");
                    return;
                }
                axios.post(`${this.baseURL}/supplier/`, this.form)
                 .then(response => {
                    $this.suppliers.push({
                        SupplierId: response.data,
                        Sup_Name: $this.form.Sup_Name,
                        Address: $this.form.Address,
                        City: $this.form.City,
                        Zip: $this.form.Zip,
                        Country: $this.form.Country,
                        Phone: $this.form.Phone,
                    });
                    for(let i in $this.form) {
                        $this.form[i] = "";
                    };
                    alert('Supplier added!');
                    sForm.classList.remove("was-validated");
                 })
                  .catch(err => {
                    console.log(err);
                  });
            },
            editSupplier(supp) {
                this.isEdit = true;
                this.form.Sup_Name = supp.Sup_Name;
                this.form.Address = supp.Address;
                this.form.City = supp.City;
                this.form.Zip = supp.Zip;
                this.form.Country = supp.Country;
                this.form.Phone = supp.Phone;
                this.updId = supp.SupplierId;
            },
            updateSupplier() {
                let $this = this;
                const sForm = document.querySelector('form');
                if(!sForm.checkValidity()) {
                    sForm.reportValidity();
                    sForm.classList.add("was-validated");
                    return;
                }
                if(this.updId > 0) {
                    axios.put(`${this.baseURL}/supplier/${this.updId}`, this.form)
                     .then(response => {
                        if(response.status === 200) {
                            for(let i in $this.suppliers) {
                                if($this.suppliers[i].SupplierId == $this.updId) {
                                    $this.suppliers[i].Sup_Name = $this.form.Sup_Name
                                    $this.suppliers[i].Address = $this.form.Name;
                                    $this.suppliers[i].City = $this.form.Name;
                                    $this.suppliers[i].Zip = $this.form.Name;
                                    $this.suppliers[i].Country = $this.form.Name;
                                    $this.suppliers[i].Phone = $this.form.Name;
                                }
                            }
                            for(let i in $this.form) {
                                $this.form[i] = "";
                            }
                            sForm.classList.remove("was-validated");
                        }
                    })
                     .catch(error => {
                        console.log(error);
                     });
                }
            },
            deleteSupplier(id, index) {
                let $this = this;
                if(confirm('Are you sure you want to remove supplier?')) {
                    axios.delete(`${$this.baseURL}/supplier/${id}`)
                     .then(response => {
                        if(response.status === 200) {
                            $this.suppliers.splice(index, 1);
                        }
                     })
                     .catch(error => {
                        console.log(error);
                     })
                }
            }
        },
        mounted() {
            this.getSupplierData().then(data => {
                this.suppliers = data;
                if(this.suppliers.length > 0) 
                    this.isEmpty = false;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>