<template>
  <v-content class="d-flex flex-column align-center">
    <white-header>
      <template #bg-header>
        редагування
      </template>
      <template #md-header>
        агента
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
              <span class="bio-label">Імʼя*</span>
              <div class="flex-break"></div>
              <m-form-component class="w-100">
                <m-text
                  class="bio-input __input-grey w-100"
                  name="name"
                  required
                  :value="getValue('name')"
                  @input="($event) => setValue('name', $event.target.value)"
                ></m-text>
              </m-form-component>
            </div>
            <div class="bio-item d-flex align-center">
              <span class="bio-label">Прізвище*</span>
              <div class="flex-break"></div>
              <m-form-component class="w-100">
                <m-text
                  class="bio-input __input-grey w-100"
                  name="second-name"
                  required
                  :value="getValue('second-name')"
                  @input="
                    ($event) => setValue('second-name', $event.target.value)
                  "
                ></m-text>
              </m-form-component>
            </div>
            <div class="bio-item d-flex align-center">
              <span class="bio-label">По-батькові</span>
              <div class="flex-break"></div>
              <m-form-component class="w-100">
                <m-text
                  class="bio-input __input-grey w-100"
                  name="middle-name"
                  :value="getValue('middle-name')"
                  @input="
                    ($event) => setValue('middle-name', $event.target.value)
                  "
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
            <div class="bio-item d-flex align-center">
              <span class="bio-label photo">Світлини</span>
              <div class="flex-break"></div>
              <div class="bio-items w-100">
                <transition-group
                  name="photos"
                  appear
                  mode="out-in"
                  class="d-flex span"
                >
                  <div
                    v-for="(p, ind) of photos"
                    :key="photos[ind]"
                    class="photo-item d-flex justify-center border-radius"
                  >
                    <m-close class="small" @click.native="removePhoto(ind)">
                    </m-close>
                    <img :src="photos[ind]" alt="" class="img" />
                  </div>
                  <div
                    :key="16"
                    class="add-items d-flex justify-center photo-item pointer"
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
          </div>
        </div>
        <div class="media section d-flex flex-column">
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
          </div>
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
                  @click="addLink($event, 'playlists')"
                />
              </div>
            </div>
          </div> -->
        </div>
        <div
          class="media section d-flex flex-column"
          style="padding-bottom:0; border:0"
        >
          <div class="media-item d-flex w-100 mb-5 flex-no-wrap">
            <span class="media-label up">Артисти</span>
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
                    @keyup="autocompleteArtistsEvent($event)"
                  />
                  <img :src="$src('icons/loading.gif')" class="wait d-opaq" />
                </div>
                <v-card
                  light
                  :class="{
                    autocomplete: true,
                    'd-opaq': foundArtistsObj.length === 0
                  }"
                >
                  <div class="load d-opaq"></div>
                  <v-container>
                    <transition-group name="specs" appear>
                      <v-row
                        v-for="a of foundArtistsObj"
                        :key="a.name"
                        class="pointer"
                        @click="selectArtistToAgent($event, a, 'artists')"
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
            <span class="media-label up">Колективи</span>
            <div class="flex-break"></div>
            <div class="media-list d-flex flex-column w-100 mt-5">
              <transition-group name="specs" mode="out-in" appear>
                <template v-if="!$isEmpty(getValue('bands'))">
                  <div
                    v-for="(a, ind) of getValue('bands')"
                    :key="a.id"
                    class="media-li d-flex align-center mb-3"
                  >
                    <div class="media-title">
                      {{ a.name }}
                    </div>
                    <m-close
                      class="small ml-5"
                      style="position: static"
                      @click.native="remove(ind, 'bands')"
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
                    @keyup="autocompleteBandsEvent($event)"
                  />
                  <img :src="$src('icons/loading.gif')" class="wait d-opaq" />
                </div>
                <v-card
                  light
                  :class="{
                    autocomplete: true,
                    'd-opaq': foundBandsObj.length === 0
                  }"
                >
                  <div class="load d-opaq"></div>
                  <v-container>
                    <transition-group name="specs" appear>
                      <v-row
                        v-for="a of foundBandsObj"
                        :key="a.name"
                        class="pointer"
                        @click="selectArtistToAgent($event, a, 'bands')"
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
        <!-- <div class="media section d-flex flex-column">
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
        </div> -->
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
      >{{
        $isEmpty(snackMessage) ? 'Заповність обовʼязкові поля' : snackMessage
      }}
    </v-snackbar>
  </v-content>
</template>

<script>
import shared from '~/mixins/shared.js';
import register from '~/mixins/register.js';
import mounted from '~/mixins/mounted.js';
import edit from '~/mixins/edit.js';
import autocomplete from '~/mixins/autocomplete.js';
export default {
  mixins: [shared, register, autocomplete, edit, mounted],
  asyncData({ app, store, redirect, route }) {
    return app.$profile
      .getUser()
      .then((r) => {
        if (r.data.role !== 1) {
          switch (r.data.role) {
            case 2: {
              redirect({ name: 'artist' });
              break;
            }
            case 3: {
              redirect({ name: 'band' });
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
          if (route.name !== 'agent-register')
            redirect({ name: 'agent-register' });
        }
        let artistsObj = [];
        let bandsObj = [];
        return app.$profile
          .getUserByRole(2)
          .then((r) => {
            [...artistsObj] = r.data;
            return app.$profile
              .getUserByRole(3)
              .then((r) => {
                [...bandsObj] = r.data;
                return {
                  avatar: store.state.defaultAvatar,
                  artistsObj,
                  bandsObj
                };
              })
              .catch((e) => {
                console.log(e);
                return {
                  avatar: store.state.defaultAvatar,
                  artistsObj,
                  bandsObj
                };
              });
          })
          .catch((e) => {
            console.log(e);
            return {
              avatar: store.state.defaultAvatar,
              artistsObj,
              bandsObj
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
      title: 'Редагування агента'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '~/static/scss/agent-profile-edit.scss';
</style>
