import * as view from './filterView'
import Filter from './filterModel'

export default async function (state){
    // Создание объекта фильтра
    if(!state.filter) state.filter = new Filter()

    //  Получение параметров для фильтра
    await state.filter.getParams()

    // Отрисовка фильтра
    view.render(state.filter.params)

    // Запрос на сервер
    await state.filter.getResults()
    state.results = state.filter.result

    // Обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length)

    // Прослушка событий формы
    const form = document.querySelector('#filter-form')

    // Изменение формы
    form.addEventListener('change', async function(e){
        e.preventDefault()
        state.filter.query = view.getInput()
        await state.filter.getResults()
        state.results = state.filter.result
        view.changeButtonText(state.filter.result.length)
    })

    // Сброс формы
    form.addEventListener('reset', async function(){
        state.filter.query = ''
        await state.filter.getResults()
        view.changeButtonText(state.filter.result.length)
    })

    // Отправка формы
    form.addEventListener('submit', async function(e){
        e.preventDefault()
        console.log('SUBMIT!!!');
        state.emitter.emit('event:render-listing', {})
    })
}