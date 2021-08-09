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
	const [lastElement,setLastElement] = useState('');
	const [numberOfMissingOpeningBrackets,setNumberOfMissingOpeningBrackets] = useState(0);

	function onOperandButtonClick(event) {
		// setOutput(prev => prev + event.target.value);
		
		setLastElement(()=>event.target.value);

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
		if(temp !== '' && /\d/.test(temp)){
			setOperators(prev => [...prev, event.target.value]);
			// setOutput(prev => prev + event.target.value);
			setNumberOfOperators((prev)=>prev+1);
			setLastElement(()=>event.target.value);

			// setOutput((prev)=> prev + temp);

			if(temp !== ''){
				if(temp.includes('.') && isNaN(temp[temp.indexOf('.')+1])){
					setOperands((prev)=>{
						let str = temp.split('')

						str.splice(temp.indexOf('.'),1,'')
						console.log('dot was stripped!')
						return [...prev,str.join('')]
					})
				}
				else{
					setOperands((prev)=>[...prev,temp]);
				}
			}
		}
		else{
			console.log('masukkan angka terlebih dahulu untuk melakukan operasi')
		}
	}

	function onEqualButtonClick(event) {
		if(temp !== ''){
			if(numberOfMissingOpeningBrackets > 0 ){
				setOperands((prev)=>{
					let str = ''
					for (let index = 0; index < numberOfMissingOpeningBrackets; index++) {
						str = str + ')';
						setNumberOfMissingOpeningBrackets(prev=>prev-1)
					}
					console.log(str);
					return [...prev,temp+str]
				});
			}
			else{
				setOperands((prev)=>[...prev,temp]);
				// setOutput(prev => prev + event.target.value);

	
			}
			
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
		setLastElement(()=>'');
		setNumberOfMissingOpeningBrackets(()=>0)
	}

	function onMinButtonClick() {
		if(!temp.includes('-')){
			if(temp.length === 0){
				setTemp(()=> '(-)');
			}
			else{
				if(temp.includes('(')){
					setTemp((prev)=> {
						let arr = prev.split('');
						arr.splice(1,0,'(-)')
						return arr.join('');
					});
				}
				else{
					setTemp((prev)=> ['(','-',...prev,')'].join(''));
				}
				
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
				if(temp.includes('-') && !/\d/.test(temp)){
					setTemp((prev)=>{
						let str = prev.split('')

						str.splice(prev.indexOf('-')+1,0,'0.')

						return str.join('')
					})
				}
				if(temp.includes('-') && /\d/.test(temp)){
					setTemp((prev)=>{
						let str = prev.split('')

						str.splice(prev.indexOf(')'),0,'.')

						return str.join('')
					})
				}
				else{
					setTemp((prev) => prev + event.target.value)
				}
			}
		}
	}

	function onDelButtonClick() {
		setTemp((prev)=>prev.substring(0, prev.length - 1));
	}

	function onParenthesesButtonClick(event) {
		// if(typeof parseInt(lastElement) === "number" && containsOpeningBracket){
			// 	setTemp(prev => prev + ')')
			// }
			// else{
			// 	setTemp(prev => '(' + prev);
			// 	setContainsOpeningBracket(()=>true)
			// }
		if(temp === ''){
			setTemp(prev => '(' + prev);
			setNumberOfMissingOpeningBrackets(prev=>prev+1)
			setLastElement(()=>event.target.value);
		}
		else{
			if(numberOfMissingOpeningBrackets > 0 && lastElement !== '()'){
				setTemp(prev => prev + ')')
				setNumberOfMissingOpeningBrackets(prev=>prev-1)
				setLastElement(()=>event.target.value);
			}

			else if(/\d/.test(lastElement)){
				setOperands((prev)=>[...prev,lastElement]);
				setOperators((prev)=>[...prev,'*']);
				setNumberOfOperators((prev)=>prev+1);
				setTemp('(');
				setNumberOfMissingOpeningBrackets(prev=>prev+1);
				setLastElement(()=>event.target.value);
			}

			else{
				console.log('masukkan operand terlebih dahulu sebelum menutup kurung');
			}
		}
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
		if(lastElement !== '()'){
			setTemp('');
		}
	},[numberOfOperators])

	useEffect(()=>{
		if(containsEqualSign && numberOfOperators > 0 && (operators.length === operands.length-1)){
			doOpertaion();
			console.log(operands);
		}
		else{
			console.log('input salah!! pastikan banyak operator selalu 1 lebih sedikit dari banyak operand');
		}
	},[containsEqualSign]);

	useEffect(()=>{
		addHasilToOutput();
	},[hasil]);

	useEffect(()=>{
		if(operands[operands.length-1]){
			setOutput(prev=>prev+operands[operands.length-1])
		}
	},[operands])

	useEffect(()=>{
		if(operators[operators.length-1]){
			setOutput(prev=>prev+operators[operators.length-1])
		}
	},[operators])

	return (
		<div className="App">
      		<div className="output">
				<h1>calculator</h1>
				<h2>{output} {temp}</h2>
				<h3> = {hasil}</h3>
			</div>
			<div className="button-group">
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
				<button onClick={onParenthesesButtonClick} value="()">()</button>
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
// 2. fungsionalitas parentheses (done)
// 3. 12+= got error (done)
// 4. perbaiki output (partially done)
// 5. bersihkan kode
// 6. pada saat containsEqualSign bernilai true dan tombol lain
// 	  diklik clear semua state dan apabila yang di klik operabd 
// 	  operand button tambahkan ke state temp
// 7. nilai state setNumberOfMissingOpeningBrackets tidak akurat pada saat
//    menambahkan tutup kurung secara otomatis
// 8. fungsionalitas operand diikuti buka kurung (done)


// Check if an array is empty or not in JavaScript :
// Array.isArray(emptyArray) && emptyArray.length

// to check if the string contains a number or not
// /\d/.test(temp)