const DROP_LIST = document.querySelectorAll('.value__box')
fromCurrency = document.querySelector('.from select')
toCurrency = document.querySelector('.to select')
getButton = document.querySelector('.rate')

for (var i = 0; i < DROP_LIST.length; i++) {
	for (courrencyCode in countryCode) {
		let selected
		if (i == 0) {
			selected = courrencyCode == 'USD' ? 'selected' : ''
		} else if (i == 1) {
			selected = courrencyCode == 'UAH' ? 'selected' : ''
		}
		let optionTag = `<option value="${courrencyCode}" ${selected}>${courrencyCode}</option>`
		DROP_LIST[i].insertAdjacentHTML('beforeend', optionTag)
	}
	DROP_LIST[i].addEventListener('change', e => {
		loadFlag(e.target)
	})
}

window.addEventListener('load', () => {
	getExchangeRate()
})
getButton.addEventListener('click', e => {
	e.preventDefault()
	getExchangeRate()
})

const exchangeIcon = document.querySelector('.drop__list')
exchangeIcon.addEventListener('click', () => {
	let tempCode = fromCurrency.value
	fromCurrency.value = toCurrency.value
	toCurrency.value = tempCode
	getExchangeRate()
})
function getExchangeRate() {
	const AMOUNT = document.querySelector('.main__input'),
		EXCHANGE_RATE_TEXT = document.querySelector('.exchange__rate')
	let amountVal = AMOUNT.value
	if (amountVal == '' || amountVal == '0') {
		AMOUNT.value = '1'
		amountVal = 1
	}
	let url = `https://v6.exchangerate-api.com/v6/99f52bdea060a14dc8c6382d/latest/${fromCurrency.value}`
	EXCHANGE_RATE_TEXT.innerText = 'Getting exchange rate...'
	fetch(url)
		.then(response => response.json())
		.then(result => {
			let exchangeRate = result.conversion_rates[toCurrency.value]
			let totalExchangeRate = (amountVal * exchangeRate).toFixed(2)

			EXCHANGE_RATE_TEXT.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
		})
		.catch(() => {
			EXCHANGE_RATE_TEXT.innerText = 'Something went wrong'
		})
}
