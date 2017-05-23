// !!!!! NO CODE ABOVE THIS LINE !!!!!!
/* global $ */

class Calculator {
  constructor (calculatorId) {
    let el = $(`#${calculatorId}`)
    if (!el) {
      window.alert('Not a valid calculator ID. Try again.')
      return null
    }
    this.id = calculatorId

    el.innerHTML = this._renderHTML()
    this._numOperArray = []
    this._addEvents()
  }
  // ---------------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------------
  press (calculatorInput) {
    this.input = calculatorInput
    if (this.input === 'backspace') {
      this.backspace()
    }
    if (this.input === 'clearAll') {
      this.clearAll()
      this.updateTextField()
    }
    if (this.input === '=') {
      this.updateTextField(this.value())
    }
    this._numOperArray.push(this._getValidInput(this.input))
    this.updateTextField(this.input)
  }

  _getValidInput (calculatorInput) {
    let validOperators = ['+', '-', '*', '/', '=']
    let origInput = calculatorInput
    let input = parseFloat(calculatorInput)
    if (validOperators.includes(calculatorInput)) {
      return origInput
    }
    if (typeof input === 'number') {
      return input
    }
    return
  }
  updateTextField () {
    $('#display').html(this.value())
  }

  backspace () {
    this._numOperArray.pop()
    $('#display').html(this._numOperArray)
  }

  clearAll () {
    this._numOperArray = []
    this.value()
  }

  displayTotal () {
    $('#display').html(this.value())
  }

  value () {
    console.log('hi')
    let inputArray = this._numOperArray
    if (this._numOperArray.length === 0) {
      return null
    }
    if (this._numOperArray.length === 1) {
      return inputArray[0]
    }
    let operator = this._numOperArray[1]
    if (operator === '+') {
      return this.add(inputArray[0], inputArray[2])
    } else if (operator === '-') {
      return this.subtract(inputArray[0], inputArray[2])
    } else if (operator === '*') {
      return this.multiply(inputArray[0], inputArray[2])
    } else if (operator === '/') {
      return this.divide(inputArray[0], inputArray[2])
    }
  }
  add (numInput1, numInput2) {
    return numInput1 + numInput2
  }
  subtract (numInput1, numInput2) {
    return numInput1 - numInput2
  }
  multiply (numInput1, numInput2) {
    return numInput1 * numInput2
  }
  divide (numInput1, numInput2) {
    return numInput1 / numInput2
  }
  lock () {
    $('.btn').prop('disabled', true)
    // $('.btn').attr('id', 'locked')
  }
  unlock () {
    $('btn').prop('disabled', false)
    $('btn').prop('id', 'null')
  }
  // ---------------------------------------------------------------------------
  // Private functions
  // ---------------------------------------------------------------------------

  _addEvents () {
    let id = this.id
    let thisBtn = this
    $('#' + id + ' .btn').click(this.press.bind(thisBtn.inputBtn))
  }
  _renderHTML () {
    $('body').append(this._createHTML())
  }
  _createHTML () {
    return `<div class="output-row">
      <div class="answer-field" id="display"></div>
      </div>
      <button class="btn" inputBtn="7">7</button>
      <button class="btn" inputBtn="8">8</button>
      <button class="btn" inputBtn="9">9</button>
      <button class="btn lighter-green" inputBtn="/">/</button><br/>

      <button class="btn" inputBtn="4">4</button>
      <button class="btn" inputBtn="5">5</button>
      <button class="btn" inputBtn="6">6</button>
      <button class="btn lighter-green" inputBtn="*">x</button><br/>

      <button class="btn" inputBtn="1">1</button>
      <button class="btn" inputBtn="2">2</button>
      <button class="btn" inputBtn="3">3</button>
      <button class="btn lighter-green" inputBtn="-">-</button><br/>

      <button class="btn" inputBtn="0">0</button>
      <button class="btn" inputBtn=".">.</button>
      <button class="btn" inputBtn="=">=</button>
      <button class="btn lighter-green" inputBtn="+">+</button><br/>

      <button class="btn backspace" value="backspace">CE</button>
      <button class="btn clear-all" value="clearAll">C</button>`
  }

}
// !!!!! NO CODE BELOW THIS LINE !!!!!!
