import { useEffect, useState } from 'react';
import '../pages/index.css';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';

function App() {
    const [ currentUser, setCurrentUser ] = useState({});
    const [ selectedCard, setSelectedCard ] = useState({});
    const [ selectedCardId, setSelectedCardId ] = useState({})
    const [ cards, setCards ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = useState(false);
    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = useState(false);
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = useState(false);
    const [ isImagePopupOpen, setIsImagePopupOpen ] = useState(false);
    const [ isDeleteCardPopupOpen, setIsDeleteCardPopupOpen ] = useState(false);

    useEffect(() => {
        api.getDataUser()
            .then((dataUser) => {
                setCurrentUser(dataUser);
            })
            .catch((err) => {
                console.log(err);
            });
        api.getCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleOpenImageClick({ name , link }) {
        setSelectedCard({ 
            name,
            link
        })
        setIsImagePopupOpen(!isImagePopupOpen);
    }

    function handleCloseImage() {
        setIsImagePopupOpen(!isImagePopupOpen);
    }

    function handleDeleteCardClick({ id }) {
        setSelectedCardId({
            id
        });
        setIsDeleteCardPopupOpen(true);
    }
    
    function closeDeletePopup() {
        setIsDeleteCardPopupOpen(false);
    }

    function handleUpdateUser(dataUser) {
        setIsLoading(true);
        api.setDataUser(dataUser)
            .then((newDataUser) => {
                setCurrentUser(newDataUser);
                handleEditProfileClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    function handleUpdateAvatar(dataAvatar) {
        setIsLoading(true);
        api.updatePhotoProfile(dataAvatar)
            .then((newDataUser) => {
                setCurrentUser(newDataUser);
                handleEditAvatarClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike({ id, likes }) {
        const isLiked = likes.some(element => element._id === currentUser._id);
        if (!isLiked) {
            api.setLikeCard(id)
                .then((newCard) => {
                    setCards((state) => state.map((card) => card._id === id ? newCard : card));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.deleteLikeCard(id)
                .then((newCard) => {
                    setCards((state) => state.map((card) => card._id === id ? newCard : card));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleCardDelete() {
        setIsLoading(true);
        api.deleteCard(selectedCardId.id)
            .then(() => {
                setCards((state) => state.filter((card) => card._id !== selectedCardId.id));
                closeDeletePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddCard(dataCard) {
        setIsLoading(true);
        api.addNewCard(dataCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                handleAddPlaceClick();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar = {handleEditAvatarClick}
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onCardClick = {handleOpenImageClick}
                    onDeleteCardClick = {handleDeleteCardClick}
                    onCardLike = {handleCardLike}
                    cards = {cards}
                />
                <Footer />
                <EditAvatarPopup 
                    isOpen = {isEditAvatarPopupOpen}
                    onClose = {handleEditAvatarClick}
                    onUpdateAvatar = {handleUpdateAvatar}
                    isLoading = {isLoading}
                />
                <EditProfilePopup
                    isOpen = {isEditProfilePopupOpen}
                    onClose = {handleEditProfileClick}
                    onUpdateUser = {handleUpdateUser}
                    isLoading = {isLoading}
                />
                <AddPlacePopup 
                    isOpen = {isAddPlacePopupOpen}
                    onClose = {handleAddPlaceClick}
                    onAddCard = {handleAddCard}
                    isLoading = {isLoading}
                />
                <DeleteCardPopup
                    isOpen = {isDeleteCardPopupOpen}
                    onClose = {closeDeletePopup}
                    onCardDelete = {handleCardDelete}
                    isLoading = {isLoading}
                />
                <ImagePopup
                    isOpen = {isImagePopupOpen}
                    onClose = {handleCloseImage}
                    dataCard = {selectedCard}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;