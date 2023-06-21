import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Customer from '../views/Customer.vue'
import Employee from '../views/Employee.vue'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import Supplier from '../views/Supplier.vue'
import Shipper from '../views/Shipper.vue'
import Order from '../views/Order.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/customer',
        name: 'Customers',
        component: Customer
    },
    {
        path: '/employee',
        name: 'Employees',
        component: Employee
    },
    {
        path: '/category',
        name: 'Categories',
        component: Category
    },
    {
        path: '/product',
        name: 'Products',
        component: Product
    },
    {
        path: '/supplier',
        name: 'Suppliers',
        component: Supplier
    },
    {
        path: '/shipper',
        name: 'Shippers',
        component: Shipper
    },
    {
        path: '/order',
        name: 'Orders',
        component: Order
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router