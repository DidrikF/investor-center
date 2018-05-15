<template>
    <div class="Dashboard__container">
        <div class="Dashboard__widget-header">Widget Header</div>
        <div class="Dashboard__widget widget1">1</div>
        <div class="Dashboard__widget widget2">2</div>
        <div class="Dashboard__widget widget3">3</div>
        <div class="Dashboard__widget widget4">4</div>
        <div class="Dashboard__widget widget5">5</div>
        <div class="Dashboard__widget widget6">6</div>
        <div class="Dashboard__widget widget7">7</div>
        <div class="Dashboard__widget widget8">8</div>
        <div class="Dashboard__widget widget9">9</div>
    </div>
</template>

<script>
    
</script>

<style lang="sass" scoped>
    .Dashboard__container
        display: grid
        grid-template-columns: repeat(3, minmax(100px, 1fr))
        grid-auto-rows: minmax(100px, auto)
        grid-gap: 10px
        //align-items: start/end //puts elements at the top/bottom and makes them only take up the space they require. stretch is the default option
        //justify-items: start //end //pull things to the left or right
        grid-template-areas: "header header header" "w1 w2 w3" "w4 w5 w6" "w7 w8 w9" // . means to leave the cell empty
            
    .Dashboard__widget // I think the width and hight is ingerieted from the grid specs
        background: grey
        text-align: center

    .Dashboard__widget-header
        grid-area: header
    .widget1
        gird-area: w1
    .widget2
        gird-area: w2
    .widget3
        gird-area: w3
    .widget4
        gird-area: w4
    .widget5
        gird-area: w5
    .widget6
        gird-area: w6
    .widget7
        gird-area: w7
    .widget8
        gird-area: w8
    .widget9
        gird-area: w9

    
    // Use min width with increading width going down
    @media screen and(min-width: 840px)
        // grid-template-areas: "header header header""w1 w2 w3""w4 w5 w6""w7 w8 w9" //set new layout of the grid at different screen size


</style>
