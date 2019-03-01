const path = require(`path`);

module.exports = {
 mode: `development`, // Режим сборки
 entry: `./src/main.js`, // Точка входа приложения
 output: { // Настройка выходного файла
   filename: `bundle.js`,
   path: path.join(__dirname, `public`)
 },
 devServer: {
   contentBase: path.join(__dirname, `public`), // Где искать сборку
   publicPath: `/`, // Веб адрес сборки
   hot: true, // Автоматическая перезагрузка страницы
   compress: true // Сжатие
  },
  devtool: `source-map` // Подключаем sourcemaps
};
