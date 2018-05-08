function Form(el){
    let elem = el;
    let resultEl = elem.getElementsByClassName('result')[0]; //нашли блок, в который будем выводить результат
    let inputs = [];
	
    //вспомогательные (приватные) функции	
	function pushElemsByTag(tag){ //добавляем элементы формы по тегу к inputs
		let inp;
		let inputElems = elem.getElementsByTagName(tag); //получим все элементы нужного типа	
        for (let i of inputElems) {//в зависимости от типа элемента формы воспользуемся разными конструкторами
			switch(i.getAttribute("type")){
				case "radio": inp = new Radio(i); break;
				case "zborka": inp = new zborka(i); break;
				case "razborka": inp = new razborka(i); break;
				default: inp = new Input(i);
			}
			inputs.push(inp); //добавляем элемент в массив
        }
	}
    function total(){ //складываем value всех элементов 
        let sum = 0;
        for (let inp of inputs){
            sum += Number(inp.value());
        }
        return sum;
    };
	function showResult(){
		resultEl.innerHTML = ""+total();
	}
	
	this.init = function(){//заполним массив inputs
		pushElemsByTag('input'); //получим все input(s)	
		pushElemsByTag('select'); //получим все select(s)		
    };
	elem.onclick = function(event){ //обработка клика по форме - слушаем клик по всей html-форме
		let target = event.target; //куда кликнули, если на input или select - выводим результат
		if (target.closest('input')|| target.closest('select'))
			showResult();
			console.log(target); //информация в консоль для отладки
	};
}

function Input(el){
    let elem = el;
	function getValue(){
		return el.value;
	}
	this.value = getValue;
}

function Radio(el){
    Input.call(this);
    function getValue(){
		if (el.checked)//если элемент выбран, то берем его значение, если нет - возвращаем 0
			return el.value;
		return 0;
    }
    this.value = getValue;
}


let form = new Form(document.forms["bike"]);
form.init();
