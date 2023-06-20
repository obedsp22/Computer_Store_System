<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand">Computer Store System</a>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li> -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                All Information
                            </a>
                            <ul class="dropdown-menu bg-dark">
                                <li><router-link class="dropdown-item" to="/customer">Customers</router-link></li>
                                <li><router-link class="dropdown-item" to="/employee">Employees</router-link></li>
                                <li><router-link class="dropdown-item" to="/category">Categories</router-link></li>
                                <li><router-link class="dropdown-item" to="/product">Products</router-link></li>
                                <li><router-link class="dropdown-item" to="/supplier">Suppliers</router-link></li>
                                <li><router-link class="dropdown-item" to="/shipper">Shippers</router-link></li>
                                <li><router-link class="dropdown-item" to="/order">Orders</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style>
    .dropdown-item {
        color: white;
    }
</style>