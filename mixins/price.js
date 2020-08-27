export default {
  methods: {
    addPrice(e, title) {
      const t = e.target;
      const inps = t.closest('.add-items').querySelectorAll('.form-component');
      const inp1 = inps[0].children[0];
      const inp2 = inps[1].children[0];
      const mes = inps[0].querySelector('.message');
      const p = this.getValue('prices') === '' ? [] : this.getValue('prices');
      const [...special] = p.special[title];
      if (inp1.value.trim() && inp2.value.trim()) {
        const m = this.$check('dayDate', inp1.value);
        if (m !== true) {
          mes.textContent = m;
          inps[0].classList.add('incorrect');
        } else if (m === true) {
          mes.textContent = '';
          if (special.filter((a) => a.title === inp1.value).length === 0) {
            p.special[title].push({
              title: inp1.value,
              price: inp2.value
            });
            this.setValue('prices', this.$isEmpty(p) ? '' : p);
          }
          inp1.value = '';
          inp2.value = '';
        }
      }
    },
    removePrice(ind, title) {
      const p = this.getValue('prices') === '' ? [] : this.getValue('prices');
      p.special[title].splice(ind, 1);
      this.setValue('prices', this.$isEmpty(p) ? '' : p);
    },
    priceContent(p) {
      return `⟐ ${this.$capitalize(p.title)} - <b>${p.price}</b>`;
    },
    setRegularPrice(e, event) {
      const v = e.target.value
        .split('')
        .filter((a) => !isNaN(a))
        .join('');
      e.target.value = v;
      const p = this.getValue('prices') === '' ? [] : this.getValue('prices');
      p.regular.find((a) => a.title === event).price = v;
      this.setValue('prices', p);
    },
    controlPrice(e) {
      const v = e.target.value
        .split('')
        .filter((a) => !isNaN(a))
        .join('');
      e.target.value = v;
    }
  }
};
