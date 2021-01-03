let data = [ // json со всеми товарами
    {
        id: 1,
        name: "Ноутбук Lenovo",
        price: 18000,
        img: 'images/lenovo.png',
    },
    {
        id: 3,
        name: "Фотокамера Nikon",
        price: 25000,
        img: 'images/nikon.png',

    },
    {
        id: 44,
        name: "Apple ipad",
        price: 35000,
        img: 'images/ipad.png',
    },
    {
        id: 8,
        name: "Samsung Galaxy",
        price: 20000,
        img: 'images/galaxy.png',
    },
    {
        id: 9,
        name: "Телевизор SUPRA",
        price: 19000,
        img: 'images/supra.png',
    }
]

let item_list = document.querySelector('#item_list') //первый контейнер, в котором будут рисоваться
                                                    // все доступные товары из data

let li_list_items = []
let li_list_items_in_cart = []                                  

data.forEach((i) => {	//проходимся по data, создаем массив кнопок с id, именем и ценой товара
//	console.log(i.name)
	li_list_items.push(`<p class='item_to_cart'><img class='image' src=${i.img}> ${i.name}, price: ${i.price} 
        <button class="add_item_button" id=${i.id}> add to cart </button> </p>`)
});

li_list_items.forEach((i) => {	//проходимся по массиву кнопок, добавляем каждую кнопку из массива
	item_list.innerHTML += i 	//в item_list 
});

let add_item_button = document.querySelectorAll(".add_item_button") //кнопки добавить в корзину
let cart_items = document.querySelector("#cart_items") //контейнер корзина, тут будут все товары добавленные в корзину
let total = document.querySelector("#total") //цена всех товаров в корзине
let total_count_div = document.querySelector("#total_count") //количество всех товаров в корзине

let total_price = []

index = function getIndexById(arr, id) { //получить индекс по id 
  let index = -1, length = arr.length, i = 0;  
  for (; i < length; i++) {
    if (arr[i]['id'] === id)  {
        index = i;
        break;
    }    
  }
  return index;
}

let sum = arr => arr.reduce((res, el) => res + (Array.isArray(el) ? sum(el) : el), 0); // сумма всех чисел в массиве

cart_item_list = [] //массив элементов, который будет рисоваться в #cart_items

add_item_button.forEach((i) => {  //проходимся по всем кнопкам "+" 
    i.addEventListener('click', () => { // и назначаем событие на клик
        new_element = {...data[index(data, +i.id)], count: 1}

        if (!!cart_item_list[index(cart_item_list, new_element.id)] == false) { //если элемента еще нет в массиве,
            //console.log('добавлен новый элемент в cart_item_list')                //который будет отображаться в корзине
            cart_item_list.push(new_element)                                        //добавляет его, если елемент уже есть,
        } else {                                                            //при повторном добавление меняет количество на +1 
            //console.log('такой элемент уже есть в массиве')
            cart_item_list[index(cart_item_list, new_element.id)].count += 1
            cart_item_list[index(cart_item_list, new_element.id)].price = data[index(data, new_element.id)].price 
                                                                * cart_item_list[index(cart_item_list, new_element.id)].count
        }

        //console.log(cart_item_list)

        add_one_button_onclick = function(id) { // будет на кнопке добавить +1 в корзине под товаром
            cart_item_list[index(cart_item_list, id)].count += 1
            cart_item_list[index(cart_item_list, id)].price = data[index(data, id)].price 
                                                                * cart_item_list[index(cart_item_list, id)].count
            render_cart_items()
        }

        remove_one_button_onclick = function(id) {  // будет на кнопке убрать 1 товар в корзине под товаром
            cart_item_list[index(cart_item_list, id)].count -= 1
            cart_item_list[index(cart_item_list, id)].price = data[index(data, id)].price 
                                                                * cart_item_list[index(cart_item_list, id)].count

            if (cart_item_list[index(cart_item_list, id)].count < 1) { // если меньше одного, убрать из корзины
                cart_item_list.splice(index(cart_item_list, id), 1)
        }   
            if ( cart_item_list.length == 0) {
                total.innerHTML = "total: 0 <p class='empty_cart'>cart is empty</p>"
                total_count_div.innerHTML = "count: 0"
            }
            render_cart_items()
        }

        remove_item_button_onclick = function(id) { // на кнопке убрать товар из корзины
            cart_item_list.splice(index(cart_item_list, id), 1)

            if ( cart_item_list.length == 0) {
                
                total.innerHTML = "total: 0 <p class='empty_cart'>cart is empty</p>"
                total_count_div.innerHTML = "count: 0"

            }
            render_cart_items()
        }

        render_cart_items = function() {
            cart_items.innerHTML = []
            cart_item_list.forEach((i) => {  //проходимся по массиву, добавляем каждую кнопку в блок на странице
                cart_items.innerHTML += (`<p class="items_in_cart"> ${i.name}, price: ${i.price}, count: ${i.count} 
                    <button class="add_one_button" id=${i.id} onclick="add_one_button_onclick(${i.id})"> + </button>
                    <button class="remove_one_button" id=${i.id} onclick="remove_one_button_onclick(${i.id})"> - </button>
                    <button class="remove_item_button" id=${i.id} onclick="remove_item_button_onclick(${i.id})"> delete </button></p>`)
                
                total_price = []
                total_count = []
                cart_item_list.forEach((i) => {
                    total_count.push(i.count)
                    total_price.push(i.price)
                    total.innerHTML = 'total: ' + sum(total_price)
                    total_count_div.innerHTML = 'count: ' + sum(total_count)
                    console.log(total_count)
                    //console.log(cart_item_list)
                })

            })}

        render_cart_items()

    })
})             
