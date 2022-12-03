
//создаем модель таскборда
let data= localStorage.getItem('boards');

//если нет сохраненного то выдаем стартовый обьект
   if (data==null) {
    data = {
      "boards":[
         {
            "title": "Основная доска",
            "columns":[
               {
                  "title":"Мои задачи",
                  "cards":[

                  ]
               }
            ]
         }
      ]
   } 
}
else {
   data = JSON.parse(data);
}





//функции создания колонки 
function columnAdd(){
   //создаем пустую колонку
   let column = {
      "title":"Мои задачи",
      "cards":[
      ]
   };
   //добавляем колонку на доску
   data['boards'][0]['columns'].push(column)
   //вывести консоль 
   console.log(data);

   //перерисовываем доски 
   renderBoards();

   //сохраняем колонку
   save();

}


//функция переименования колонки 
function columnRename(number) {
   //Определяем содержимое
   let name= event.target.value;

   //перезаписываем имя колонки 
   data['boards'][0]['columns'][number]['title'] = name;

   save();
}

renderBoards();


//функция сохранения

function save() {
   //кодируем data в JSON
   let dataJson =JSON.stringify(data);
   //сохраняем в LocalStorage
   localStorage.setItem('boards',dataJson);
}

//функция отрисовки досок 
function renderBoards(){
   //получаем шаблоны 
   let tmpl_board = document.getElementById('tmpl-board').innerHTML;
   let tmpl_column = document.getElementById('tmpl-column').innerHTML;
   let tmpl_card = document.getElementById('tmpl-card').innerHTML;
   
   
   //находим контейнер для доски 
   let container = document.getElementById('boards');

   //очищаем доски
   container.innerHTML = '';
   
   
   //в цикле подставляем данные в шаблоны 
   for(let i=0; i< data['boards'].length; i++){

      //собираем html колонок доски
      let boardColumns = '';
      for(let j=0; j< data['boards'][i]['columns'].length; j++) {

         //собираем html карточек колонки
         let columnCards = '';
         for(let k=0; k<data['boards'][i]['columns'][j]['cards'].length; k++) {
            //HTML одной карточки
            let =cardsHtml = tmpl_card.replace('$(card_header)', data['boards'][i]['columns'][j]['cards'][k]['title'])
                                       .replace('${column_number}', j)
                                       .replace('${card_number}', k)
                                       .replace('$(card_content)', data['boards'][i]['columns'][j]['cards'][k]['description']);

            //добавляем готовой текст карточки к какрточка колонки
            columnCards += cardsHtml;
         }

         

         //html одной колонки
         let =columnHtml = tmpl_column.replace('$(column_header)', data['boards'][i]['columns'][j]['title'])
                                       .replace('${column_number}', j)
                                       .replace('${column_number}', j)
                                       .replace('$(column_content)', columnCards  );

         //добавляем готовой текст колонки к колонкам доски
         boardColumns += columnHtml;

      }

      //подставляем данные в шаблон доски и добавляем в контейнер 
      container.innerHTML += tmpl_board.replace('$(board_header)', data['boards'][i]['title'])
                                       .replace('$(board_number)', i)
                                       .replace('$(board_content)', boardColumns);


   }
}

//функция переименования доски
function boardRename(number) {

   let name=event.target.value;

   data['boards'][number]['title'] = name;

   save();
}

//Функция для удаления колонок
function columnDelete(number) {
  
   //спросить потверждение
   let ok = confirm("Вы действительно хотите удалить колонку?");
   if(ok) {

   
   //определить номер колонки
      data['boards'][0]['columns'].splice(number,1);
   //сохраняем 
      save();
   //перерисовываем 
      renderBoards();
   } 

}


function cardAdd() {
   //создаем пустую карточку
   let card = {};
   //получить содержимое поля
   let title = document.getElementById('card-title').value;
   let description = document.getElementById('card-description').value;
   

   //наполняем карточку полученными данными 
   card['title'] = title;
   card['description'] = description;

   //добавить карточку модели 
   data['boards'][0]['columns'][0]['cards'].push(card)
   //вывести консоль 
   console.log(data);

   //перерисовываем карточки
   renderBoards();

   //сохраняем карточку
   save();
}

   
   
   //Функция удаления карточки 
   function cardDelete(column_number , card_number){
      //спросить потверждение
   let ok = confirm("Вы действительно хотите удалить карточку?");
   if(ok) {

   
   //определить номер колонки
      data['boards'][0]['columns'][column_number]['cards'].splice(card_number,1);
   //сохраняем 
      save();
   //перерисовываем 
      renderBoards();
   } 
   }

