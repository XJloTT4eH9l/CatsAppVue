<script setup lang="ts">
    const emit = defineEmits<{
        (e: 'reload'): void,
    }>();
</script>

<template>
    <div class="error-message">
        <img class="error-message__img" src="../assets/img/sad-cat.gif" alt="Cant find any cat`s">
        <h1 class="error-message__title">Something went wrong ☹</h1>
        <div class="error-message__text">Please try later</div>
        <button @click="emit('reload')" class="error-message__btn filters__get-btn" />
    </div>
</template>

<style lang="scss">
    @import '../assets/variables.scss';

    .error-message {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 20px;
        background-color: $pink_hover;
        width: 400px;
        border-radius: 20px;
        text-align: center;
        @media screen and (max-width: 500px) {
            width: 300px;
        }
        &__img {
            border-radius: 10px;
            margin: 0 auto;
            margin-bottom: 15px;
            @media screen and (max-width: 500px) {
                height: 200px;
            }
        }
        &__title {
            font-size: 25px;
            font-weight: 600;
            margin-bottom: 10px;
        }
        &__text {
            font-size: 16px;
            color: $gray;
            margin-bottom: 10px;
        }
        &__btn {
            margin-right: auto;
            &:hover {
                background-color: $gray_light !important;
            }
        }
    }
</style>