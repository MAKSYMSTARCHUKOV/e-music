<template>
  <footer>
    <div class="item">
      <div class="flex-line">
        <img src="/images/icons/about.svg" alt="" />
        <h1 class="footer">наші контакти</h1>
      </div>
      <div class="content">
        <a href="tel:+38(095)5553377">+ 38 (095) 555 33 77</a>
        <a href="tel:+38(095)5553377" class="mb-5">+ 38 (095) 555 33 77</a>
        <a href="mailto:e_music@gmail.com" class="mb-5">e_music@gmail.com</a>
        <a href="https://goo.gl/maps/S2TahmdFfS2gcsuR7"
          >г.Киев, ул. Крещатик 23</a
        >
      </div>
    </div>
    <div class="item">
      <div class="flex-line">
        <img src="/images/icons/about.svg" alt="" />
        <h1 class="footer">про нас</h1>
      </div>
      <div class="content">
        <a href="/about" class="mb-5">Про проект</a>
        <a href="/cooperation" class="mb-5">Співробітники</a>
        <a href="/">Партнери</a>
      </div>
    </div>
    <div class="item">
      <div class="flex-line">
        <img src="/images/icons/about.svg" alt="" />
        <h1 class="footer">мережі</h1>
      </div>
      <div class="content">
        <a href="/" class="mb-5 media"
          ><img src="/images/icons/facebook.svg" alt=""
        /></a>
        <a href="/" class="mb-5 ml-5 media"
          ><img src="/images/icons/twitter.svg" alt=""
        /></a>
        <div class="flex-break d-none d-md-block"></div>
        <a href="/" class="mb-5 ml-5 ml-md-0 media"
          ><img src="/images/icons/instagram.svg" alt=""
        /></a>
        <a href="/" class="mb-5 ml-5 media"
          ><img src="/images/icons/youtube.svg" alt=""
        /></a>
      </div>
    </div>
    <div class="item span">
      <div class="flex-line">
        <img src="/images/icons/about.svg" alt="" />
        <h1 class="footer">заголовок</h1>
      </div>
      <div class="content straight">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum
          distinctio? Consectetur nulla itaque fugit a deleniti commodi odit
          tenetur, perspiciatis, at et id est ipsum aliquam? Possimus,
          necessitatibus expedita!
        </p>
      </div>
    </div>
    <span id="copyright">&copy;&nbsp;<span></span>&nbsp;Copyright</span>
  </footer>
</template>

<script>
export default {
  mounted() {
    document.querySelector(
      '#copyright span'
    ).textContent = new Date().getFullYear();
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/_defaults.scss';

footer {
  border-top: 2px solid #c4c4c4;
  padding-top: 30px;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr;
  @include tablet() {
    padding-top: 40px;
    padding-bottom: 40px;
    grid-template-columns: repeat(3, 1fr);
  }
  @include screen() {
    padding-top: 70px;
    padding-bottom: 70px;
    grid-template-columns: repeat(4, 1fr);
  }
  .item {
    margin-bottom: 14px;
    grid-column: span 1;
    @include tablet() {
      margin-bottom: 24px;
    }
    img {
      width: 38px;
      height: auto;
    }
    h1 {
      padding-left: 10px;
    }
    &.span {
      grid-column: 1 / -1;
      @include screen() {
        grid-column: span 1;
      }
    }
    .content {
      padding-left: 48px;
      display: flex;
      flex-wrap: wrap;
      &.straight {
        padding-left: 0;
      }
      a {
        flex-basis: 100%;
        color: white;
        text-decoration: none;
        &.media {
          flex-basis: unset;
        }
      }
      p {
        text-indent: 38px;
      }
    }
  }
  #copyright {
    grid-column: 1 / -1;
    text-align: right;
  }
}
</style>
