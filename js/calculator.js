// !!!!! NO CODE ABOVE THIS LINE !!!!!!
/* global $ */

class Calculator {
  constructor (calculatorId) {
    let $el = $(`#${calculatorId}`)
    if (!$el) {
      window.alert('Not a valid calculator ID. Try again.')
      return null
    }

    this._$el = $el
    this._elId = calculatorId

    $el.html(this._renderHTML())
    this._numOperArray = []
    this._addEvents()

    this._isLocked = false
    this._inputNum = ''
    this._currentValue = null
    this._mustBeOperator = false

    this._OPERATORS = ['+', '-', '*', '/', '=']
  }
  // ---------------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------------

  press (button) {
    if (button === 'lock') {
      if (this._isLocked) {
        this.unlock()
      } else {
        this.lock()
      }
    }
    if (!this._isLocked) {
      if (button === 'backspace') {
        this.backspace()
        return
      }
      if (button === 'clearAll') {
        this.clearAll()
        return
      }
      if (button === '=') {
        this._calculate()
        this.updateTextField(this.value())
        return
      }
      if (this._OPERATORS.includes(button)) {
        // check for double operators
        if (this._OPERATORS.includes(this._numOperArray[this._numOperArray.length - 1])) {
          return
        }
        this._numOperArray.push(button)
        return
      }
      if (this._isValidNumOrDecPt(button)) {
        if (this._mustBeOperator) {
          this._numOperArray = []
          this._mustBeOperator = false
        }
        if (this._numOperArray.length === 0) {
          this._numOperArray.push(button + '')
          this.updateTextField(button)
        } else if (this._numOperArray.length === 1) {
          this._numOperArray[0] += button
          this.updateTextField(this._numOperArray[0])
        } else if (this._numOperArray.length === 2) {
          this._numOperArray.push(button + '')
          this.updateTextField(button + '')
        } else if (this._numOperArray.length === 3) {
          this._numOperArray[2] += button
          this.updateTextField(this._numOperArray[2])
        }
        return
      }
    }
  }
  pressButton (button) {
    return this.press(button)
  }
  updateTextField (input) {
    $('#' + this._elId + ' .display').html(input)
  }
  backspace () {
    // do nothing if nothing has been entered into the calculator
    if (this._numOperArray.length === 0) return
    let currentIndex = this._numOperArray.length - 1
    // get length of string minus one for the substr method
    let substrLength = this._numOperArray[currentIndex].length - 1
    this._numOperArray[currentIndex] = this._numOperArray[currentIndex].substr(0, substrLength)
    $('#' + this._elId + ' .display').html(this._numOperArray[currentIndex])
  }
  clearAll () {
    this._numOperArray = []
    this.updateTextField(this.value())
  }
  displayTotal () {
    $('#' + this._elId + ' .display').html(this.value())
  }
  value () {
    // return null if the user has not pressed anything yet
    if (this._numOperArray.length === 0) return null

    // if there is only one value, return it
    if (this._numOperArray.length === 1) return parseFloat(this._numOperArray[0])

    return this._currentValue
  }

  lock () {
    this._isLocked = true
    this._$el.addClass('locked')
    this._updateLockBtn()
    return
  }

  unlock () {
    this._isLocked = false
    this._$el.removeClass('locked')
    this._updateLockBtn()
    return
  }
  toString () {
    return this._numOperArray.join(' ')
  }
  sayHello () {
    this._numOperArray = [0.7734]
  }
  destroy () {
    this._$el.remove()
  }

  // ---------------------------------------------------------------------------
  // Private functions
  // ---------------------------------------------------------------------------
  _calculate () {
    let firstNum = parseFloat(this._numOperArray[0])
    let operator = this._numOperArray[1]
    let secondNum = parseFloat(this._numOperArray[2])

    if (operator === '+') {
      this._currentValue = this._add(firstNum, secondNum)
    } else if (operator === '-') {
      this._currentValue = this._subtract(firstNum, secondNum)
    } else if (operator === '*') {
      this._currentValue = this._multiply(firstNum, secondNum)
    } else if (operator === '/') {
      this._currentValue = this._divide(firstNum, secondNum)
    }
    this._numOperArray = [this._currentValue + '']
    this._mustBeOperator = true
  }
  _updateLockBtn () {
    if (this._isLocked) {
      $('#' + this._elId + ' .lock-btn').html('UNLOCK')
    } else {
      $('#' + this._elId + ' .lock-btn').html('LOCK')
    }
  }
  _add (numInput1, numInput2) {
    return numInput1 + numInput2
  }
  _subtract (numInput1, numInput2) {
    return numInput1 - numInput2
  }
  _multiply (numInput1, numInput2) {
    return numInput1 * numInput2
  }
  _divide (numInput1, numInput2) {
    return numInput1 / numInput2
  }
  _isValidNumOrDecPt (input) {
    let numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    if (input === '.') {
      if (this._numOperArray.length === 0 || this._numOperArray.length === 2) {
        return true
      } else {
        let currentIndex = this._numOperArray.length - 1
        if (this._numOperArray[currentIndex].substr(this._numOperArray[currentIndex].length - 1) === '.') {
          return false
        } else return true
      }
    }
    if (numArray.includes(parseInt(input))) {
      return true
    }
    return false
  }
  _addEvents () {
    let that = this
    $('#' + this._elId + ' .btn').click(function (evt) {
      let btnVal = evt.target.dataset.btnVal
      that.press(btnVal)
    })
  }
  _renderHTML () {
    return `<div class="output-row">
      <div class="answer-field display"></div>
      </div>
      <button class="btn" data-btn-val="7">7</button>
      <button class="btn" data-btn-val="8">8</button>
      <button class="btn" data-btn-val="9">9</button>
      <button class="btn lighter-green" data-btn-val="/">/</button><br/>

      <button class="btn" data-btn-val="4">4</button>
      <button class="btn" data-btn-val="5">5</button>
      <button class="btn" data-btn-val="6">6</button>
      <button class="btn lighter-green" data-btn-val="*">x</button><br/>

      <button class="btn" data-btn-val="1">1</button>
      <button class="btn" data-btn-val="2">2</button>
      <button class="btn" data-btn-val="3">3</button>
      <button class="btn lighter-green" data-btn-val="-">-</button><br/>

      <button class="btn" data-btn-val="0">0</button>
      <button class="btn" data-btn-val=".">.</button>
      <button class="btn" data-btn-val="=">=</button>
      <button class="btn lighter-green" data-btn-val="+">+</button><br/>

      <button class="btn backspace-btn" data-btn-val="backspace">CE</button>
      <button class="btn lock-btn" data-btn-val="lock">LOCK</button>
      <button class="btn clear-all" data-btn-val="clearAll">C</button>
      </div>`
  }

} // end Calculator class
// !!!!! NO CODE BELOW THIS LINE !!!!!!
