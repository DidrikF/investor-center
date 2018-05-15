<template>
<div class="Navigation scrollable">
	<div class="Navigation__head"><a href="#">Investor Center</a></div>
	<div class="Navigation__user-card">
		<div class="Navigation__user-pic-container">
			<img src="http://via.placeholder.com/40x40" alt="" class="Navigation__user-pic">
		</div>
		<div class="Navigation__user-info-container">
			<div class="Navigation__user-name">Didrik Fleischer</div>
			<div class="Navigation__user-status">Life goes on...</div>
		</div>
	</div>
	<div class="Navigation__container">
		<div class="Navigation__block">
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'dashboard' }"><i class="icon ion-monitor"></i><span class="Navigation__item-text">Dashboard</span></router-link></li>
			</ul>
		</div>
		<div class="Navigation__block">
			<div class="Navigation__block-head"><span class="Navigation__block-title">Analysis</span></div>
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="far fa-file-alt"></i><span class="Navigation__item-text">New Analysis</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-window-restore"></i><span class="Navigation__item-text">Analysis Templates</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="icon ion-social-buffer"></i><span class="Navigation__item-text">Environment Laysers</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="material-icons">timeline</i><span class="Navigation__item-text">Industries</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="far fa-lightbulb"></i><span class="Navigation__item-text">Ideas</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-user"></i><span class="Navigation__item-text">Investor Profile</span></router-link></li>
			</ul>
		</div>
		<div class="Navigation__block">
			<div class="Navigation__block-head"><span class="Navigation__block-title">Tools</span></div>
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="fas fa-university"></i><span class="Navigation__item-text">Knowledge Center</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="far fa-map"></i><span class="Navigation__item-text">Situation Room</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="fas fa-book"></i><span class="Navigation__item-text">Portfolio Management</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="fas fa-database"></i><span class="Navigation__item-text">Resources</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="fas fa-list-ul"></i><span class="Navigation__item-text">Watchlists</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'knowledgeCenter' }"><i class="fas fa-dollar-sign"></i><span class="Navigation__item-text">Personal Finance</span></router-link></li>
			</ul>
		</div>
		<div class="Navigation__block">
			<div class="Navigation__block-head"><span class="Navigation__block-title">Social</span></div>
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="icon ion-network"></i><span class="Navigation__item-text">Social Network</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="icon ion-share"></i><span class="Navigation__item-text">Share</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="far fa-id-card"></i><span class="Navigation__item-text">Your Page</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-users"></i><span class="Navigation__item-text">Groups</span></router-link></li>
			</ul>
		</div>
		<div class="Navigation__block">
			<div class="Navigation__block-head"><span class="Navigation__block-title">Other</span></div>
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-shopping-cart"></i><span class="Navigation__item-text">Store</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="icon ion-ios-book"></i><span class="Navigation__item-text">Documentation</span></router-link></li>
			</ul>
		</div>
		<div class="Navigation__block">
			<ul class="Navigation__list">
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-cog"></i><span class="Navigation__item-text">Settings</span></router-link></li>
				<li><router-link class="Navigation__item" :to="{ name: 'investmentAnalysis' }"><i class="fas fa-sign-out-alt"></i><span class="Navigation__item-text">Logout</span></router-link></li>
			</ul>
		</div>
	</div>
	
</div>
</template>

<script>
	
export default {
	data: () => {
		return {

		}
	},
	methods: {

	}
}

</script>

<style lang="sass" scoped>
	@import "~styles/variables"

	ul
		list-style: none
		margin: 0
		padding: 0

	.scrollable
		overflow-y: scroll //auto 
		max-height: 100vh;
	::-webkit-scrollbar
		background-color: $darkGrey
		width: 6px
	::-webkit-scrollbar-thumb
		background-color: $lightGrey
		border-radius: 2px
		width: 5px
	.Navigation
		font-family: "Roboto"
		font-weight: 300
		position: fixed
		width: 250px
		height: 100%
		margin: 0 !important
		background: $darkGrey
		color: $veryLightGrey
		a
			color:  $veryLightGrey
	.Navigation__head
		background-color: $gray
		width: 244px
		height: 60px
		// Center content
		display: flex;
		align-items: center;
		justify-content: center;
		a	// Center this
			text-decoration: none
			font-size: 22px
	.Navigation__user-card
		margin-left: 12px
		margin-top: 12px
	.Navigation__user-pic-container
		position: relative // position relative to position in normal document flow and preserve the space the elemnt occupied.
		display: inline-block
		border-radius: 50%
		width: 40px
		height: 40px
		overflow: hidden
	.Navigation__user-info-container
		position: absolute // pull element out of normal document flow
		display: inline-block
		padding-left: 25px
	.Navigation__user-pic

	.Navigation__user-name
		font-size: 15px
		color: #EFF3F8
		padding-top: 5px
	.Navigation__user-status
		font-size: 12px
		padding-top: 5px
	.Navigation__container
		margin-top: 20px
	.Navigation__block 
		padding-bottom: 20px
	.Navigation__block-head
		font-size: 13px
		padding: 0 31px 5px 27px
		text-transform: uppercase
		font-weight: 500
		letter-spacing: 0.9px
		color: $ligherGrey
	.Navigation__block-title
		position: relative
		bottom: 4px
		line-height: 20px
	.Navigation__list

	.material-icons
		font-size: 15px
		cursor: pointer
		vertical-align: middle;
		padding-bottom: 2px

	.Navigation__item
		display: block
		position: relative
		margin: 0
		padding: 11.5px 25px 11.5px 25px
		text-decoration: none
		font-size: 14px
		cursor: pointer
		transition: color 0.1s linear 0s,background-color 0.1s linear 0s,opacity 0.1s linear 0s
	.Navigation__item-text
		margin-left: 15px

	.Navigation__item:focus, .Navigation__item:hover, .Navigation__item:active
		color: $almostWhite

	.arrow // Don't know if I'll use this
		float: right
		margin: 0
		padding: 0
		color: $veryLightGrey!important

</style>

