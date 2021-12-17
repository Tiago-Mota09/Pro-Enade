<template>
	<div
		class="autocomplete autocomplete--outlined"
		:class="{ 'autocomplete--focus': focus }"
	>
		<div class="autocomplete__input">
			<label
				class="label"
				:class="{ 'label--active': showLabel, 'label--text': labelWait }"
				>{{ label }}</label
			>
			<input
				type="text"
				@input="onChange"
				v-model="search"
				@keydown.down="onArrowDown"
				@keydown.up="onArrowUp"
				@keydown.enter="onEnter"
				@focus="onFocus"
				@blur="onFocus"
				:disabled="disabled"
			/>

			<button
				v-if="search.length > 0"
				@click="clearField"
				class="autocomplete__button-clear"
			>
				<v-icon :color="focus ? '#1976d2' : 'rgba(0, 0, 0, 0.54)'"
					>close</v-icon
				>
			</button>

			<v-icon v-if="!disabled" :color="focus ? '#1976d2' : ''">{{
				focus ? 'mdi-menu-up' : 'mdi-menu-down'
			}}</v-icon>
		</div>

		<div
			class="autocomplete-results"
			v-if="results.length !== 0 && isHidden"
			v-show="isOpen"
		>
			<table class="table" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th
							v-for="(item, index) in headerCustom"
							:key="`item_custom_header_${index}`"
						>
							{{ item.text }}
						</th>
					</tr>
				</thead>

				<tbody>
					<slot name="items" :results="results" :setResult="setResult" />
				</tbody>
			</table>
		</div>

		<ul
			id="autocomplete-results"
			v-show="isOpen"
			v-if="results.length !== 0 && !isHidden"
			class="autocomplete-results"
		>
			<li
				v-for="(result, i) in results"
				:key="i"
				@click="setResult(result)"
				class="autocomplete-result"
				:class="{ 'is-active': i === arrowCounter }"
			>
				{{ itemText ? result[itemText] : result }}
			</li>
		</ul>
		<ul
			id="autocomplete-results"
			v-show="isOpen"
			v-if="results.length === 0 && !isHidden"
			class="autocomplete-results"
		>
			<li class="autocomplete-result">
				No data available
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'autocomplete',
	props: {
		isHidden: {
			type: Boolean,
		},
		items: {
			type: Array,
			required: false,
			default: () => [],
		},
		headerCustom: {
			type: Array,
			required: false,
			default: () => [],
		},
		label: {
			type: String,
		},
		itemText: {
			type: String,
			required: false,
		},
		isAsync: {
			type: Boolean,
			required: false,
			default: false,
		},
		fnSync: {
			type: Function,
			required: false,
			default: () => {},
		},
		returnObject: {
			type: Boolean,
			default: false,
		},
		value: {
			type: [Object, String, Number],
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			focus: false,
			isOpen: false,
			results: [],
			search: '',
			isLoading: false,
			arrowCounter: 0,
			objSelected: {},
		}
	},
	computed: {
		showLabel() {
			if (this.focus) return true
			if (this.search.length > 0) return true

			return false
		},
		labelWait() {
			if (!this.focus && this.search.length > 0) return true
		},
		showResults() {},
	},
	watch: {
		items: function(val) {
			this.results = val
			this.isLoading = false
		},
		value: {
			handler(val) {
				if (val) return this.handleValue()
				this.search = val
			},
			deep: false,
		},
	},
	mounted() {
		document.addEventListener('click', this.handleClickOutside)
		if (this.value) {
			this.handleValue()
			this.$emit('input', this.value)
			this.$emit('change', this.value)
		}
	},
	methods: {
		onFocus() {
			this.focus = !this.focus
		},
		debouce() {
			clearTimeout(this.searchTimer)
			this.searchTimer = setTimeout(() => {
				this.fnSync(encodeURIComponent(this.search))
			}, 500)
		},
		async onChange() {
			this.$emit('input', this.search)

			if (this.isAsync) {
				this.isLoading = true
				if (this.search.length !== 0) {
					this.debouce()
				}
				this.isLoading = false
				this.results = this.items
				this.isOpen = true
			} else {
				this.filterResults()
				this.isOpen = true
			}
		},

		filterResults() {
			this.results = this.items.filter(item => {
				return item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
			})
		},
		setResult(result) {
			this.objSelected = result
			if (this.itemText) {
				this.search = result[this.itemText]
			}
			if (this.returnObject) {
				this.$emit('input', result)
				this.$emit('change', result)
			}
			this.isOpen = false
		},
		onArrowDown(evt) {
			if (this.arrowCounter < this.results.length) {
				this.arrowCounter = this.arrowCounter + 1
			}
		},
		onArrowUp() {
			if (this.arrowCounter > 0) {
				this.arrowCounter = this.arrowCounter - 1
			}
		},
		onEnter() {
			this.search = this.results[this.arrowCounter]
			this.isOpen = false
			this.arrowCounter = -1
		},
		handleClickOutside(evt) {
			if (!this.$el.contains(evt.target)) {
				this.isOpen = false
				this.arrowCounter = -1
			}
		},
		handleValue() {
			if (typeof this.value === 'object') {
				this.search = this.value[this.itemText]
			} else {
				this.search = String(this.value)
			}
		},
		clearField() {
			if (this.search.length > 0) {
				this.search = ''
				// this.$store.dispatch('search/clearShipTravel')
				// this.$emit('clearInput', this.search)
			}
		},
	},
	destroyed() {
		document.removeEventListener('click', this.handleClickOutside)
	},
}
</script>

