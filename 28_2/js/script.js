const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//"функция получает тип переменных и набор переменных и возвращает только переменные заданого типа"

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//"создает массив из дивов с классом dialog__response-block";
		responseBlocksArray.forEach(block => block.style.display = 'none');
		//"делает каждый член массив невидимым"
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();//скрывает массив дивов
		document.querySelector(blockSelector).style.display = 'block';
		//элемент blockSelector делает видимым
		
		if (spanSelector) {//если объект spanSelector существует
			//то в него заносится значение msgText
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//выводит сообщение об ошибки 
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//выводит сообщение в случае успеха 
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	//выводит сообщение в случае отсутствия результата

	tryFilterByType = (type, values) => {
		//функция получает тип переменных и переменную
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//создает строку из значений переменных заданого типа
			const alertMsg = (valuesArray.length) ?
			//если длина полученной строки больше нуля выводит первое сообщение,
			//в противном случае 2-ое
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			//срабатывает в случае ошибки 
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');
//получает элемент с id=filter-btn

filterButton.addEventListener('click', e => {
	//навешивает на полученный объект перхватчик события click
	const typeInput = document.querySelector('#type');
	//получает элемент с id=type
	const dataInput = document.querySelector('#data');
	//получает элемент с id=data

	if (dataInput.value === '') {
		//если в элементе с id=data ничего не введено
		//выводит сообщение ('Поле не должно быть пустым!')
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
		//вызывает функцию showNoResults
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		//предотвращает действие по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
		//вызывает функцию tryFilterByType и передает в качестве аргументов 
		//значения полей элементов typeInput и dataInput,предворительно убрав пробелы
	}
});

