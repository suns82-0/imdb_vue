<template>
<div class="container">
    <div class="order row">
        <div class="col-sm-3">movie image</div>
        <div class="col-sm-3">movie name</div>
        <div class="col-sm-3">
            <button class="btn btn-success" @click='orderbyyear'></button>
        </div>
        <div class="col-sm-3">
            <button class="btn btn-success" @click='orderbyrate'></button>
        </div>
    </div>
    <div class="movie-list flex-column">
        <div class="movie row " :key= "index" v-for="(movie,index) in movie_data">
            <div class="movie-image col-sm-2">
                <a :href="'https://www.imdb.com' + movie.movie_link">
                    <img :src="movie.movie_img" alt="" >
                </a>
            </div>
            <div class="movie-name col-sm-4">{{movie.movie_name}}</div>
            <div class="movie-year col-sm-3">{{movie.year}}</div>
            <div class="movie-rate col-sm-3">{{movie.movie_rate | roundRate}}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      movie_data: [],
      sortRateReverse: false,
      sortYearReverse: false,
      id: 0
    }
  },
  props: {
    movie_data_passed: Array
  },
  filters: {
    roundRate: function (val) {
      return val.toFixed(2)
    }
  },
  mounted () {
    console.log(this.movie_data_passed)
    console.log(this.id)
    // this.id = this.$route.params.id
    this.movie_data = this.movie_data_passed.slice(0, Math.min(20, this.movie_data_passed.length))
  },
  methods: {
    orderbyrate () {
      if (this.sortRateReverse) {
        this.movie_data.sort(function (a, b) {
          return a.movie_rate - b.movie_rate
        })
        this.sortRateReverse = !this.sortRateReverse
      } else {
        this.movie_data.sort(function (a, b) {
          return b.movie_rate - a.movie_rate
        })
        this.sortRateReverse = !this.sortRateReverse
      }
    },
    orderbyyear () {
      if (this.sortYearReverse) {
        this.movie_data.sort(function (a, b) {
          return a.year - b.year
        })
        this.sortYearReverse = !this.sortYearReverse
      } else {
        this.movie_data.sort(function (a, b) {
          return b.year - a.year
        })
        this.sortYearReverse = !this.sortYearReverse
      }
    }
  }
}
</script>

<style scoped>

</style>
