<template>
  <v-content class="d-flex flex-column align-center">
    <white-header>
      <template #bg-header>
        редагування
      </template>
      <template #md-header>
        колективу
      </template>
    </white-header>
    <div class="content-white-layer">
      <v-form>
        <div class="bio section">
          <div class="img-load d-flex flex-column align-center pointer">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.gif,.bmp"
              hidden
              @change="fileUpload($event)"
            />
            <div class="img-container border-radius d-flex">
              <m-close
                :class="{
                  'd-none': $isEmpty(getValue('avatar').value)
                }"
                @click.native="resetAvatar($event)"
              ></m-close>
              <m-loading class="d-none"></m-loading>
              <img
                class="img"
                :src="avatar"
                alt=""
                @click="uploadAvatar($event)"
              />
            </div>
            <div class="img-title mt-2" @click="uploadAvatar($event)">
              Завантажити світлину профіля
            </div>
          </div>
          <div class="bio-info d-flex flex-column">
            <div class="bio-item d-flex align-center">
              <span class="bio-label">Назва*</span>
              <div class="flex-break"></div>
              <m-form-component class="w-100">
                <m-text
                  class="bio-input __input-grey w-100"
                  name="title"
                  required
                  :value="getValue('title')"
                  @input="($event) => setValue('title', $event.target.value)"
                ></m-text>
              </m-form-component>
            </div>
            <div class="bio-item d-flex align-center">
              <span class="bio-label">Адреса</span>
              <div class="flex-break"></div>
              <m-form-component class="w-100">
                <m-text
                  class="bio-input __input-grey w-100"
                  name="city"
                  :value="getValue('settle')"
                  @input="($event) => setValue('settle', $event.target.value)"
                ></m-text>
              </m-form-component>
            </div>
          </div>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-header mb-5">Спеціальність</div>
          <div class="media-role border-radius">Артист</div>
          <div class="media-item d-flex w-100 mb-5 mt-5">
            <label
              v-for="(s, ind) of allSpecs"
              :key="ind"
              class="pointer chips"
            >
              <input
                v-if="style.includes(s.title)"
                type="checkbox"
                hidden
                checked
                @change="showItem($event, ind, s.title)"
              />
              <input
                v-else
                type="checkbox"
                hidden
                @change="showItem($event, ind, s.title)"
              />
              <div class="media-chip border-radius">
                {{ $capitalize(s.title) }}
              </div>
            </label>
            <br />
            <!-- <div class="add-items d-flex link align-center">
              <div>
                <input
                  type="text"
                  class="__input __input-grey border-radius"
                  placeholder="Додати"
                  @keyup.enter="addSpec($event)"
                />
              </div>
              <img
                class="pointer ml-3"
                :src="$src('icons/plus.svg')"
                alt=""
                @click="addSpec($event)"
              />
            </div> -->
          </div>
          <transition-group name="specs" mode="out-in" appear>
            <template
              v-for="(e, ind) of allSpecs.filter((a) =>
                style.includes(a.title)
              )"
            >
              <div :key="e.title" class="media-header mb-5">
                {{ $capitalize(e.title) }}
              </div>
              <div :key="e.title" class="media-item d-flex w-100 mb-5 genre">
                <div
                  v-for="(c, index) of e.categories"
                  :key="`${ind}- ${index}`"
                  class="media-categories"
                >
                  <span :key="index" class="media-label list">{{
                    `${$capitalize(c.title)}:`
                  }}</span>
                  <div class="media-info mt-4 w-100">
                    <label
                      v-for="(i, _ind) of c.items"
                      :key="`${index} - ${_ind}`"
                      class="pointer"
                    >
                      <div class="media-select">
                        <input
                          v-if="
                            getValue('spec')
                              .find((a) => a.title === e.title)
                              .categories.find((a) => a.title === c.title)
                              .items.includes(i)
                          "
                          type="checkbox"
                          hidden
                          checked
                          @change="addExtra($event, e.title, c.title, i)"
                        />
                        <input
                          v-else
                          type="checkbox"
                          hidden
                          checked
                          @change="addExtra($event, e.title, c.title, i)"
                        />
                        <div class="circle"></div>
                        <div class="media-select-caption">
                          {{ $capitalize(i) }}
                        </div>
                      </div>
                    </label>
                    <div class="add-items d-flex link align-center">
                      <div>
                        <input
                          type="text"
                          class="__input __input-grey border-radius"
                          placeholder="Додати"
                          @keyup.enter="addElse($event, e.title, c.title)"
                        />
                      </div>
                      <img
                        class="pointer ml-3"
                        :src="$src('icons/plus.svg')"
                        alt=""
                        @click="addElse($event, e.title, c.title)"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="media-categories">
                    <div class="media-info mt-4 w-100">
                      <div class="add-items d-flex link align-center">
                        <div>
                          <input
                            type="text"
                            class="__input __input-grey border-radius"
                            placeholder="Додати категория"
                            @keyup.enter="addCategory($event, s)"
                          />
                        </div>
                        <img
                          class="pointer ml-3"
                          :src="$src('icons/plus.svg')"
                          alt=""
                          @click="addCategory($event, s)"
                        />
                      </div>
                    </div>
                  </div> -->
              </div>
            </template>
          </transition-group>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Можливий склад</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex w-100 mt-5 composition">
              <label class="pointer mr-4">
                <div class="media-select">
                  <input
                    type="radio"
                    checked
                    name="composition"
                    value="two"
                    hidden
                    @change="
                      ($event) => setValue('composition', $event.target.value)
                    "
                  />
                  <div class="circle"></div>
                  <div class="media-select-caption">
                    {{ $capitalize('дует') }}
                  </div>
                </div>
              </label>
              <label class="pointer mr-4">
                <div class="media-select">
                  <input
                    type="radio"
                    name="composition"
                    value="three"
                    hidden
                    @change="
                      ($event) => setValue('composition', $event.target.value)
                    "
                  />
                  <div class="circle"></div>
                  <div class="media-select-caption">
                    {{ $capitalize('тріо') }}
                  </div>
                </div>
              </label>
              <label class="pointer">
                <div class="media-select">
                  <input
                    type="radio"
                    name="composition"
                    value="more"
                    hidden
                    @change="
                      ($event) => setValue('composition', $event.target.value)
                    "
                  />
                  <div class="circle"></div>
                  <div class="media-select-caption">
                    {{ $capitalize('4 та більше') }}
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Склад колективу</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <template v-if="!$isEmpty(getValue('artists'))">
                  <div
                    v-for="(a, ind) of getValue('artists')"
                    :key="a.id"
                    class="media-li d-flex align-center mb-3"
                  >
                    <div class="media-title">
                      {{ a.name }}
                    </div>
                    <m-close
                      class="small ml-5"
                      style="position: static"
                      @click.native="remove(ind, 'artists')"
                    ></m-close>
                  </div>
                </template>
              </transition-group>
              <div class="add-items d-flex link align-center composition">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Найти..."
                    @keyup="autocompleteEvent($event, 'artists')"
                  />
                  <img :src="$src('icons/loading.gif')" class="wait d-opaq" />
                </div>
                <v-card
                  light
                  :class="{
                    autocomplete: true,
                    'd-opaq': foundObj.length === 0
                  }"
                >
                  <div class="load d-opaq"></div>
                  <v-container>
                    <transition-group name="specs" appear>
                      <v-row
                        v-for="a of foundObj"
                        :key="a.name"
                        class="pointer"
                        @click="selectArtist($event, a, 'artists')"
                      >
                        {{ a.name }}
                      </v-row>
                    </transition-group>
                  </v-container>
                </v-card>
                <!-- <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, have)"
                /> -->
              </div>
            </div>
          </div>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Світлини</span>
            <div class="flex-break"></div>
            <div class="bio-items w-100 mt-5">
              <transition-group
                name="photos"
                mode="out-in"
                appear
                class="span d-flex"
              >
                <div
                  v-for="(p, ind) of photos"
                  :key="photos[ind]"
                  class="photo-item d-flex justify-center border-radius mb-5 mr-5"
                >
                  <m-close class="small" @click.native="removePhoto(ind)">
                  </m-close>
                  <img :src="photos[ind]" alt="" class="img" />
                </div>
                <div
                  :key="78"
                  class="add-items d-flex photo-item pointer"
                  @click="openUpload($event)"
                >
                  <input
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.gif,.bmp"
                    hidden
                    @change="uploadPhotos($event)"
                  />
                  <img :src="$src('icons/plus.svg')" alt="" />
                </div>
              </transition-group>
            </div>
          </div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Відео</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('videos')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'videos')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Посилання"
                    @keyup.enter="addLink($event, 'videos')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, 'videos')"
                />
              </div>
            </div>
          </div>
          <!-- <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Аудио</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('audios')"
                  :key="a.title"
                  class="media-li d-flex align-center mb-3"
                >
                  {{ a.title.toUpperCase() }}
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'audios')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items pointer d-flex align-center">
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a"
                  multiple
                  hidden
                  @change="uploadAudios($event)"
                />
                <img
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="openUpload($event)"
                />
              </div>
            </div>
          </div> -->
          <div class="media-item d-flex w-100 flex-no-wrap">
            <span class="media-label up">Плейлист</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('playlists')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'playlists')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Посилання"
                    @keyup.enter="addLink($event, 'playlists')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, playlists)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-header mb-5">Рейдер</div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">У наявності</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('have')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'have')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Додати"
                    @keyup.enter="addLink($event, 'have')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, 'have')"
                />
              </div>
            </div>
          </div>
          <div class="media-item d-flex w-100 flex-no-wrap">
            <span class="media-label up">Надати</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('provide')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'provide')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Додати"
                    @keyup.enter="addLink($event, 'provide')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, 'provide')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-header mb-5">Контактна інформація</div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Телефон</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('phones')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'phones')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    @keyup.enter="addLink($event, 'phones')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, 'phones')"
                />
              </div>
            </div>
          </div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">E-mail</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <m-form-component>
                <m-text
                  name="email"
                  required
                  :data-validate="true"
                  :value="getValue('email')"
                  class="w-50 __input __input-grey  border-radius"
                  @input="($event) => setValue('email', $event.target.value)"
                ></m-text>
              </m-form-component>
            </div>
          </div>
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Мережі</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <div
                  v-for="(a, ind) of getValue('socials')"
                  :key="a"
                  class="media-li d-flex align-center mb-3"
                >
                  <div class="media-title">
                    {{ a }}
                  </div>
                  <m-close
                    class="small ml-5"
                    style="position: static"
                    @click.native="remove(ind, 'socials')"
                  ></m-close>
                </div>
              </transition-group>
              <div class="add-items d-flex link align-center">
                <div>
                  <input
                    type="text"
                    class="__input __input-grey border-radius"
                    placeholder="Посилання"
                    @keyup.enter="addLink($event, 'socials')"
                  />
                </div>
                <img
                  class="pointer ml-3"
                  :src="$src('icons/plus.svg')"
                  alt=""
                  @click="addLink($event, 'socials')"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="media section d-flex flex-column">
          <div class="media-header mb-5">Ціна за виконання</div>
          <span class="media-label middle mb-5" :style="{ color: '#69C200' }"
            >Резидентна ціна</span
          >
          <div class="media-price w-100 d-flex">
            <div class="media-item d-flex w-100 mb-5 flex-column">
              <span class="media-label mt-0" style="width:auto"
                >Постійна ціна, грн</span
              >
              <div class="flex-break"></div>
              <div class="media-list d-flex flex-column w-100 mt-5">
                <div>
                  <input
                    id="regular_price"
                    type="text"
                    class="__input __input-grey border-radius"
                    :value="
                      getValue('prices').regular.find((a) =>
                        a.title.includes('resident')
                      ).price
                    "
                    @input="setRegularPrice($event, 'resident price')"
                  />
                </div>
              </div>
            </div>
            <div class="media-item d-flex w-100 mb-5 flex-column">
              <span class="media-label middle" style="width:auto"
                >Вибіркова ціна, грн</span
              >
              <div class="flex-break"></div>
              <div class="media-list d-flex flex-column w-100 mt-5">
                <transition-group name="specs" mode="out-in" appear>
                  <template v-if="!$isEmpty(getValue('prices'))">
                    <div
                      v-for="(a, ind) of getValue('prices').special[
                        'resident price'
                      ]"
                      :key="`${a.title}-${a.price}`"
                      class="media-li d-flex align-center mt-2 mb-5"
                    >
                      <div class="media-title" v-html="priceContent(a)"></div>
                      <m-close
                        class="small ml-5"
                        style="position: static"
                        @click.native="removePrice(ind, 'resident price')"
                      ></m-close>
                    </div>
                  </template>
                </transition-group>
                <div class="add-items d-flex link align-center">
                  <m-form-component>
                    <m-text
                      class="__input __input-grey border-radius"
                      placeholder="День чи Дата"
                    />
                  </m-form-component>
                  <m-form-component>
                    <m-text
                      class="__input __input-grey border-radius"
                      placeholder="Ціна"
                      @input="controlPrice"
                    />
                  </m-form-component>
                  <img
                    class="pointer ml-3"
                    style="margin-bottom:22px"
                    :src="$src('icons/plus.svg')"
                    alt=""
                    @click="addPrice($event, 'resident price')"
                  />
                </div>
              </div>
            </div>
          </div>
          <span
            class="media-label middle mb-5 mt-5"
            :style="{ color: '#E90D3B' }"
            >Ціна за подію</span
          >
          <div class="media-price w-100 d-flex">
            <div class="media-item d-flex w-100 mb-5 flex-column">
              <span class="media-label mt-0" style="width:auto"
                >Постійна ціна, грн</span
              >
              <div class="flex-break"></div>
              <div class="media-list d-flex flex-column w-100 mt-5">
                <div>
                  <input
                    id="event_price"
                    type="text"
                    class="__input __input-grey border-radius"
                    :value="
                      getValue('prices').regular.find((a) =>
                        a.title.includes('event')
                      ).price
                    "
                    @input="setRegularPrice($event, 'event price')"
                  />
                </div>
              </div>
            </div>
            <div class="media-item d-flex w-100 mb-5 flex-column">
              <span class="media-label middle" style="width:auto"
                >Вибіркова ціна, грн</span
              >
              <div class="flex-break"></div>
              <div class="media-list d-flex flex-column w-100 mt-5">
                <transition-group name="specs" mode="out-in" appear>
                  <template v-if="!$isEmpty(getValue('prices'))">
                    <div
                      v-for="(a, ind) of getValue('prices').special[
                        'event price'
                      ]"
                      :key="`${a.title}-${a.price}`"
                      class="media-li d-flex align-center mt-2 mb-5"
                    >
                      <div class="media-title" v-html="priceContent(a)"></div>
                      <m-close
                        class="small ml-5"
                        style="position: static"
                        @click.native="removePrice(ind, 'event price')"
                      ></m-close>
                    </div>
                  </template>
                </transition-group>
                <div class="add-items d-flex link align-center">
                  <m-form-component>
                    <m-text
                      class="__input __input-grey border-radius"
                      placeholder="День чи Дата"
                    />
                  </m-form-component>
                  <m-form-component>
                    <m-text
                      class="__input __input-grey border-radius"
                      placeholder="Ціна"
                      @input="controlPrice"
                    />
                  </m-form-component>
                  <img
                    class="pointer ml-3"
                    style="margin-bottom:22px"
                    :src="$src('icons/plus.svg')"
                    alt=""
                    @click="addPrice($event, 'event price')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section d-flex justify-center mb-5">
          <v-btn
            color="info"
            class="w-100"
            style="max-width: 216px"
            @click.stop="validate($event)"
            >Зберегти</v-btn
          >
        </div>
      </v-form>
    </div>
    <v-snackbar v-model="snackbar" :bottom="true" color="info" :timeout="5000"
      >Заповність обовʼязкові поля
    </v-snackbar>
  </v-content>
