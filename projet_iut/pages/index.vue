<template>
    <h1>Liste des forums</h1>

    <ul v-if="!loading">
        <li v-for="f in forums">
            <nuxt-link :to="'/forum/' + f.id"><div>
                <h2>{{ f.title }}</h2>
                <p>{{ f.description }}</p>
            </div></nuxt-link>
        </li>
    </ul>
    <div v-if="loading">
        <p>Chargement...</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            forums: []
        }
    },
    async mounted() {
        await fetch('http://localhost:3000/api/forum')
            .then(response => response.json())
            .then(data => {
                this.forums = data
            })

        if(this.forums.statusCode !== 200) {
            console.log(this.forums.statusCode)
            await fetch('http://localhost:3000/api/init',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })

            await fetch('http://localhost:3000/api/forum')
                .then(response => response.json())
                .then(data => {
                    this.forums = data
                })
        }
        
        this.forums = this.forums.forums
        
        this.loading = false;

    }
}
</script>

<style>

</style>