<style lang="scss" scoped>
.autocomplete {
	position: relative;
	display: flex;
	flex-direction: column;
	height: auto;
	flex-grow: 1;
	flex-wrap: wrap;
	min-width: 0;
	width: 100%;
	min-height: 56px;
	text-align: left;
	font-size: 16px;
	letter-spacing: normal;
	padding: 0 12px;
	border-radius: 5px;
	transition: 0.2s;
	&--outlined {
		border: 1px solid rgba(0, 0, 0, 0.38);
	}
	&--focus {
		border: 2px solid #1976d2;
	}
	&--filled {
	}
	&__input {
		position: relative;
		height: 56px;
		flex-direction: row;
		display: flex;
		.label {
			position: absolute;
			left: 0;
			right: auto;
			transform-origin: top left;
			height: 20px;
			line-height: 20px;
			letter-spacing: normal;
			top: 18px;
			transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
			z-index: 1;
			max-width: 90%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			pointer-events: none;
			color: rgba(0, 0, 0, 0.6);
			&--active {
				max-width: 133%;
				transform: translateY(-27px) scale(0.75);
				background: #fff;
				color: #1976d2;
				padding-left: 2.5px;
				padding-right: 2.5px;
			}
			&--text {
				color: rgba(0, 0, 0, 0.6);
			}
		}
		input {
			width: 100%;
			height: 100%;
			flex: 1;
			outline: none;
			z-index: 2;
		}
	}
	&__button-clear {
		margin-right: 5px;
		outline: 0;
	}
}

.autocomplete-results {
	padding: 10px 0 10px 0;
	border-radius: 3px;
	margin: 58px 0 0 0;
	right: 0;
	height: auto;
	max-height: 300px;
	overflow: auto;
	width: 100%;
	position: absolute;
	background-color: #ffffff;
	border-color: #ffffff;
	border-top-color: rgb(255, 255, 255);
	border-right-color: rgb(255, 255, 255);
	border-bottom-color: rgb(255, 255, 255);
	border-left-color: rgb(255, 255, 255);
	box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
		0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
	color: rgba(0, 0, 0, 0.87);
	z-index: 9;
	.table {
		width: 100%;
		font-size: 12px;
		thead tr th {
			padding: 0 10px 0 10px;
		}

		tbody tr {
			font-size: 11px;
			cursor: pointer;
			&:hover {
				background: #f1f1f1;
			}
			td {
				padding: 5px 10px 5px 10px;
			}
		}
	}
}

.autocomplete-result {
	list-style: none;
	text-align: left;
	cursor: pointer;
	align-items: center;
	display: flex;
	flex: 1 1 100%;
	letter-spacing: normal;
	min-height: 48px;
	outline: none;
	padding: 0 16px;
	position: relative;
	text-decoration: none;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
	background-color: #f5f5f5;
	color: #000;
}
</style>
