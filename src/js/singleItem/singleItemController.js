import SingleItem from "./singleItemModel";
import * as view from "./singleItemView";

export default async function (state) {
  // Создаем новые объект singleItem
  state.singleItem = new SingleItem(state.routeParams);

  // Получаем данные с сервера
  await state.singleItem.getItem();

  // Отрисовываем разметку для отдельного объекта
  view.render(state.singleItem.result);

  // Открытие модального окна
  document.querySelector(".button-order").addEventListener("click", () => {
    view.showModal();
  });

  // Зактрытие модального окна по кнопке
  document.querySelector(".modal__close").addEventListener("click", () => {
    view.hideModal();
  });

  // Зактрытие модального окна по оверлею
  document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
    if (e.target.closest(".modal")) {
      return null;
    } else {
      view.hideModal();
    }
  });

  // Отправка формы
  document
    .querySelector(".modal__form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = view.getInput();
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.response

      if (response.message === "Bid Created") {
        alert("Ваша заявка успешно добавлена!");
        view.hideModal()
        view.clearInput()
      } else if (response.message === "Bid Not Created") {
        response.errors.forEach((item)=>{
            alert(item)
        })
      }
    });
}
