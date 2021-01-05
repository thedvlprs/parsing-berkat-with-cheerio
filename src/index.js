// Библиотека для парсинга сайтов
const cheerio = require('cheerio');
// HTTP-клиент, основанный на промисах и предназначенный для браузеров и для Node.js.
const axios = require('axios');
// Модуль для работы с файлами Node.js
const fs = require('fs');

const parse = async () => {
	let result = [];
	const url = 'https://berkat.ru/board?page=';

	for (let i = 1; i <= 5; i++) {
		try {
			const res = await axios.get(url + `${i}`);
			const $ = cheerio.load(res.data);

			// const pages = $('.pagebar_pages a').last().attr('href').split('=');
			// // console.log(pages[1]);

			for (const pages of $('.board_list_item')) {
				const title = $(pages).find('.board_list_item_title').text();
				const description = $(pages).find('.board_list_item_text').text();
				const phone = $(pages).find('.get_phone_style').text();
				const images = $(pages).find('.photos img').attr('src');

				result.push({ title, description, phone, images });
			}
		} catch (e) {
			console.error(e);
		}
	}
	// Для записи файла исп-ем асинхронную функцию fs.writeFile() с указанием названия файла,
	// далее преобразовываем объекты в JSON, а для форматирования JSON-файла исп-ем сл.аргументы
	// JSON.stringify(value, replacer, space)
	fs.writeFile('data.json', JSON.stringify(result, null, 2), (err) => {
		if (err) throw err;
		console.log('The file has been successfully generated 🔥');
	});
};
parse();
