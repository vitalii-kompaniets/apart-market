import * as view from './listingView'

export default function(state){
    // Рендер контейнера для карточек
    view.render()

    // Рендер самих карточек
    state.results.forEach((item)=>{
        view.renderCard(item)
    })

    state.emitter.subscribe('event:render-listing', ()=>{
        // Очистиить контейнер с карточками
        view.clearListingContainer()

        // Отрендерить отфильтрованные карточки
        state.results.forEach((item)=>{
            view.renderCard(item)
        })
    })
}