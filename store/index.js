export const state = () => ({
  defaultAvatar:
    'data:image/png;base64,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',
  avatarUrl: '',
  feedback: [
    {
      name: 'Anon',
      date: '04.03.2020',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae unde repellat saepe nisi magni ea rerum praesentium totam inventore harum laborum, voluptatem ratione assumenda maiores eveniet laboriosam eaque, quo provident.'
    },
    {
      name: 'Anon',
      date: '04.03.2020',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae unde repellat saepe nisi magni ea rerum praesentium totam inventore harum laborum, voluptatem ratione assumenda maiores eveniet laboriosam eaque, quo provident.'
    },
    {
      name: 'Anon',
      date: '04.03.2020',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae unde repellat saepe nisi magni ea rerum praesentium totam inventore harum laborum, voluptatem ratione assumenda maiores eveniet laboriosam eaque, quo provident.'
    },
    {
      name: 'Anon',
      date: '04.03.2020',
      text:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae unde repellat saepe nisi magni ea rerum praesentium totam inventore harum laborum, voluptatem ratione assumenda maiores eveniet laboriosam eaque, quo provident.'
    }
  ],
  sampleWithImage: {
    header: 'Заголовок',
    img: 'card-img.png',
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  },
  plainText: {
    header: 'Заголовок',
    text:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  },
  data: {},
  role: -1,
  id: '',
  specsOpt: {
    instruments: {
      title: 'Інструменти',
      items: ['гитара', 'контрабас', 'пианіно', 'скрипка', 'бас-гитара']
    },
    style: {
      title: 'Cтиль музики',
      items: ['поп', 'рок', 'джаз', 'блюз', 'фолк']
    }
  },
  specs: [
    {
      title: 'solo',
      options: ['instruments', 'style']
    },
    {
      title: 'vocal',
      options: ['style']
    },
    {
      title: 'dj'
    },
    {
      title: 'mc'
    },
    {
      title: 'dancer',
      options: ['style']
    }
  ],
  mobile: false,
  logged: undefined,
  loading: true
});

export const mutations = {
  setAvataUrl(state, data) {
    state.defaultAvatarUrl = data;
  },
  setMobile(state, flag) {
    state.mobile = flag;
  },
  setField(state, obj) {
    for (const i in obj) {
      const el = obj[i];
      if (typeof el === 'object') {
        if (Array.isArray(el)) {
          [...state[i]] = el;
        } else {
          ({ ...state[i] } = JSON.parse(JSON.stringify(el)));
        }
      } else {
        state[i] = el;
      }
    }
  },
  addDataField(state, obj) {
    const k = Object.keys(obj)[0];
    const el = obj[k];
    ({ ...state.data.fields[k] } = el);
  },
  setDataField(state, obj) {
    const k = Object.keys(obj)[0];
    const el = obj[k];
    if (state.data.fields[k].type === 4) {
      [...state.data.fields[k].value] = el;
    } else if (state.data.fields[k].type !== 4) {
      if (typeof el === 'object') {
        state.data.fields[k].value.value = JSON.stringify(el);
      } else {
        state.data.fields[k].value.value = el + '';
      }
    }
  }
};

export const actions = {};

export const getters = {
  logged: (state) => state.logged,
  avatar: (state) => state.avatarUrl,

  getSpecs: (state) => {
    const specs = [];
    for (const s of state.specs) {
      const sp = {
        title: s.title
      };
      if (s.options) {
        sp.categories = [];
        s.options.forEach((d, i) => {
          sp.categories.push(state.specsOpt[d]);
        });
      }
      specs.push(sp);
    }
    return specs;
  }
};
