<template>
    <footer>
            Copyright &copy; {{ year }}
    </footer>
</template>

<script>
export default {
    data() {
        return {
            year: '',
        }
    },
    mounted() {
        this.year = new Date().getFullYear()
    }
}
</script>

<style>
    footer {
        color: white;
        text-align: center;
        background-color: black;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 15px;
        width: 100%;
    }
</style>