<template>
    <div class="container">
        <div class="mt-3 row">
            <form class="offset-sm-3 col-sm-6">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890"
                        required>
                </div>
                <div class="mt-4 text-end">
                    <button class="btn btn-primary" @click.prevent="">Add New Shipper</button>
                    <button class="btn btn-primary ms-3" @click="">Update Shipper</button>
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="text-center fs-5" colspan="3">No shippers found.</td>
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

        }
    }
}
</script>