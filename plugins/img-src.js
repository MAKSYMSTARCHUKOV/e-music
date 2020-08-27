import { Base64 } from 'js-base64';

export default ({ app }, inject) => {
  inject('imgSrc', (src) => {
    return `background-image: url(${app.$img}${src})`;
  });
  inject('src', (src) => {
    return `${app.$img}${src}`;
  });
  inject('month', (mth) => {
    switch (mth) {
      case 1:
        return 'Січень';
      case 2:
        return 'Лютий';
      case 3:
        return 'Березень';
      case 4:
        return 'Квітень';
      case 5:
        return 'Травень';
      case 6:
        return 'Червень';
      case 7:
        return 'Липень';
      case 8:
        return 'Серпень';
      case 9:
        return 'Вересень';
      case 10:
        return 'Жовтень';
      case 11:
        return 'Листопад';
      case 12:
        return 'Грудень';
    }
  });
  inject('dataBlob', (data) => {
    const arr = Base64.atob(data.split(',')[1]);
    const mime = data.split(';')[0].split(':')[1];
    let n = arr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = arr.charCodeAt(n);
    }
    return { data: [u8arr], type: mime };
  });
  inject('dayOfWeek', (day) => {
    const regs = [
      /^воскресенье|неділя$/i,
      /^понед(ілок|ельник)+$/i,
      /^вторник|вівторок$/i,
      /^се?реда$/i,
      /^четверг$/i,
      /^п'?ятниц[ая]$/i,
      /^суб?бота$/i
    ];
    return regs.findIndex((r) => r.test(day));
  });
};
