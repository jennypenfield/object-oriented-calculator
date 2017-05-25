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

    this._OPERATORS = ['+', '-', '*', '/', '=']
  }
  // ---------------------------------------------------------------------------
  // Public Methods
  // ---------------------------------------------------------------------------

  press (button) {
    if (button === 'lock') {
      this._isLocked = !this._isLocked
      // TODO: toggle the button from "LOCK" to "UNLOCK" or vice versa
      this._updateLockBtn()
      return
    }

    if (button === 'backspace') {
      this.backspace()
      return
    }
    if (button === 'clearAll') {
      this.clearAll()
      this.updateTextField()
      return
    }
    if (button === '=') {
      this._calculate()
      this.updateTextField()
      return
    }
    if (this._OPERATORS.includes(button)) {
      this._numOperArray.push(button)
      return
    }
    if (this._isValidNumOrDecPt(button)) {
      if (this._numOperArray.length === 0) {
        this._numOperArray.push(button + '')
      } else if (this._numOperArray.length === 1) {
        this._numOperArray[0] += button
      } else if (this._numOperArray.length === 2) {
        this._numOperArray.push(button + '')
      } else if (this._numOperArray.length === 3) {
        this._numOperArray[2] += button
      }

      this.updateTextField()
      return
    }
  }
  updateTextField () {
    $('#' + this._elId + ' .display').html(this.value())
  }
  backspace () {
    this._numOperArray.pop()
    $('#' + this._elId + ' .display').html(this._numOperArray)
  }
  clearAll () {
    this._numOperArray = []
    this.value()
  }
  displayTotal () {
    $('#' + this._elId + ' .display').html(this.value())
  }
  value () {
    // return null if the user has not pressed anything yet
    if (this._numOperArray.length === 0) return null

    // if there is only one value, return it
    if (this._numOperArray.length === 1) return parseFloat(this._numOperArray[0])

    // this is not right
    return parseFloat(this._currentValue)
  }

  _calculate () {
    // make a copy of the input Array
    let tempArray = []
    for (let i = 0; i < this._numOperArray.length; i++) {
      tempArray.push(this._numOperArray[i])
    }

    // _numOperArray is the main array
    // Copy _numOperArray into tempArray to do math operations since _numOperArray is modified.
    // Store total in _numOperArray[0]. Splice _numOperArray[1] & _numOperArray[2]
    let firstNum = parseFloat(tempArray[0])
    let operator = tempArray[1]
    let secondNum = parseFloat(tempArray[2])

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
  }

  lock () {
    this._isLocked = true
    this._$el.addClass('locked')
  }

  unlock () {
    this._isLocked = false
    this._$el.removeClass('locked')
  }

  // ---------------------------------------------------------------------------
  // Private functions
  // ---------------------------------------------------------------------------
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
    if (numArray.includes(parseFloat(input)) || input === '.') {
      return true
    }
    return false
  }
  _addEvents () {
    let that = this
    $('#' + this._elId + ' .btn').click(function (evt) {
      // console.dir(this)
      var btnVal = evt.target.dataset.btnVal
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

      <button class="btn" data-btn-val="backspace">CE</button>
      <button class="btn lock-btn" data-btn-val="lock">LOCK</button>
      <button class="btn clear-all" data-btn-val="clearAll">C</button>
      </div>`
  }

} // end Calculator class
// !!!!! NO CODE BELOW THIS LINE !!!!!!
