<template>
    <footer>
        <p>
            Copyright &copy; {{ year }}
        </p>
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
    p {
        color: white;
        text-align: center;
        padding: 16px;
    }

    footer {
        background-color: black;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
</style>