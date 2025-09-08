export default {
  translation: {
    header: {
      nav: 'Hexlet Chat',
      logIn: 'Войти',
      logOut: 'Выйти',
    },
    login: {
      form: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
      },
      noAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    notFound: {
      pageNotFound: 'Страница не найдена',
      link: 'Но вы можете перейти',
      toMainPage: 'на главную страницу', 
    },
    channels: {
      title: 'Каналы',
      channelControl: 'Управление каналом',
    },
    messages: {
      count_zero: '{{count}} сообщений',
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
      count_other: '{{count}} сообщений',
      send: 'Отправить',
      newMessage: 'Новое сообщение',
      textInInput: 'Введите сообщение...',
    }, 
    modals: {
      addTitle: 'Добавить канал',
      renameTitle: 'Переименовать канал',
      channelName: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
      deleteTitle: 'Удалить канал',
      confirmation: 'Уверены?',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    errors: {
      tooShort: 'От 3 до 20 символов',
      tooLong: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
      passwordsMustMatch: 'Пароли должны совпадать',
      minSymbols: 'Не менее 6 символов',
      usernameOrPasswordIsIncorrect: 'Неверные имя пользователя или пароль',
      connectionError: 'Ошибка соединения',
      removeChannelError: 'Ошибка при удалении канала',
      renameChannelError: 'Ошибка при переименовании канала',
      addChannelError: 'Ошибка при добавлении канала',
      badName: 'Плохое название',

    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться', 
      userExists: 'Такой пользователь уже существует',
    },
    toast: {
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    }
  }
};