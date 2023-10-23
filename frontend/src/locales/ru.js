export default {
  translation: {
    validation: {
      required: 'Обязательное поле',
      range: 'От 3 до 20 символов',
      unique: 'Должно быть уникальным',
      minCount: 'Не менее 6 символов',
      samePasswords: 'Пароли должны совпадать',
      uniqueUser: 'Такой пользователь уже существует',
    },
    loginPage: {
      username: 'Ваш ник',
      password: 'Пароль',
      enter: 'Войти',
      noAcc: 'Нет аккаунта?',
      reg: 'Регистрация',
      usernamePlaceholder: 'Ваш ник',
      passwordPlaceholder: 'Пароль',
      errors: {
        networkError: 'Ошибка сети',
        authError: 'Неверные имя пользователя или пароль',
      },
    },
    emptyPage: {
      emptyPage: 'Страница не найдена',
      pageLink1: 'Но вы можете перейти',
      pageLink2: 'на главную страницу',
    },
    mainPage: {
      channels: {
        header: 'Каналы',
        delete: 'Удалить',
        rename: 'Переименовать',
        manageCh: 'Управление каналом',
      },
      modals: {
        addCh: 'Добавить канал',
        nameCh: 'Имя канала',
        cancel: 'Отменить',
        send: 'Отправить',
        delete: 'Удалить',
        deleteCh: 'Удалить канал',
        confirmation: 'Уверены?',
        renameCh: 'Переименовать канал',
      },
      messages: {
        send: 'Отправить',
        new: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
        counter: {
          count_one: '{{count}} Сообщение',
          count_few: '{{count}} Сообщения',
          count_many: '{{count}} Сообщений',
        },
      },
    },
    signupPage: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      submit: 'Зарегестрироваться',
    },
    navigation: {
      logout: 'Выйти',
    },
    toastify: {
      add: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
      error: 'Ошибка соединения',
    },
  },
};
