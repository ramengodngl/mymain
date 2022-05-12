


class Calculator {

    constructor(prev, curr) {
        this.prev = prev
        this.curr = curr
        this.clear()
    }

    clear() {
        this.currOper = ""
        this.prevOper = ""
        this.operation = undefined;
    }
    delete() {
        this.currOper = this.currOper.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currOper.includes('.')) return
        this.currOper = this.currOper.toString() + number.toString()

    }

    chooseOper(operation) {
        if (this.currOper === '') return
        if (this.prevOper !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOper = this.currOper
        this.currOper = ''

    }
    compute() {
        let computation;
        const prev = parseFloat(this.prevOper)
        const curr = parseFloat(this.currOper)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOper = computation
        this.operation = undefined
        this.prevOper = ""
    }

    getDisplayNum(number) {
        const strNum = number.toString()
        const interDigit = parseFloat(strNum.split('.')[0])
        const decDigits = strNum.split('.')[1]
        let interDisplay
        if (isNaN(interDigit)) {
            interDisplay = ''
        } else {
            interDisplay = interDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decDigits != null) {
            return `${interDisplay}.${decDigits}`
        } else {
            return interDisplay
        }
    }



    updateDisplay() {
        this.curr.innerText =
            this.getDisplayNum(this.currOper)
        if (this.operation != null) {
            this.prev.innerText = `${this.getDisplayNum(this.prevOper)} ${this.operation}`
        }
        else { this.prev.innerText = '' }
    }
}


const numbers = document.querySelectorAll('[data-number]')
const btnOper = document.querySelectorAll('[data-oper]')
const equalBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-del]')
const prev = document.querySelector('[data-prev]')
const curr = document.querySelector('[data-curr]')
const AC = document.querySelector('[data-AC]')

const calculator = new Calculator(prev, curr)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
btnOper.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOper(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

AC.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})