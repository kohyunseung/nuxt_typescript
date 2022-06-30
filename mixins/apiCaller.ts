//import { mapMutations } from 'vuex'
import Vue from 'vue'
import { AxiosRequestConfig, ResponseType } from 'axios'

type TypeApiCaller = {
	method: string
	path: string
	params: object
	query: string
	confType: string
	responseType: ResponseType | 'json'
}

export default Vue.extend({
	data: () => {
		const formConfig: AxiosRequestConfig = {
			withCredentials: false,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				// 'Content-Type': 'multipart/form-data',

				// cache setting
				// 'Cache-Control': 'no-cache',
				// 'Access-Control-Max-Age': 3600,

				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': true,
			},
		}
		const jsonConfig: AxiosRequestConfig = {
			withCredentials: false,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json; charset=UTF-8',

				// cache setting
				'Cache-Control': 'no-cache',
				// 'Access-Control-Max-Age': 3600,

				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Credentials': true,
			},
		}
		return {
			formConfig,
			jsonConfig,
		}
	},
	computed: {
		accessToken(): string {
			// return this.$cookiz.get('accessToken') ? this.$cookiz.get('accessToken') : null
			return '123'
		},
	},
	mounted() {
		// console.log("this.$cookiz.get('accessToken')", this.accessToken)
	},
	methods: {
		async api_caller_call(
			method: string,
			path: string,
			params: object | null,
			query: string | null,
			confType: string,
			responseType: ResponseType = 'json',
		): Promise<any> {
			let res
			let result

			const config: AxiosRequestConfig = confType === 'form' ? this.formConfig : this.jsonConfig
			if (this.accessToken) config.headers.Authorization = `Bearer ${this.accessToken}`

			const apiUrl: string = query !== null && query !== undefined ? `/${path}/${query}` : path

			// form 데이터인경우
			const formData = new FormData()
			if (confType === 'form' && params) {
				for (const entry in Object.entries(params)) {
					formData.append(entry[0], entry[1])
				}
				params = formData
			}
			config.params = params
			config.responseType = responseType
			try {
				console.log(apiUrl)
				if (method === 'GET') res = await this.$axios.$get(apiUrl, config)
				else if (method === 'POST') res = await this.$axios.$post(apiUrl, config)
				else if (method === 'PUT') res = await this.$axios.$put(apiUrl, config)
				else if (method === 'DEL') res = await this.$axios.$delete(apiUrl, config)

				console.log(res)
				if (path.includes('http')) {
					result = res
				} else {
					// 조회값 없음
					if (res.statusCode === 2) {
						result = undefined
					}

					// 토큰 만료
					else if (String(res.statusCode).substring(1, 0) === '3') {
						return this.$router.push('/login')
					} else if (res.statusCode === 1 && res.statusCode !== undefined) {
						// 조회 오류
						console.error('apiCallerRest_error', res)
					} else {
						result = res.data
					}
				}
			} catch (e) {
				console.log(e)
			}

			console.log('apiCallerRest', res)

			return result
		},
	},
})
