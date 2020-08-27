export default {
  data() {
    return {
      specSelected: []
    };
  },
  methods: {
    showItem(e, index, id) {
      const s = this.$isEmpty(this.getValue('spec'))
        ? []
        : this.getValue('spec');
      if (e.target.checked) {
        const sp = this.specs.find((a) => id === a.title);
        s.push(JSON.parse(JSON.stringify(sp)));
        s[s.length - 1].categories = [];
        if (!this.$isEmpty(sp.categories)) {
          this.specSelected.push(id);
        }
      } else {
        const ind = this.specSelected.findIndex((a) => a === id);
        if (ind !== -1) {
          this.specSelected.splice(ind, 1);
        }
        s.splice(
          s.findIndex((a) => {
            if (a) {
              return a.title === id;
            }
            return false;
          }),
          1
        );
      }
      this.setValue('spec', this.$isEmpty(s) ? '' : s);
    },
    addExtra(e, genre, item, extra) {
      const s = this.$isEmpty(this.getValue('spec'))
        ? []
        : this.getValue('spec');
      const f = s.find((a) => a !== undefined && a.title === genre);
      let right = f.categories.find((a) => a.title === item);
      if (this.$isEmpty(right)) {
        f.categories.push({
          title: item,
          items: []
        });
      }
      right = f.categories.find((a) => a.title === item);
      if (e.target.checked) {
        right.items.push(extra);
      } else {
        right.items.splice(
          right.items.findIndex((a) => a === extra),
          1
        );
      }
      this.setValue('spec', this.$isEmpty(s) ? '' : s);
    },
    addElse(e, genre, category) {
      const inp = e.target.closest('.add-items').querySelector('[type="text"]');
      this.specs
        .filter((a) => a.title === genre)[0]
        .categories.filter((a) => a.title === category)[0]
        .items.push(inp.value);
      this.addExtra({ target: { checked: true } }, genre, category, inp.value);
      this.$nextTick(() => {
        e.target
          .closest('.add-items')
          .previousElementSibling.querySelector(
            '[type="checkbox"]'
          ).checked = true;
        inp.value = '';
      });
    },
    addSpec(e) {
      const t = e.target;
      const s = this.$isEmpty(this.getValue('spec'))
        ? []
        : this.getValue('spec');
      this.specs.push({
        title: t.value,
        categories: []
      });
      s.push({
        title: t.value,
        categories: []
      });
      this.specSelected.push(t.value);
      this.$nextTick(() => {
        const ch = t
          .closest('.media-item')
          .querySelectorAll('[type="checkbox"]');
        ch[ch.length - 1].checked = true;
        t.value = '';
      });
      this.setValue('spec', this.$isEmpty(s) ? '' : s);
    },
    addCategory(e, genre) {
      const t = e.target;
      const s = this.getValue('spec') === '' ? [] : this.getValue('spec');
      this.specs[
        this.specs.findIndex((a) => a.title === genre)
      ].categories.push({
        title: t.value,
        items: []
      });
      this.spec[this.spec.findIndex((a) => a.title === genre)].categories.push({
        title: t.value,
        items: []
      });
      t.value = '';
      this.setValue('spec', this.$isEmpty(s) ? '' : s);
    }
  }
};
