<template>
  <div class="TodoList">
      <h4>Todo List</h4>
      <ul>
          <li v-bind:key="index" v-for="(item, index) in items">{{ item.text }}</li>
      </ul>
  </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    text: "Do this now",
                    done: false,
                },
                {
                    text: "Do this now",
                    done: false,
                },
                {
                    text: "Do this now",
                    done: false,
                }
            ]
        }
    }
}
</script>

<style lang="sass" scoped>
    @import "~styles/variables"

    h4
        margin: 0
    .TodoList
        border: 1px solid $darkGrey
        display: inline-block
        padding: 10px

</style>
