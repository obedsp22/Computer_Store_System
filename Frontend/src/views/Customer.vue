<template>
    <div class="container">
        <div id="customers" class="row mt-3">
            <form class="offset-sm-3 col-sm-6" id="cust-form" ref="cust-form">
                <input type="text" hidden>
                <div class="form-group">
                    <label>First Name</label>
                    <input v-model="form.Fname" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>Last Name</label>
                    <input v-model="form.Lname" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>Address</label>
                    <input v-model="form.Address" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>City</label>
                    <input v-model="form.City" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>Zip Code</label>
                    <input v-model="form.Zip" type="text" class="form-control" pattern="[0-9]{5}" placeholder="12345"
                        required>
                </div>
                <div class="form-group mt-3">
                    <label>Country</label>
                    <input v-model="form.Country" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>Phone</label>
                    <input v-model="form.Phone" type="text" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890" required>
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addCustomer">Add New
                        Customer</button>
                    <button class="btn btn-primary" v-else @click="updateCustomer">Update Customer</button>
                </div>
            </form>
        </div>
        <div>
            <table class="table table-striped table-dark my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip Code</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(c, i) in customers" :key="i">
                        <td>{{ c.CustomerId }}</td>
                        <td>{{ c.Fname }} {{ c.Lname }}</td>
                        <td>{{ c.Address }}</td>
                        <td>{{ c.City }}</td>
                        <td>{{ c.Zip }}</td>
                        <td>{{ c.Country }}</td>
                        <td>{{ c.Phone }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editCustomer(c)"><i
                                    class="bi bi-pencil-square"></i></button>
                            <button class="ms-3 btn btn-danger" @click="deleteCustomer(c.CustomerId, i)"><i
                                    class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="8">No Customers found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customers', // ?
    data() {
        return {
            baseURL: 'http://localhost:3000', // backend url
            updateId: 0,
            customers: [],
            form: {
                Fname: '',
                Lname: '',
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
        async getCustomerData() {
            try {
                const response = await axios.get(`${this.baseURL}/customer/`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        addCustomer() {
            let $this = this;
            const cForm = document.querySelector('form') // ?
            if (!cForm.checkValidity()) {
                cForm.reportValidity();
                cForm.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseURL}/customer/`, this.form)
                .then(response => {
                    $this.customers.push({
                        CustomerId: response.data,
                        Fname: $this.form.Fname,
                        Lname: $this.form.Lname,
                        Address: $this.form.Address,
                        City: $this.form.City,
                        Zip: $this.form.Zip,
                        Country: $this.form.Country,
                        Phone: $this.form.Phone,
                    });
                    for (let i in $this.form) {
                        $this.form[i] = "";
                    }
                    cForm.classList.remove("was-validated");
                    alert('New customer added!');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editCustomer(customer) {
            this.isEdit = true;
            this.form.Fname = customer.Fname;
            this.form.Lname = customer.Lname;
            this.form.Address = customer.Address;
            this.form.City = customer.City;
            this.form.Zip = customer.Zip;
            this.form.Country = customer.Country;
            this.form.Phone = customer.Phone;
            this.updateId = customer.CustomerId;
        },
        updateCustomer() {
            let $this = this;
            const cForm = document.querySelector('form')
            if (!cForm.checkValidity()) {
                cForm.reportValidity();
                cForm.classList.add("was-validated");
                return;
            }
            if (this.updateId > 0) {
                axios.put(`${this.baseURL}/customer/${this.updateId}`, this.form)
                 .then(response => {
                    if (response.status === 200) {
                        for (let i in $this.customers) {
                            if ($this.customers[i].CustomerId === $this.updateId) {
                                $this.customers[i].Fname = $this.form.Fname;
                                $this.customers[i].Lname = $this.form.Lname;
                                $this.customers[i].Address = $this.form.Address;
                                $this.customers[i].City = $this.form.City;
                                $this.customers[i].Zip = $this.form.Zip;
                                $this.customers[i].Country = $this.form.Country;
                                $this.customers[i].Phone = $this.form.Phone;
                            }
                        }
                        for (let i in $this.form) {
                            $this.form[i] = "";
                        }
                        cForm.classList.remove("was-validated");
                    }
                 })
                 .catch(error => {
                    console.log(error);
                 });
            }
        },
        deleteCustomer(id, index) {
            let $this = this;
            if(!confirm('Are you sure you want to remvove customer?')) return;
            axios.delete(`${this.baseURL}/customer/${id}`)
             .then(response => {
                if(response.status === 200) {
                    $this.customers.splice(index, 1);
                }
             })
             .catch(error => {
                console.log(error);
             })
        }
    },
    mounted() {
        this.getCustomerData().then(data => {
            this.customers = data;
            if (this.customers.length > 0)
                this.isEmpty = false;
        }).catch(error => {
            console.log(error);
        });
    },
}
</script>