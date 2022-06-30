<template>
	<v-container class="ma-15">
		Main~
		<v-col>
			<v-btn @click="testApi">Api Test</v-btn>
		</v-col>
	</v-container>
</template>

<script lang="ts">
//import Vue from 'vue'
import apiCaller from '@/mixins/apiCaller'
export default apiCaller.extend({
	name: 'IndexPage',
	//mixins: [apiCaller],
	methods: {
		async testApi(): Promise<void> {
			const res: Promise<any> = await this.api_caller_call(
				'GET',
				'https://api.greendongwha.com/backoffice/items/category/get/1',
				null,
				null,
				'',
				'json',
			)
			console.log(res)
		},
	},
})
</script>
