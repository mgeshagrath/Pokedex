export const errorMsgMarkup = function (err) {
  const message = err.message.includes('undefined')
    ? `405: Input can not include symbols or be empty`
    : `404: Can not find that pokemon`;

  return `
    <div class="message message__error">
      <div class="message__img">
      <img
      src="img/pikachu.svg"
      alt="Pikachu"
      class="message__pikachuImg"
      />
    </div>
      <p>${message}</p>
      <p>Please, try again. :)</p>
    </div>
    `;
};
