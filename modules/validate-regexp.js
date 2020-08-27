export default {
  phone(str) {
    const s = str.replace(/[()-\s]/g, '');
    const p = /\+?(38)?0\d{9}/;
    return p.test(s) ? true : 'Номер телефону введено невірно';
  },
  dayDate(str) {
    const s = str.trim();
    const p = /^(понед(ілок|ельник)+)|(вторник|вівторок)|(се?реда)|четверг|(п'?ятниц[ая])|суб?бота|воскресенье|неділя|([0][1-9]|[12][0-9]|3[01])\.(0[1-9]|[1][012])\.202\d$/i;
    return p.test(s) ? true : 'Наприклад: "субота" або "03.12.2020"';
  },
  email(str) {
    const s = str.trim().toLowerCase();
    const p = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return p.test(s) ? true : 'Введіть правильний e-mail';
  },
  e(str) {
    const s = str.trim().toLowerCase();
    const p = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return p.test(s) ? true : 'Введить правильний e-mail';
  }
};

export const day = (str) => {
  const r = [
    /^0$/,
    /^понед(ілок|ельник)+$/i,
    /^вторник|вівторок$/i,
    /^се?реда$/i,
    /^четверг$/i,
    /^п'?ятниц[ая]$/i,
    /^cуб?бота$/i,
    /^воскресенье|неділя$/i
  ];
  return r.findIndex((a) => a.test(str));
};