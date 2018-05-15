<template>
    <div class="SidePanel scrollable">
        <div class="SidePanel__head"><span class="SidePanel__head-text">Side Panel</span></div>
        <div class="SidePanel__widget-container">
            <div class="SidePanel__widget" v-bind:key="index" v-for="(widget, index) in widgets">{{ widget }}</div>
        </div>
    </div>
  
</template>

<script>
export default {
  data () {
      return {
          widgets: [
              "Widget 1",
              "Widget 2",
              "Widget 3",
          ]
      }
  }
}
</script>

<style lang="sass" scoped>
    @import "~styles/variables"
    .SidePanel
        display: flex
        border-left: 1px solid $darkGrey
        flex-direction: column // not sure if this is correct.
    .SidePanel__head
        width: 100%
        height: 60px
        display: flex
        align-items: center
        justify-content: center
        background-color: $lightGrey
    .SidePanel__head-text
        font-size: 20px
        color: $veryLightGrey
    .SidePanel__widget-container

    .SidePanel__widget
        height: 200px
        text-align: center
        padding-top: 20px
        border: 1px solid $veryLightGrey
        margin: 2px
        
</style>
