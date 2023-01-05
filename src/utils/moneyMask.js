export const moneyMask = (value, country) => {
    value = value.toString().replace('.', '').replace(',', '').replace(/\D/g, '')
  
    const curr = {'en-US': '$', 'pt-BR': 'R$'}
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat(country, options).format(
      parseFloat(value) / 100
    )
    return curr[country] + result
  }

export default moneyMask