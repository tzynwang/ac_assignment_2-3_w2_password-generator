function generatePassword (options) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const symbols = '`~!@$%^&*()-_+={}[]|;:"<>,.?/'

  // 將使用者允許的字元加入collection中
  let collection = []
  for (const key in options) {
    switch (key) {
      case 'lowercase':
        if (options[key] === 'on') collection = collection.concat(lowerCaseLetters.split(''))
        break
      case 'uppercase':
        if (options[key] === 'on') collection = collection.concat(upperCaseLetters.split(''))
        break
      case 'numbers':
        if (options[key] === 'on') collection = collection.concat(numbers.split(''))
        break
      case 'symbols':
        if (options[key] === 'on') collection = collection.concat(symbols.split(''))
    }
  }

  // 移除collection中使用者不想使用的字元
  if (options.exclude) {
    collection = collection.filter(character => {
      return !options.exclude.includes(character)
    })
  }

  if (collection.length === 0) {
    return 'Can\'t generate password, kindly provide valid input.'
  } else {
    let password = ''
    for (let i = 0; i < options.length; i++) {
      password += collection[Math.floor(Math.random() * collection.length)]
    }
    return password
  }
}

module.exports = generatePassword
