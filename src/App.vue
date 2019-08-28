<template>
<div class="container">
    <div class="search-bar">
          Search for movies by name: <input class="search" type="text" v-model="keyword" @keyup='searchMovie'>
    </div>
    <div class="filter">
        Search for movies between
        <input type="text" class="rating" v-model="min_rate" @keyup='refresh_page'>
        to<input type="text" class="rating" v-model="max_rate" @keyup='refresh_page'>
        <div class="search-result">This search has <span>{{movie_data_length}}</span> results.</div>
    </div>
    <!-- <router-link :to="'/' + page_num" v-for='page_num in page_number' :key="page_num"><button>{{page_num}}</button></router-link> -->
    <router-link :to="{path: '/'+ page_num, query: {maxRate: max_rate || 10, minRate: min_rate || 0}}" v-for='page_num in page_number' :key="page_num"><button>{{page_num}}</button></router-link>
    <router-view :key="$route.path" :movie_data_passed="movie_data_raw"></router-view>
    <!-- <router-view :movie_data_passed="movie_data" v-for="page_num in page_number" :key="page_num" :name="'' + page_num"></router-view> -->
    <!-- <page :movie_data_passed="movie_data"></page> -->
    <!-- <router-view to="/index" name="index" :movie_data_passed="movie_data"></router-view> -->
</div>
</template>

<script>
// import $ from 'jquery'
// import path from 'path'
import movieData from '@/assets/data/movie_data.json'
import page from './components/page'

export default {
    data () {
        return {
            movie_data: [],
            movie_data_raw: [],
            movie_rate: 0,
            min_rate: null,
            max_rate: null,
            movie_data_length: 0,
            keyword: '',
            page_number: 0
        }
    },
    components: {
      page
    },
    filters: {
        roundRate: function (val) {
            return val.toFixed(2)
        }
    },
    // updated () {
    // },
    created () {
        this.movie_data_raw = movieData
        this.movie_data = this.movie_data_raw.filter(movie => { return movie.movie_rate >= this.$route.query.minRate || 0 & movie.movie_rate <= this.$route.query.maxRate || 10})
        this.movie_data_length = this.movie_data.length
        this.page_number = Math.ceil(this.movie_data_length / 20)
        // this.$router.push('/1')
    },
    watch: {
      movie_data: function (newMovieData, oldMovieData) {
          // location.reload()
      }
    },
    methods: {
        refresh_page_number () {
            this.page_number = Math.ceil(this.movie_data_length / 20)
        },
        refresh_page () {
            if (isNaN(this.max_rate) || !this.max_rate) {
                this.movie_data = this.movie_data_raw.filter(movie => { return movie.movie_rate >= this.min_rate })
            } else if (isNaN(this.min_rate) || !this.min_rate) {
                this.movie_data = this.movie_data_raw.filter(movie => { return movie.movie_rate <= this.max_rate })
            } else {
                this.movie_data = this.movie_data_raw.filter(movie => { return movie.movie_rate >= this.min_rate & movie.movie_rate <= this.max_rate })
            }
            this.movie_data_length = this.movie_data.length
            this.refresh_page_number()
            // this.$router.push('/')
            this.$router.push({path: '/1', query: {maxRate: this.max_rate || 10, minRate: this.min_rate || 0}})
            // this.$router.push('/1')
        },
        searchMovie () {
            let keywords = []
            let l = 0
            let r = 0
            while (r < this.keyword.length) {
                if (this.keyword[r] === ' ' && this.keyword[l] === ' ') {
                    l++
                    r++
                } else if (this.keyword[r] === ' ') {
                    keywords.push(this.keyword.substring(l, r))
                    l = r
                } else {
                    r++
                }
            };
            keywords.push(this.keyword.substring(l, r))
            this.movie_data = this.movie_data_raw.filter(movie => {
                for (let i = 0; i < keywords.length; i++) {
                    if (!movie.movie_name.toLowerCase().includes(keywords[i].toLowerCase())) {
                        return false
                    }
                }
                return true
            })
            this.movie_data_length = this.movie_data.length
            this.refresh_page_number()
        }
    }

}
</script>

<style scoped>
.search-bar {
    margin-top: 1em;
    /* margin-bottom: 1em; */
}
.search {
    padding-left: 5px;
    padding-right: 5px;
    border: none;
    border-bottom: solid 1px #999999;
    outline: none;
}
.filter {
    margin-top: 1em;
}
.rating {
    padding-left: 5px;
    padding-right: 5px;
    width: 3em;
    border: none;
    border-bottom: solid 1px #999999;
    outline: none;
}
.search-result {
    margin-top: 1em;
}
</style>
