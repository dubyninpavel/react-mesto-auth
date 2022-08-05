const page = document.querySelector(".page")
const popupPhoto = page.querySelector(".popup_photo");
const ESC__CODE = "Escape";
const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAvatar = page.querySelector(".popup_avatar");
const profileAvatar = page.querySelector(".profile__avatar");
const profileImage = page.querySelector(".profile__image");
const popupProfileForm = popupEditProfile.querySelector(".popup__form");
const popupDeleteCard = page.querySelector(".popup_delete-card");
const popupNameElement = popupProfileForm.querySelector(".popup__name");
const popupSublineElement = popupProfileForm.querySelector(".popup__subline");
const cardList = page.querySelector(".cards__list");
const popupFormAvatar = page.querySelector(".popup__form_avatar");
const editButton = page.querySelector(".profile__edit-button");
const addButton = page.querySelector(".profile__add-button");
const popupAddCards = page.querySelector(".popup_add-cards");
const popupCardForm =  popupAddCards.querySelector(".popup__form");
const cardTemplate = page.querySelector(".template")

export { popupPhoto, cardList, profileImage, popupFormAvatar, popupAvatar, profileAvatar, popupDeleteCard, ESC__CODE, popupNameElement, popupSublineElement, cardTemplate, popupProfileForm, popupEditProfile, editButton, addButton, popupAddCards, popupCardForm };