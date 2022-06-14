class ListNode {
  constructor(value, parent){ 
    this.value = value
    this.parent = parent
    this.child = null
  }
}

class Calculator {
  constructor() {
    this.head = null
    this.last = null
  }

  // List manipulation
  initNode = (num) => {
    const initNode = new ListNode(num, null)
    this.head = initNode
    this.last = initNode
  }

  addNode = (val) => {
    const newNode = new ListNode(val, this.last)
    this.last.child = newNode
    this.last = newNode
  }

  addNumber = (val) => { this.last.value += val }

  delLastNode = () => {
    this.last = this.last.parent
    this.last.child = null
  }

  delLastNumber = () => {
    this.last.value = this.last.value.slice(0, -1)
    if(this.last.value === ''){
      this.resetCalc()
    }
  }

  // misc
  calculate = () => {
    let current = this.head

    while(current.parent || current.child){
      
      if(current.value === '*' || current.value === '/'){
        const xNode = current.parent
        const yNode = current.child

        xNode.value = current.value === '/'
          ? (Math.round(parseInt(xNode.value) / parseInt(yNode.value))).toString()
          : (Math.round(parseInt(xNode.value) * parseInt(yNode.value))).toString()

        xNode.child = yNode.child

        current = xNode
        continue

      }
      
      if(!current.child){
        const opNode = current.parent
        const xNode = opNode.parent  

        xNode.value = opNode.value === '-' 
          ? (parseInt(xNode.value) - parseInt(current.value)).toString()
          : (parseInt(xNode.value) + parseInt(current.value)).toString()
        xNode.child = null
        
        current = xNode
        continue
      }

      current = current.child
    }
    this.last = this.head

  }

  lastNodeIsNumber = () => (
    this.last !== null && !['+', '-', '*', '/'].includes(this.last.value)
  )

  resetCalc = () => {
    this.head = null
    this.last = null
  }

  printList = () => {
    let current = this.head
    while(current !== null){
      console.log(current.value)
      current = current.child
    }
    console.log('END')
  }
}

const calculator = new Calculator()

// Helpers
function updateDisplay(){
  let result = ''
  let current = calculator.head

  while(current !== null){
    result += current.value
    current = current.child
  }
  
  document.getElementById('calc-displaytext').value = result
}

// Events
function handleNumber(num) {
  // Handle initial number
  if(calculator.head === null) {
    calculator.initNode(num)
    updateDisplay()
    return
  }

  if(calculator.lastNodeIsNumber()){
    calculator.addNumber(num)
  } else {
    calculator.addNode(num)
  }

  updateDisplay()
}

function handleOp(op) {
  if(calculator.lastNodeIsNumber()){
    calculator.addNode(op)
    updateDisplay()
  }
}

function handleDel() {  
  if(calculator.head !== null){
    if (calculator.lastNodeIsNumber()) calculator.delLastNumber()
    else calculator.delLastNode()
    
    updateDisplay()
  }
}

function handleSubmit() {
  if(calculator.lastNodeIsNumber()){
    calculator.calculate()
    updateDisplay()
  }
  calculator.printList()
}