</template>

<script>
import shared from '~/mixins/shared.js';
import register from '~/mixins/register.js';
import spec from '~/mixins/spec.js';
import price from '~/mixins/price.js';
import autocomplete from '~/mixins/autocomplete.js';
import performer from '~/mixins/performer.js';
import mounted from '~/mixins/mounted.js';
import edit from '~/mixins/edit.js';

export default {
  mixins: [
    shared,
    register,
    spec,
    price,
    performer,
    autocomplete,
    edit,
    mounted
  ],
  asyncData({ app, store, redirect, route }) {
    return app.$profile
      .getUser()
      .then((r) => {
        if (r.data.role !== 3) {
          switch (r.data.role) {
            case 2: {
              redirect({ name: 'artist' });
              break;
            }
            case 1: {
              redirect({ name: 'agent' });
              break;
            }
            case 4: {
              redirect({ name: 'restaurant' });
              break;
            }
          }
        }
        store.commit('setField', {
          data: r.data,
          logged: true
        });

        if (app.$isEmpty(r.data.fields.confirmed.value.value)) {
          if (route.name !== 'band-register')
            redirect({ name: 'band-register' });
        }
        let artistsObj = [];
        return app.$profile
          .getUserByRole(2)
          .then((r) => {
            [...artistsObj] = r.data;
            return {
              specs: JSON.parse(JSON.stringify(store.getters.getSpecs)),
              avatar: store.state.defaultAvatar,
              artistsObj
            };
          })
          .catch((e) => {
            console.log(e);
            return {
              specs: JSON.parse(JSON.stringify(store.getters.getSpecs)),
              avatar: store.state.defaultAvatar,
              artistsObj
            };
          });
      })
      .catch((e) => {
        store.commit('setField', {
          logged: undefined
        });
        redirect({ name: 'index' });
      });
  },
  head() {
    return {
      title: 'Редагування колективу'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/agent-profile-edit.scss';

.v-snack__content {
  justify-content: center !important;
}
</style>
