<template>
    <div class="container">
        <div class="mt-3 row">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>First Name</label>
                    <input v-model="form.First_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input v-model="form.Last_name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Birth Date</label>
                    <input v-model="form.DOB" type="date" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.Email" type="email" class="form-control" required>
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary" v-if="!isEdit" @click.prevent="addEmployee">Add Employee</button>
                    <button class="btn btn-primary ms-3" v-else @click="updateEmployee">Update Employee</button>
                </div>
            </form>
        </div>

        <div>
            <table class="table table-dark table-striped my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(e, i) in employees" :key="i">
                        <td>{{ e.EmployeeId }}</td>
                        <td>{{ e.First_name }}</td>
                        <td>{{ e.Last_name }}</td>
                        <td>{{ e.DOB }}</td>
                        <td>{{ e.Email }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editEmployee(e)"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteCustomer(e.EmployeeId)"><i class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="6">No employees found.</td>
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
            baseUrl: 'http://localhost:3000',
            updId: 0,
            employees: [],
            form: {
                First_name: '',
                Last_name: '',
                DOB: '',
                Email: '',
            },
            isEmpty: true,
            isEdit: false,
        }
    },
    methods: {
        async getEmployeeData() {
            try {
                const response = await axios.get(`${this.baseUrl}/employee/`);
                return response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        addEmployee() {
            let $this = this;
            const eform = document.querySelector('form');
            if (!eform.checkValidity()) {
                eform.reportValidity();
                eform.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseUrl}/employee/`, this.form)
                .then(response => {
                    console.log(this.form);
                    $this.employees.push({
                        EmployeeId: response.data,
                        First_name: $this.form.First_name,
                        Last_name: $this.form.Last_name,
                        DOB: $this.form.DOB,
                        Email: $this.form.Email,
                    });
                    console.log(this.form);
                    for (let i in $this.form) {
                        $this.form[i] = "";
                    }
                    eform.classList.remove("was-validated");
                    alert("New employee added!");
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editEmployee(employee) {
            this.isEdit = true;
            this.form.First_name = employee.First_name;
            this.form.Last_name = employee.Last_name;
            this.form.DOB = employee.DOB;
            this.form.Email = employee.Email;
            this.updId = employee.CustomerId;
        },
        updateEmployee() {
            let $this = this;
            const eform = document.querySelector('form');
            if (!eform.checkValidity()) {
                eform.reportValidity();
                eform.classList.add("was-validated");
                return;
            }
            if (this.updId > 0) {
                axios.put(`${this.baseUrl}/employee/${this.updId}`, this.form)
                    .then(response => {
                        if (response.status === 200) {
                            for (let i in $this.employees) {
                                if ($this.employees[i].EmployeeId === $this.updId) {
                                    $this.employees[i].First_name = $this.form.First_name;
                                    $this.employees[i].Last_name = $this.form.Last_name;
                                    $this.employees[i].DOB = $this.form.DOB;
                                    $this.employees[i].Email = $this.form.Email;
                                }
                            }
                            for (let i in $this.form) {
                                $this.form[i] = "";
                            }
                            eform.classList.remove("was-validated");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        deleteEmployee(id, index) {
            let $this = this;
            if (!confirm('Are you sure you want to remove employee?')) return;
            axios.delete(`${this.baseUrl}/employee/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        $this.employees.splice(index, 1);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getEmployeeData().then(data => {
            this.employees = data;
            if(this.employees.length > 0)
                this.isEmpty = false;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>