import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Customer from '../views/Customer.vue'
import Employee from '../views/Employee.vue'

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
    // {
    //     path: '/category',
    //     name: 'Categories',
    //     component: ''
    // },
    // {
    //     path: '/product',
    //     name: 'Products',
    //     component: ''
    // },
    // {
    //     path: '/supplier',
    //     name: 'Suppliers',
    //     component: ''
    // },
    // {
    //     path: '/shipper',
    //     name: 'Shippers',
    //     component: ''
    // },
    // {
    //     path: '/order',
    //     name: 'Orders',
    //     component: ''
    // },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router