// выбор случайного цвета для переменной в css
document.documentElement.style.setProperty('--color', Math.floor(Math.random() * 360));

window.addEventListener('load', function() {

	var step = 0;// смена хода между игроками
		values = ['X', '0'];// крестик и нолик
		finalResult = ['Вы не дали боту выиграть - поражение', 'Ура! Бот Победил', 'Ничья'];
		hasWinner = false;
		currentStep = 0;// текущий ход от начала игры
		maxStep = 9;
		end = false;
		cells = document.querySelectorAll('.item__cell');// ячейки игры
		outResult = document.querySelector('h2');// вывод результата игры
		winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];// выигрышные комбинации

	document.querySelector('.container').addEventListener('click', function(event) {
		// проверка на нажатие самой ячейки
		if(event.target.classList.contains('item__cell')) {
			// проверка на конец игры
			if(end == true) {
				location.reload();// перезапуск игры
			}
			else {
				//установка значений ячейки и шаг+
				if(!event.target.classList.contains('item__cell_selected')) {
					event.target.classList.add('item__cell_selected');
					event.target.innerHTML = values[step];
					currentStep++;

					if(step == 1) {
						step = 0;
					} else {
						step++;
					}
					// Проверка результата игры
					checkWinner();

					// ход бота
					// нужно проверить, если игра завершилась, то бот не ходит
					if(!end == true) {
						stepBot();
					}
				}
			}
		}
	});

	// хочу добавить интеллекта боту
	function stepBot() {
		// получаем случайное число и после заполняем ячейку свободную, если такая заполнена
		// тогда ещё раз запускаем функцию
		var rand = Math.floor(Math.random() * 9)

		if(cells[rand].classList.contains('item__cell_selected')) {
			stepBot();

		}
		else {
			cells[rand].classList.add('item__cell_selected');
			cells[rand].innerHTML = values[step];
			currentStep++;

			if(step == 1) {
				step = 0;
			} else {
				step++;
			}
			// Проверка результата игры
			checkWinner();
		}
	}

	function checkWinner() {

		// Проходим по массиву выигрышных комбинаций

		for (let i = 0; i < 8; i++) {

			// проверка на победу игрока

			if(cells[winCombinations[i][0]].innerHTML == 'X' && cells[winCombinations[i][1]].innerHTML == 'X' &&
				cells[winCombinations[i][2]].innerHTML == 'X') {
				hasWinner = true;
				end = true;
				outResult.innerHTML = finalResult[0] + "!";
			}

			// проверка на победу бота

			if(cells[winCombinations[i][0]].innerHTML == '0' && cells[winCombinations[i][1]].innerHTML == '0' &&
				cells[winCombinations[i][2]].innerHTML == '0') {
				hasWinner = true;
				end = true;
				outResult.innerHTML = finalResult[1] + "!";
			}

			// проверка на ничью

			if(currentStep == maxStep && hasWinner == false) {
				end = true;
				outResult.innerHTML = finalResult[2] + "!";
			}
		}

	}

});