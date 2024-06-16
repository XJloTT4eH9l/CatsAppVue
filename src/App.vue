<script setup lang="ts">
    import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <main class="container">
        <div class="sidebar">
            <RouterLink class="sidebar__home-link" to="/">CatsPaw</RouterLink>
            <h1 class="sidebar__title">Hi!👋</h1>
            <p class="sidebar__description">Explore our app to see some cats</p>
            <nav class="nav">
                <ul class="nav__list">
                    <li class="nav__item">
                        <RouterLink class="link" to="/voting">
                            <div class="link__img-container">
                                <img src="./assets/img/vote-table.svg" alt="Voting page"/>
                            </div>
                            <div class="link__button">Voting</div>
                        </RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink class="link" to="/breeds">
                            <div class="link__img-container">
                                <img src="./assets/img/pet-breeds.svg" alt="Breeds page"/>
                            </div>
                            <div class="link__button">Breeds</div>
                        </RouterLink>
                    </li>
                    <li class="nav__item">
                        <RouterLink class="link" to="/gallery">
                            <div class="link__img-container">
                                <img src="./assets/img/images-search.svg" alt="Galary page"/>
                            </div>
                            <div class="link__button">Gallery</div>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="main-content">
            <RouterView />
        </div>
    </main>
</template>
