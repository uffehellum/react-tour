// uffe @ 2018-03-08
// from plural sight class Samer Buna -- REACT getting started
// Paste into https://jscomplete.com/repl/

const Stars = (props) => {
	return (
    <div className="col-5">
    	{_.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star" />)}
    </div>
  )
}

const Button = (props) => {
	let button
  switch (props.answerIsCorrect) {
  	case true:
    	button =
      	<button className="btn btn-success" onClick={props.acceptAnswer} >
    			<i className="fa fa-check" />
    		</button>     	
      break
    case false:
    	button =
      	<button className="btn btn-danger">
    			<i className="fa fa-times" />
    		</button>     	
    	break
    default:
			button =   	
      	<button className="btn" 
        	onClick={props.checkAnswer}
        	disabled={props.selectedNumbers.length === 0}>
    			=
    		</button> 
    	break
  }
  return (
    <div className="col-2"> 
    	{button}
      <br />
      <br />
      <button 
      	className="btn btn-warning btn-sm" 
        onClick={props.redrawNow}
        disabled={props.redraws ===0}>
      	<i className="fa fa-recycle"></i> {props.redraws}
      </button>
    </div>
    )
}

const DoneFrame = (props) => {
	return(
  	<div className="text-center">
    	<h2>{props.doneStatus}</h2>
        <button className="btn btn-secondary" onClick={props.resetGame}>
            Spil en gang til
        </button>
    </div>
  )
}

const Answer = (props) =>
	<div className="col-5">
      <div>
      	{props.selectedNumbers.map((number, i) =>
		      <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
        )}
      </div>
	</div>

const Numbers = (props) => {
	const numberClassName = (number) =>
  	props.selectedNumbers.includes(number) ? 'selected' : 
    props.usedNumbers.includes(number) ? 'used': ''
    
  return (
    <div className="card text-center">
      <div>
      	{Numbers.list.map((number, i) =>
		      <span 
          	key={i} 
            className={numberClassName(number)}
            onClick={() => props.selectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    </div>
  )
}

Numbers.list = _.range(1, 10)

class Game extends React.Component {
  static randomStars = () => Math.floor(Math.random() * 9) + 1

  static initialState = () => {
  	selectedNumbers: [], 
    usedNumbers: [],
		numberOfStars: Game.randomStars(),
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  }

  state = Game.initialState()
  
  selectNumber = (number) => {
  	if (this.state.selectedNumbers.includes(number)) return
  	if (this.state.usedNumbers.includes(number)) return
  	this.setState((old) => {
   		const l = old.selectedNumbers.concat(number)
      return {
        answerIsCorrect: null,
        selectedNumbers: l}
    })
  }
  
  unSelectNumber = (number) => {
  	this.setState((old) => ( {
    	answerIsCorrect: null,
      selectedNumbers: old.selectedNumbers.filter(x => x != number)}))
  }
  
  checkAnswer = () => { this.setState(old =>
    	({answerIsCorrect: old.selectedNumbers.reduce((acc, n) => acc + n, 0) === old.numberOfStars}) 
  )}
  
  redrawNow = () => { this.setState(old => {
  	if (old.redraws < 1) return old
    return {
    	numberOfStars: Game.randomStars(),
      redraws: old.redraws - 1,
      answerIsCorrect: null,
    	selectedNumbers: []
    }
  }, this.updateDoneStatus)}
  
  resetGame = () => this.setState(Game.initialState())

  static isPossibleCombinationSum = (arr, x) => {
    if (arr.indexOf(x) >= 0) return true
    while (arr.length > 0 && arr[arr.length - 1] > x) arr.pop()
    const n = arr.length
    if (n == 0) return false
    const combinationsCount = (1 << n)
    for (var i = 1; i < combinationsCount; i++ ) {
      var combinationSum = 0;
      for (var j = 0; j < n; j++) {
        if (i & (1 << j)) combinationSum += arr[j]
      }
      if (x === combinationSum) return true
    }
    return false
  }

	static possibleSolutions = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter(x => usedNumbers.indexOf(x) == -1)
    return Game.isPossibleCombinationSum(possibleNumbers, numberOfStars)
  }  
  
  updateDoneStatus = () => {
  	if (this.state.usedNumbers.length === 9) 
    	this.setState(old => ({doneStatus: 'Du har vundet, tillykke!'}))
    else if (this.state.redraws < 1 && !Game.possibleSolutions(this.state)) {
      this.setState(old => ({doneStatus: 'Game over, du har tabt'}))
    }
  }
  
  acceptAnswer = () => { this.setState((old) =>
  	({usedNumbers: old.usedNumbers.concat(old.selectedNumbers),
      numberOfStars: Game.randomStars(),
      answerIsCorrect: null,
    	selectedNumbers: []
    }), this.updateDoneStatus)}
      
  render = () =>
  	<div className="container">
    	<h3>Spil Ni Tal</h3>
      <hr />
      <div className="row">
        <Stars numberOfStars={this.state.numberOfStars}/>
        <Button 
        	selectedNumbers={this.state.selectedNumbers} 
          checkAnswer={this.checkAnswer}
        	answerIsCorrect={this.state.answerIsCorrect}
          acceptAnswer={this.acceptAnswer}
          redraws={this.state.redraws}
          redrawNow={this.redrawNow}
          />
        <Answer 
        	selectedNumbers={this.state.selectedNumbers} 
          unSelectNumber={this.unSelectNumber} 
          checkAnswer={this.checkAnswer}
          answerIsCorrect={this.state.answerIsCorrect}
          />
      </div>
      <br/>
      {this.state.doneStatus?
        <DoneFrame 
          doneStatus={this.state.doneStatus} 
          resetGame={this.resetGame}
          />
      :
        <Numbers 
          selectedNumbers={this.state.selectedNumbers} 
          usedNumbers={this.state.usedNumbers}
          selectNumber={this.selectNumber} 
          />
      }
    </div>
}

class App extends React.Component {
	render = () =>
  	<div>
    	<Game />
		</div>
}

ReactDOM.render(<App />, mountNode)
