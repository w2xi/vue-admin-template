<template>
	<div class="container">
		<div class="not-found-wrapper">
			<img src="@/assets/images/404.png" alt="404" />
		</div>
		<div class="tip">页面不见了</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.tip {
		font-size: 14px;
		color: #ABBCEB;
	}
}
</style>