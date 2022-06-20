export const asyncCallback = async (callback) => {
  return new Promise((resolve, reject) => {
    if (callback) callback()
    setTimeout(() => {
      resolve('done')
    }, 1000)
  })
}

export const reverse = str => {
  return str.split('').reverse().join('')
}

export const toCurrency = num => {       
   // convert to a string, add commas every 3 digits from left to right 
   // by reversing string
   let temp = reverse(num + '')
   temp = temp.replace( /(\d{3})(?=\d)/g, '$1,' )
   return reverse(temp) + ".00"
};

export const hideFigures = str => {
  let temp = str.replace(/\d/g,"X")
  return temp
}