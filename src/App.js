import React,{useState,useEffect} from 'react';
import './style/App.css';

function App() {

	const [output,setOutput] = useState('');
	const [hasil,setHasil] = useState(0);
	const [operands,setOperands] = useState([]);
	const [operators,setOperators] = useState([]);
	const [containsEqualSign,setContainsEqualSign] = useState(false);
	const [numberOfOperators,setNumberOfOperators] = useState(0);
	const [temp,setTemp] = useState('');
	// const [lastElement,setLastElement] = useState('');

	function onOperandButtonClick(event) {
		// setOutput(prev => prev + event.target.value);
		
		// setLastElement(()=>event.target.value);

		if(containsEqualSign){
			onClearButtonClick();
			setTemp(() => event.target.value);
		}

		if(temp.includes('-')){
			setTemp(prev => [prev.slice(0, prev.length-1), event.target.value, prev.slice(prev.length-1)].join(''));
		}
		else{
			setTemp(prev => prev + event.target.value);
		}

		if(temp === '0'){
			setTemp(event.target.value);
		}
	}

	function onOperatorButtonClick(event) {
		if(temp !== ''){
			setOperators(prev => [...prev, event.target.value]);
			// setOutput(prev => prev + event.target.value);
			setNumberOfOperators((prev)=>prev+1);
			// setLastElement(()=>event.target.value);

			// setOutput((prev)=> prev + temp);

			if(temp !== ''){
				if(temp === '0.'){
					setOperands((prev)=>[...prev,'0'])
				}
				else{
					setOperands((prev)=>[...prev,temp]);
				}
			}
		}
	}

	function onEqualButtonClick(event) {
		if(!temp === ''){
			setOperands((prev)=>[...prev,temp])
			// setOutput(prev => prev + event.target.value);
			setTemp('');
			setContainsEqualSign(()=>true)
		}
		else{
			alert('input anda salah! , operand harus 1 lebih banyak dari operator');
		}
	}

	function onClearButtonClick(){
		setOutput(()=>'');
		setContainsEqualSign(()=>false);
		setHasil(()=>'');
		setOperands([]);
		setOperators([]);
		setNumberOfOperators(0);
		setTemp(()=>'');
		// setLastElement(()=>'');
	}

	function onMinButtonClick() {
		if(!temp.includes('-')){
			if(temp.length === 0){
				setTemp(()=> '(-)');
			}
			else{
				setTemp((prev)=> ['(','-',...prev,')'].join(''));
			}
		}
	}

	function doOpertaion() {
		let text = operands
			.reduce((total,operand,index)=>{
				if(index===0){	
					total = `${operand}`
				}
				else{
					total += `${operators[index-1]}${operand}`;
				}
				return total
			})

		try{
			setHasil(()=>eval(text));
		}
		catch(error){
			console.log(error);
		}
		
	}

	function addHasilToOutput() {
		// setOutput(prev=>prev + hasil)
	}

	function onDotButtonClick(event) {
		if(!temp.includes('.')){
			if(temp === ''){
				setTemp(()=>'0.')
			}
			else{
				setTemp((prev) => prev + event.target.value)
			}
		}
	}

	function onDelButtonClick() {
		setTemp((prev)=>prev.substring(0, prev.length - 1));
	}

	// function onPercentButtonClick() {
	// 	if(temp !== ''){
	// 		setTemp((prev)=>prev+'%');
	// 		setOperands((prev) => prev * 0.01 );
	// 	}
	// 	else{
	// 		console.log('invalid input, masukkan angka terlebih dahulu kemudian diikuti tanda persen')
	// 	}
	// }

	useEffect(()=>{
		setTemp('');
	},[numberOfOperators])

	useEffect(()=>{
		if(containsEqualSign && numberOfOperators > 0 && (operators.length === operands.length-1)){
			doOpertaion();
		}
		else{
			console.log('input salah!! pastikan banyak operator selalu 1 lebih sedikit dari banyak operand');
		}
	},[containsEqualSign]);

	useEffect(()=>{
		addHasilToOutput();
	},[hasil]);

	return (
		<div className="App">
      		<div class="output">
				<h1>hello world</h1>
				<h2>tes</h2>
			</div>
			<div class="button-group">
				<button onClick={onOperandButtonClick} value="1">1</button>
				<button onClick={onOperandButtonClick} value="2">2</button>
				<button onClick={onOperandButtonClick} value="3">3</button>
				<button onClick={onOperandButtonClick} value="4">4</button>
				<button onClick={onOperandButtonClick} value="5">5</button>
				<button onClick={onOperandButtonClick} value="6">6</button>
				<button onClick={onOperandButtonClick} value="7">7</button>
				<button onClick={onOperandButtonClick} value="8">8</button>
				<button onClick={onOperandButtonClick} value="9">9</button>
				<button onClick={onOperandButtonClick} value="0">0</button>
				<button onClick={onOperatorButtonClick} value="+">+</button>
				<button onClick={onOperatorButtonClick} value="-">-</button>
				<button onClick={onOperatorButtonClick} value="*">*</button>
				<button onClick={onOperatorButtonClick} value="/">/</button>
				{/* <button onClick={onPercentButtonClick}>%</button> */}
				<button onClick={onMinButtonClick} value="">+/-</button>
				<button onClick={onDotButtonClick} value=".">.</button>
				{/* <button value="">()</button> */}
				<button onClick={onEqualButtonClick} value="=">=</button>
				<button onClick={onDelButtonClick}>del</button>
				<button onClick={onClearButtonClick} value="">c</button>
			</div>
    	</div>
  	);
}

export default App;

// todo
// 1. fungsionalitas persen
// 2. fungsionalitas parentheses
// 3. 12+= got error (done)
// 4. perbaiki output
// 5. bersihkan kode
// 6. pada saat containsEqualSign bernilai true dan tombol lain
// 	  diklik clear semua state dan apabila yang di klik operabd 
// 	  operand button tambahkan ke state temp


// Check if an array is empty or not in JavaScript :
// Array.isArray(emptyArray) && emptyArray.length