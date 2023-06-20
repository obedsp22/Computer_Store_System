<template>
    <div class="container">
        <div class="mt-3 row">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Birth Date</label>
                    <input type="date" class="form-control">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control">
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary">Add Employee</button>
                    <button class="btn btn-primary ms-3">Update Employee</button>
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
                    <tr v-if="!isEmpty">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3"><i class="bi bi-x-circle"></i></button>
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
                const response = await axios.get(`${this.baseURL}/employee/`);
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
        }
    },
    mounted() {
        this.getEmployeeData().then(data => {
            this.employees = data;
            if (this.employees.length > 0)
                this.isEmpty = false;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>