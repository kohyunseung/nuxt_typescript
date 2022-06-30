<template>
	<v-app-bar fixed>
		<v-container>
			<v-row class="ma-0">
				<v-col class="pa-0"> 로고영역 </v-col>
				<v-spacer />
				<v-row class="ma-0 d-flex">
					<v-col v-for="(menu, index) in menuItems" :key="index" class="pa-0">
						{{ menu.title }}
					</v-col>
				</v-row>
				<v-spacer />
				<v-row class="ma-0">
					<v-col class="pa-0"> 우측 정보 영역 </v-col>
				</v-row>
			</v-row>
		</v-container>
	</v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'LayoutAppbar',
	data: () => {
		const menuItems: object[] = []
		return {
			menuItems,
		}
	},
	created() {
		this.initMenuItems()
	},
	methods: {
		initMenuItems(): void {
			for (let i = 0; i < 10; i++) {
				const title: string = i.toString()
				this.menuItems.push({
					title,
				})
			}
		},
	},
})
</script>
