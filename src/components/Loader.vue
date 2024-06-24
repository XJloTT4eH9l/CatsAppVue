<template>
    <div class="loader" />
</template>

<style scoped lang="scss">
    @import '../assets/variables.scss';

    .loader {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: inline-block;
        border-top: 3px solid $pink_hover;
        border-right: 3px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>