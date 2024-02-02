document.addEventListener('DOMContentLoaded', () =>
{
	updateQuantityDisplay();
});

let quantity = 1;

function incrementQuantity()
{
	quantity++;
	updateQuantityDisplay();
}

function decrementQuantity()
{
	if (quantity > 1)
	{
		quantity--;
		updateQuantityDisplay();
	}
}

function updateQuantityDisplay()
{
	document.getElementById('quantity').innerText = quantity;
}

function openOrderForm()
{
	document.getElementById('order-form-container').classList.remove('hidden');
}

function submitOrder()
{
	const city = document.getElementById('city').value;
	const street = document.getElementById('street').value;
	const house = document.getElementById('house').value;
	const apartment = document.getElementById('apartment').value;
	const phone = document.getElementById('phone').value;
	const tovarName = document.querySelector('.main-tovar__name').textContent;
	// Проверка наличия данных в обязательных полях
	if (!city || !street || !house || !apartment || !phone)
	{

		return false; // Вернуть false, чтобы предотвратить отправку формы
	}

	const orderDetails = {
		product: `${tovarName}`, // Замените на имя вашего товара
		quantity,
		address: `${city}, ${street}, ${house}, ${apartment}`,
		phone,
		orderDate: new Date().toLocaleDateString(),
	};

	// Используйте Twilio API для отправки SMS
	sendTwilioSMS(orderDetails);
    toggleOrderForm3();
	alert('Ваш заказ успешно оформлен!');
	resetForm();
	

	return false; // Вернуть false, чтобы предотвратить отправку формы
}


function resetForm()
{
	quantity = 1;
	updateQuantityDisplay();
	document.getElementById('order-form-container').classList.add('hidden');
	document.getElementById('order-form').reset();
}

function sendTwilioSMS(orderDetails)
{
	const accountSid = 'AC65e48ba20d4bde7457c7540c344255a2'; // Замените на свой SID
	const authToken = '2cb7600797d7a2f73eac4a2824529aee'; // Замените на свой токен
	const fromNumber = '+12016279112'; // Замените на свой номер Twilio
	const toNumber = '+996505546054';

	const message = `Новый заказ!\nПродукт: ${orderDetails.product}\nКоличество: ${orderDetails.quantity}\nАдрес: ${orderDetails.address}\nТелефон: ${orderDetails.phone}\nДата: ${orderDetails.orderDate}`;
	console.log(message)
	fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
			},
			body: new URLSearchParams(
			{
				'To': toNumber,
				'From': fromNumber,
				'Body': message
			})
		})
		.then(response => response.json())
		.then(data => console.log('Twilio SMS sent:', data))
		.catch(error => console.error('Error sending Twilio SMS:', error));
}

document.addEventListener('DOMContentLoaded', () =>
{
	updateQuantityDisplay();
});






function sendSupportMessage()
{
	const supportMessage = document.getElementById('supportMessage').value;
	// Добавьте код для сохранения сообщения от поддержки
	alert('Сообщение отправлено: ' + supportMessage);
}







var tovarContainer = document.getElementById('tovarContainer');

// Находим дочерние элементы и добавляем обработчик события
tovarContainer.addEventListener('click', function(event)
{
	// Проверяем, что клик был на элементе с классом "tovar"
	var tovar = event.target.closest('.tovar');
	if (tovar)
	{
		// Извлекаем данные из дочерних элементов .tovar
		var imgSrc = tovar.querySelector('.tovar__img').src;
		var name = tovar.querySelector('.tovar__name').textContent;
		var price = tovar.querySelector('.tovar__price').textContent;

		// Обновляем данные в элементе main-tovar
		var mainTovar = document.querySelector('.main-tovar');
		var mainTovarImg = mainTovar.querySelector('.main-tovar__img');
		var mainTovarName = mainTovar.querySelector('.main-tovar__name');
		var mainTovarPrice = mainTovar.querySelector('#price');

		mainTovarImg.src = imgSrc;
		mainTovarName.textContent = name;
		mainTovarPrice.textContent = price;

		updateTotal();
		// Прокручиваем к элементу main-tovar
		const offsetInPixels = 500; // ваш отступ в пикселях

		mainTovar.scrollIntoView(
		{
			behavior: 'auto'
		});
		window.scrollBy(0, -offsetInPixels);

	}
});

function animateTotalChange(targetValue)
{
	var totalElement = document.getElementById("itogo");
	var currentValue = parseInt(totalElement.innerText, 10) || 0;
	var duration = 300; // Продолжительность анимации в миллисекундах (уменьшено до 0.5 секунды)
	var startTime = null;

	function updateAnimation(time)
	{
		if (!startTime) startTime = time;

		var progress = (time - startTime) / duration;
		progress = Math.min(progress, 1); // Ограничиваем прогресс до 1

		var easedProgress = easeInOutQuad(progress);
		var animatedValue = Math.floor(currentValue + (targetValue - currentValue) * easedProgress);
		totalElement.innerText = animatedValue + " сом";

		if (progress < 1)
		{
			requestAnimationFrame(updateAnimation);
		}
	}

	requestAnimationFrame(updateAnimation);
}

// Функция времени Безье - квадратичная (интереснее визуально)
function easeInOutQuad(t)
{
	return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function updateTotal()
{
	var quantityElement = document.getElementById("quantity");
	var priceElement = document.getElementById("price");
	var totalElement = document.getElementById("itogo");

	var quantity = parseInt(quantityElement.innerText, 10) || 0;
	var price = parseInt(priceElement.innerText, 10) || 0;

	var total = quantity * price;

	// Запускаем анимацию изменения
	animateTotalChange(total);
}

function incrementQuantity()
{
	var quantityElement = document.getElementById("quantity");
	var quantity = parseInt(quantityElement.innerText, 10) || 0;
	quantity++;
	quantityElement.innerText = quantity;

	updateTotal();
}

function decrementQuantity()
{
	var quantityElement = document.getElementById("quantity");
	var quantity = parseInt(quantityElement.innerText, 10) || 0;
	if (quantity > 1)
	{
		quantity--;
		quantityElement.innerText = quantity;

		updateTotal();
	}
}

// Инициализируем итоговую сумму при загрузке страницы
window.onload = function()
{
	updateTotal();
};

function toggleOrderForm2()
{
	console.log('click')
	var imgSrc = document.querySelector('.main-tovar__img') ?.src || '';
	var name = document.querySelector('#quantity') ?.innerText || '';
	var price = document.querySelector('#itogo') ?.textContent || '';

	var mainTovarImg = document.querySelector('#info-img');
	var mainTovarName = document.querySelector('#info-quantity');
	var mainTovarItogo = document.querySelector('#info-itogo');

	if (mainTovarImg)
	{
		mainTovarImg.src = imgSrc;
	}

	if (mainTovarName)
	{
		mainTovarName.innerText = name;
	}

	if (mainTovarItogo)
	{
		mainTovarItogo.innerText = price;
	}

	var orderFormContainer = document.getElementById('order-form-container');
	orderFormContainer.classList.toggle('hidden');

	if (orderFormContainer.classList.contains('hidden'))
	{
		orderFormContainer.style.left = '-100%';
	}
	else
	{
		orderFormContainer.style.left = '50%';
	}
}

function toggleOrderForm3()
{
	var orderFormContainer = document.getElementById('order-form-container');
	orderFormContainer.classList.toggle('hidden');

	if (orderFormContainer.classList.contains('hidden'))
	{
		orderFormContainer.style.left = '-100%';
	}
	else
	{
		orderFormContainer.style.left = '50%';
	}
}