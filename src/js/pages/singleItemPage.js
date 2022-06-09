import singleItem from '../singleItem/singleItemController'

export default function (state){
    // Очищаем страницу
    document.querySelector('#app').innerHTML = ''

    // Запускаем компонент singleItem
    singleItem(state)
}