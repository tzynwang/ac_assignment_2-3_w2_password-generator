const elementObject = {
  form: document.querySelector('form'),
  excludeCharacter: document.querySelector('#exclude'),
  resetButton: document.querySelector('#resetButton'),
  password: document.querySelector('#passwordOutput'),
  copyButton: document.querySelector('i.copy')
}

const data = {
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
}

const view = {
  displayHint (message) {
    window.alert(message)
  },
  resetAllInputs () {
    // uncheck checkbox
    const checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
    checkedItem.forEach((item) => {
      item.checked = false
    })
    document.querySelector('#length').value = ''
    document.querySelector('#exclude').value = ''
  }
}

const controller = {
  passwordExistVerify (password) {
    return password.trim().length !== 0
  },
  allowedCharacters (checkedItem) {
    const excludeCharacter = elementObject.excludeCharacter.value
    let allowedCharacters = []
    if (checkedItem.length === 1 && checkedItem[0].id === 'numbers') {
      allowedCharacters = data.numbers.filter(number => !excludeCharacter.includes(number))
      return allowedCharacters
    } else {
      return 'pass'
    }
  },
  copyPassword () {
    const range = document.createRange()
    range.selectNode(elementObject.password)
    window.getSelection().removeAllRanges() // clear current selection
    window.getSelection().addRange(range) // select text
    document.execCommand('copy')
    window.getSelection().removeAllRanges() // deselect
    view.displayHint('Password has been copied to clipboard 😊')
  }
}

// form verify
elementObject.form.addEventListener('submit', (event) => {
  const checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
  if (checkedItem.length === 0) {
    event.preventDefault()
    view.displayHint('Kindly select at least one option 🥺')
    return
  }

  const allowedCharacters = controller.allowedCharacters(checkedItem)
  if (allowedCharacters.length === 0) {
    event.preventDefault()
    view.displayHint('All allowed character are considered as excluded 🥺')
  }
})

// copy password
elementObject.copyButton.addEventListener('click', () => {
  const password = elementObject.password.innerText
  controller.passwordExistVerify(password)
    ? controller.copyPassword(password)
    : view.displayHint('Password hasn\'t been generated yet 🥺')
})

// reset
elementObject.resetButton.addEventListener('click', () => {
  view.resetAllInputs()
})
