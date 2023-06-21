<template>
    <div class="container">
        <div class="row mt-3">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.Cat_Name" type="text" class="form-control" required>
                </div>
                <div class="form-group mt-3">
                    <label>Description</label>
                    <input v-model="form.Description" type="text" class="form-control" required>
                </div>
                <div class="mt-4 text-end">
                    <button v-if="!isEdit" class="btn btn-primary" @click.prevent="addCategory">Add Category</button>
                    <button v-else class="btn btn-primary" @click="updateCategory">Update Category</button>
                </div>
            </form>
        </div>

        <div>
            <table class="table table-striped table-dark my-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(c, i) in categories" :key="i"> 
                        <td>{{ c.CategoryId }}</td>
                        <td>{{ c.Cat_Name }}</td>
                        <td>{{ c.Description }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editCategory(c)"><i
                                    class="bi bi-pencil-square"></i></button>
                            <button class="ms-3 btn btn-danger" @click="deleteCategory_(c.CategoryId, i)"><i
                                    class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="4">No Categories found</td>
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
            categories: [],
            form: {
                Cat_Name: '',
                Description: '',
            },
            isEmpty: true,
            isEdit: false,
        }
    },
    methods: {
        async getCategoryData() {
            try {
                const response = await axios.get(`${this.baseURL}/category/`);
                return response.data;
            }
            catch (err) {
                console.log(err);
            }
        },
        addCategory() {
            let $this = this;
            const cForm = document.querySelector('form');
            if (!cForm.checkValidity()) {
                cForm.reportValidity();
                cForm.classList.add("was-validated");
                return;
            }
            axios.post(`${this.baseURL}/category/`, this.form)
                .then(response => {
                    $this.categories.push({
                        CategoryId: response.data,
                        Cat_Name: $this.form.Cat_Name,
                        Description: $this.form.Description,
                    });
                    for (let i in $this.form) {
                        $this.form[i] = "";
                    }
                    cForm.classList.remove("was-validated");
                    alert('New category added!');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editCategory(cat) {
            this.isEdit = true;
            this.form.Cat_Name = cat.Cat_Name;
            this.form.Description = cat.Description;
            this.updId = cat.CategoryId;
        },
        updateCategory() {
            let $this = this;
            const cForm = document.querySelector('form')
            if (!cForm.checkValidity()) {
                cForm.reportValidity();
                cForm.classList.add("was-validated");
                return;
            }
            if (this.updId > 0) {
                axios.put(`${this.baseURL}/category/${this.updId}`, this.form)
                    .then(response => {
                        if (response.status === 200) {
                            for (let i in $this.categories) {
                                if ($this.categories[i].CategoryId === $this.updId) {
                                    $this.categories[i].Cat_Name = $this.form.Cat_Name;
                                    $this.categories[i].Description = $this.form.Description;
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
        deleteCategory_(id, index) {
        let $this = this;
        if(!confirm('Are you sure you want to remove category?')) return;
        axios.delete(`${this.baseURL}/category/${id}`)
        .then(response => {
            if(response.status === 200) {
                $this.categories.splice(index, 1);
            }
        })
        .catch(error => {
            console.log(error);
        })
    },
    },
    mounted() {
        this.getCategoryData().then(data => {
            this.categories = data;
            if(this.categories.length > 0) 
                this.isEmpty = false;
        }).catch(error => {
            console.log(error);
        });
    },
}
</script>