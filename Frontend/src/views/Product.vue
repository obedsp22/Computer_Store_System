<template>
    <div class="container">
        <div class="row mt-3">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="form.Name" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Unit</label>
                    <input v-model="form.Unit" type="number" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input v-model="form.Price" type="number" class="form-control" min="0" max="10000" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="form-control" v-model="form.Category" required>
                        <option value="">Choose a category</option>
                        <option v-for="c in categories" :value="c.CategoryId">{{ c.Name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Supplier</label>
                    <select class="form-control" v-model="form.Supplier" required>
                        <option value="">Choose a supplier</option>
                        <option v-for="s in supplier" :value="s.SupplierId">{{ s.Name }}</option>
                    </select>
                </div>
                <div class="text-end mt-4">
                    <button v-if="!isEdit" class="btn btn-primary" @click.prevent="addProduct">Add Product</button>
                    <button v-else class="btn btn-primary" @click="updateProduct">Update Product</button>
                </div>
            </form>
        </div>

        <div>
            <table class="table table-striped table-dark my-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!isEmpty" v-for="(p, i) in products" :key="i">
                        <td>{{ p.Name }}</td>
                        <td>{{ p.Unit }}</td>
                        <td>{{ p.Price }}</td>
                        <td>{{ p.Cat_Name }}</td>
                        <td>{{ p.Sup_Name }}</td>
                        <td>
                            <button class="btn btn-warning" @click="editProduct(p)"><i
                                    class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-danger ms-3" @click="deleteProduct(p.ProductId, i)"><i
                                    class="bi bi-x-circle"></i></button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="text-center fs-5" colspan="6">No products found.</td>
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
            supplier: [],
            products: [],
            form: {
                Name: '',
                Unit: 0,
                Price: 0,
                Category: '',
                Supplier: '',
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
            } catch (err) {
                console.log(err);
            }
        },
        async getSupplierData() {
            try {
                const response = await axios.get(`${this.baseURL}/supplier/`);
                return response.data;
            } catch (err) {
                console.log(err);
            }
        },
        async getProductData() {
            try {
                const response = await axios.get(`${this.baseURL}/product/`);
                return response.data;
            } catch (err) {
                console.log(err);
            }
        },
        addProduct() {
            let $this = this;
            const pForm = document.querySelector('form');
            if (!pForm.checkValidity()) {
                pForm.reportValidity();
                pForm.classList.add("was-validated");
                return;
            }
            if (this.form.Unit < 1 || this.form.Price < 1) {
                alert('You must choose a number equal or greater than 1');
                return;
            }
            axios.post(`${this.baseURL}/product/`, this.form)
                .then(response => {
                    $this.products.push({
                        ProductId: response.data,
                        Name: $this.form.Name,
                        Unit: $this.form.Unit,
                        Price: $this.form.Price,
                        Category: $this.form.Category,
                        Supplier: $this.form.Supplier,
                    });

                    this.form.Prod_Name = "";
                    this.form.Unit = 0;
                    this.form.Price = 0;
                    this.form.Category = '';
                    this.form.Supplier = '';

                    pForm.classList.remove("was-validated");
                    alert('New product added!');
                    location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        editProduct(prod) {
            this.isEdit = true;
            this.form.Name = prod.Name;
            this.form.Unit = prod.Unit;
            this.form.Price = prod.Price;
            this.form.Category = prod.Category;
            this.form.Supplier = prod.Supplier;
            this.updId = prod.ProductId;
        },
        updateProduct() {
            let $this = this;
            const pForm = document.querySelector('form');
            if (!pForm.checkValidity()) {
                pForm.reportValidity();
                pForm.classList.add("was-validated");
                return;
            }
            if (this.form.Unit < 1 || this.form.Price < 1) {
                alert('You must choose a number equal or greater than 1');
                return;
            }
            if (this.updId > 0) {
                axios.put(`${this.baseURL}/product/${this.updId}`, this.form)
                    .then(response => {
                        if (response.status === 200) {
                            for (let i in $this.products) {
                                if ($this.products[i].ProductId === $this.updId) {
                                    $this.products[i].Name = $this.form.Name;
                                    $this.products[i].Unit = $this.form.Unit;
                                    $this.products[i].Price = $this.form.Price;
                                    $this.products[i].Category = $this.form.Category;
                                    $this.products[i].Supplier = $this.form.Supplier;
                                }
                            }

                            this.form.Prod_Name = "";
                            this.form.Unit = 0;
                            this.form.Price = 0;
                            this.form.Category = '';
                            this.form.Supplier = '';

                            pForm.classList.remove("was-validated");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        deleteProduct(id, index) {
            let $this = this;
            if (!confirm('Are you sure you want to delete product?')) return;
            axios.delete(`${this.baseURL}/product/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        $this.products.splice(index, 1);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getCategoryData().then(data => {
            this.categories = data;
        }).catch(err => {
            console.log(err);
        });

        this.getSupplierData().then(data => {
            this.supplier = data;
        }).catch(err => {
            console.log(err);
        });

        this.getProductData().then(data => {
            this.products = data;
            if (this.products.length > 0)
                this.isEmpty = false;
        }).catch(err => {
            console.log(err);
        });
    }
}
</script>