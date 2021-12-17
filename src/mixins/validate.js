let required = v => !!v || 'Campo obrigatório'
let boolean = v => [true, false].includes(v) || 'Campo obrigatório'

let maxLength = maxLength => {
	return v => (v && v.length <= maxLength) || `Excedeu ${maxLength} caracteres`
}

let maxValue = maxValue => {
	return v =>
		(v >= 10 && v <= maxValue) || `Digite um valor entre 10 e ${maxValue}`
}

let rangeValue = (minValue, maxValue) => {
	return v =>
		(v >= minValue && v <= maxValue) ||
		`Digite um valor entre ${minValue} e ${maxValue}`
}

let passwordValue = (minValue, maxValue) => {
	return v =>
		(v && v.length >= minValue && v.length <= maxValue) ||
		`Sua senha deve ter de ${minValue} e ${maxValue} caracteres`
}

export default {
	data: () => ({
		requiredRules: [required],
		requiredBoolean: [boolean],
		emailRules: [
			required,
			v =>
				/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g.test(v) ||
				'E-mail deve ser válido',
		],
		greaterThanZero: [
			required,
			v => (v && v.replace(/\D+/g, '') > 0) || 'Valor deve ser maior que zero',
		],
		urlRules: [
			required,
			v =>
				/^(www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(\.{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
					v
				) || 'O campo deve ser uma url válida',
		],
		passwordLengthRules: [required, passwordValue(6, 8)],
		maxLength100: [required, maxLength(100)],
		maxLength50: [required, maxLength(50)],
		maxLength500: [required, maxLength(500)],
		cpfRules: [
			required,
			cpf => {
				cpf = cpf || ''
				cpf = cpf.replace(/\.|\-/g, '')
				let message = 'CPF deve ser válido'
				var numeros, digitos, soma, i, resultado, digitosIguais
				digitosIguais = 1
				if (cpf.length < 11) return message
				for (i = 0; i < cpf.length - 1; i++) {
					if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
						digitosIguais = 0
						break
					}
				}

				if (!digitosIguais) {
					numeros = cpf.substring(0, 9)
					digitos = cpf.substring(9)
					soma = 0
					for (i = 10; i > 1; i--) {
						soma += numeros.charAt(10 - i) * i
					}
					resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
					if (resultado !== parseInt(digitos.charAt(0))) return message
					numeros = cpf.substring(0, 10)
					soma = 0
					for (i = 11; i > 1; i--) {
						soma += numeros.charAt(11 - i) * i
					}
					resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
					if (resultado !== parseInt(digitos.charAt(1))) return message
					return true
				} else {
					return message
				}
			},
		],
		cnpjRules: [
			required,
			cnpj => {
				cnpj = cnpj.replace(/[^\d]+/g, '') || ''
				let message = 'CNPJ deve ser válido'
				let numeros, tamanho, digitos, soma, i, resultado, pos, digitosIguais
				digitosIguais = 1
				if (cnpj === '') return message

				if (cnpj.length !== 14) return message
				for (i = 0; i < cnpj.length - 1; i++) {
					if (cnpj.charAt(i) !== cnpj.charAt(i + 1)) {
						digitosIguais = 0
						break
					}
				}

				if (!digitosIguais) {
					tamanho = cnpj.length - 2
					numeros = cnpj.substring(0, tamanho)
					digitos = cnpj.substring(tamanho)
					soma = 0
					pos = tamanho - 7
					for (i = tamanho; i >= 1; i--) {
						soma += numeros.charAt(tamanho - i) * pos--
						if (pos < 2) pos = 9
					}
					resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
					if (resultado !== parseInt(digitos.charAt(0))) return message

					tamanho = tamanho + 1
					numeros = cnpj.substring(0, tamanho)
					soma = 0
					pos = tamanho - 7
					for (i = tamanho; i >= 1; i--) {
						soma += numeros.charAt(tamanho - i) * pos--
						if (pos < 2) pos = 9
					}
					resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
					if (resultado !== parseInt(digitos.charAt(1))) return message

					return true
				} else {
					return message
				}
			},
		],
		maxValue90: [required, maxValue(90)],
		maxValue60: [required, maxValue(60)],
		maxValue30: [required, maxValue(30)],
		maxDayMediation: [required, rangeValue(20, 60)],
		multipleRules: [
			v => {
				return (
					(v &&
						((Array.isArray(v) && v.length > 0) ||
							Object.keys(v).length > 0)) ||
					'Campo obrigatório'
				)
			},
		],
		phoneRules: [
			v => {
				const number = v && v.number ? v.number : v
				return (number && number.length > 0) || 'Campo obrigatório'
			},
		],
		cepRules: [
			v => {
				if (typeof v === 'object') {
					return (v && v.zipCode && v.zipCode.length > 0) || 'Campo obrigatório'
				} else if (typeof v === 'string') {
					return (v && v.length > 0) || 'Campo obrigatório'
				}
			},
		],
		avatarRules: [
			value =>
				!value ||
				value.size < 2000000 ||
				'Tamanho da imagem deve ter menos de 2MB!',
		],
		percentageRules: [
			v => (v >= 0 && v <= 100 && v !== '') || 'Digite um valor percentual',
		],
		dateRules: [
			required,
			// v => /^(0[1-9]|[12][0-9]|3[01])(?:(0[1-9]|1[012])(201)[2-9]{1})$/g.test(v) || 'A data deve ser válida'
		],
		numberRules: [required, v => /^\d+$/g.test(v) || 'Digite um número válido'],
		currencyRules: [required, v => v !== '0,00' || 'Campo obrigatório'],
		environmentRules: [
			required,
			v =>
				v !== 'live' || v !== 'test' || 'Valores aceitos são "live" ou "test"',
		],
		fullnameRules: [
			required,
			// v => /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/g.test(v) || 'Campo deve possuir nome e sobrenome'
		],
	}),
}
