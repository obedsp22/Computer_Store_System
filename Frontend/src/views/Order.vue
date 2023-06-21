<template>
    <div class="container">
        <div class="mt-3 row">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>Date</label>
                    <input v-model="form.Date" type="date" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Shipper</label>
                    <select class="form-control" v-model="form.Shipper" required>
                        <option value="">Choose a shipper</option>
                        <option v-for="s in shippers" :value="s.ShipperId">{{ s.Ship_Name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Customer</label>
                    <select class="form-control" v-model="form.Customer" required>
                        <option value="">Choose a customer</option>
                        <option v-for="c in customers" :value="c.CustomerId">{{ c.Fname }} {{ c.Lname }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Employee</label>
                    <select class="form-control" v-model="form.Employee" required>
                        <option value="">Choose an employee</option>
                        <option v-for="e in employees" :value="e.EmployeeId">{{ e.First_name }} {{ e.Last_name }}</option>
                    </select>
                </div>
                <div class="mt-4 text-end">
                    <button v-if="!isEdit" class="btn btn-primary" @click.prevent="addOrder">Place Order</button>
                    <button v-else class="btn btn-primary" @click="updateOrder">Update Order</button>
                </div>
            </form>
        </div>

        <div class="my-4">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Shippers</th>
                        <th>Customers</th>
                        <th>Employees</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(o, i) in orders">
                        <td>{{ o.Date }}</td>
                        <td>{{ o.Ship_Name }}</td>
                        <td>{{ o.Fname }} {{ o.Lname }}</td>
                        <td>{{ o.First_name }} {{ o.Last_name }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editOrder(o)"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteOrder(o.OrderId, i)"><i class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="5">No orders have been placed.</td>
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
            customers: [],
            employees: [],
            orders: [],
            form: {
                Date: '',
                Shipper: '',
                Customer: '',
                Employee: '',
            },
            isEmpty: true,
            isEdit: false,
        }
    },
    methods: {
        async getShippers() {
            try {
                const response = await axios.get(`${this.baseURL}/order/shiplist`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async getCustomers() {
            try {
                const response = await axios.get(`${this.baseURL}/order/custlist`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async getEmployees() {
            try {
                const response = await axios.get(`${this.baseURL}/order/emplist`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async getOrders() {
            try {
                const response = await axios.get(`${this.baseURL}/order/`);
                return response.data;
            }
            catch(error) {
                console.log(error);
            }
        },
        addOrder() {
            let $this = this;
            const oForm = document.querySelector('form');
            if(!oForm.checkValidity()) {
                oForm.reportValidity();
                oForm.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseURL}/order/`, this.form)
            .then(response => {
                $this.orders.push({
                    OrderId: response.data,
                    Date: $this.form.Date,
                    Shipper: $this.form.Shipper,
                    Customer: $this.form.Customer,
                    Employee: $this.form.Employee,
                });
                for(let i in this.form) {
                    this.form[i] = "";
                };
                oForm.classList.remove("was-validated");
                alert('New order placed!');
                location.reload();
            })
            .catch(error => {
                console.log(error);
            });
        },
        editOrder(order){
            this.isEdit = true;
            this.updId = order.OrderId;
            this.form.Date = order.Date;
            this.form.Shipper = order.Shipper;
            this.form.Customer = order.Customer;
            this.form.Employee = order.Employee;
        },
        updateOrder() {
            let $this = this;
            const oForm = document.querySelector('form');
            if(!oForm.checkValidity()) {
                oForm.reportValidity();
                oForm.classList.add("was-validated");
                return;
            }
            if(this.updId > 0) {
                axios.put(`${this.baseURL}/order/${this.updId}`, this.form)
                 .then(response => {
                    if(response.status === 200) {
                        // for(let i in $this.orders) {
                        //     if($this.orders[i].OrderId === $this.updId) {
                        //         $this.orders[i].Date = $this.form.Date;
                        //         $this.orders[i].Shipper = $this.form.Shipper;
                        //         $this.orders[i].Customer = $this.form.Customer;
                        //         $this.orders[i].Employee = $this.form.Employee;
                        //     }
                        // }
                        for(let i in $this.form) {
                            $this.form[i] = "";
                        };
                        oForm.classList.remove("was-validated");
                    }
                 })
                 .catch(err => {
                    console.log(err);
                 })
            }
        },
        deleteOrder(id, index) {
            let $this = this;
            if (!confirm('Are you sure you want to delete order?')) return;
            axios.delete(`${this.baseURL}/order/${id}`)
            .then(response => {
                if (response.status === 200) {
                        $this.orders.splice(index, 1);
                    }
            })
            .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getShippers().then(data => {
            this.shippers = data;
        }).catch(err => {
            console.log(err);
        });

        this.getCustomers().then(data => {
            this.customers = data;
        }).catch(err => {
            console.log(err);
        });

        this.getEmployees().then(data => {
            this.employees = data;
        }).catch(err => {
            console.log(err);
        });

        this.getOrders().then(data => {
            for(let i in data){
                data[i].Date = data[i].Date.substring(0, 10);
            }
            this.orders = data;
            if(this.orders.length > 0)
                this.isEmpty = false;
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>