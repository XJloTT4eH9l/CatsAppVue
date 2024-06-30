<script setup lang="ts">
    import { RouterLink } from 'vue-router';

    const overflowReset = () => document.body.style.overflow = '';
</script>

<template>
    <nav class="nav">
        <ul class="nav__list">
            <li class="nav__item">
                <RouterLink @click="overflowReset" class="link" to="/voting">
                    <div class="link__img-container">
                        <img src="../assets/img/vote-table.svg" alt="Voting page"/>
                    </div>
                    <div class="link__button">Voting</div>
                </RouterLink>
            </li>
            <li class="nav__item">
                <RouterLink @click="overflowReset" class="link" to="/breeds">
                    <div class="link__img-container">
                        <img src="../assets/img/pet-breeds.svg" alt="Breeds page"/>
                    </div>
                    <div class="link__button">Breeds</div>
                </RouterLink>
            </li>
            <li class="nav__item">
                <RouterLink @click="overflowReset" class="link" to="/gallery">
                    <div class="link__img-container">
                        <img src="../assets/img/images-search.svg" alt="Galary page"/>
                    </div>
                    <div class="link__button">Gallery</div>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>