<template>
  <div class="col-12" id="LoginView">
    <!-- <h1 class="col-12">This is Login View</h1> -->
    <div class="col-12 Filter">
      <div class="Row col-12">
        <form class="col-12 col-md-4 col-lg-3" @submit="this.Login($event)" id="LoginForm">
          <div class="col-12" id="FormHeader">
            <h1 class="col-12">Welcome To dManager</h1>
          </div>
          <div class="col-12" id="FormBody">
            <!-------------------------- Login Field    ------------------->
            <div class="col-12 InputField">
              <Transition name="fade" mode="out-in">
                <label for="Username" v-if="this.FormData['Username'] != ''">Username</label>
              </Transition>
              <div class="col-12 InputRow">
                <!-- <font-awesome-icon icon="fa-solid fa-user" class="InputIcon" /> -->
                <input type="text" id="Username" class="col-12" placeholder="Username"
                  v-model="this.FormData['Username']">
              </div>
              <Transition name="fade" mode="out-in">
                <span class="ErrorMsg col-12" v-if="v$.FormData.Username.$error">
                  {{ v$.FormData.Username.$errors[0].$message }}
                </span>
              </Transition>
            </div>
            <!-------------------------- Password Field ------------------->
            <div class="col-12 InputField">
              <Transition name="fade" mode="out-in">
                <label for="Password" v-if="this.FormData['Password'] != ''">Password</label>
              </Transition>
              <div class="col-12 InputRow">
                <!-- <font-awesome-icon icon="fa-solid fa-user" class="InputIcon" /> -->
                <input type="password" id="Password" class="col-12" placeholder="Password"
                  v-model="this.FormData['Password']">
              </div>
              <Transition name="fade" mode="out-in">
                <span class="ErrorMsg col-12" v-if="v$.FormData.Password.$error">
                  {{ v$.FormData.Password.$errors[0].$message }}
                </span>
              </Transition>
            </div>
          </div>
          <div class="col-12" id="FormFooter">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="this.FormData['RememberIndex']"
                id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>
            <a>Forgot password ?</a>
          </div>
          <button class="col-12 btn btn-info">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import useValidate from "@vuelidate/core";
import { required, email, minLength, maxLength, helpers } from "@vuelidate/validators";
import axios from "axios";

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      v$: useValidate(),
      Api_Url: this.$store.state['Api_Url'],
      FormData: {
        Username: '',
        Password: '',
        RememberIndex: false,
      }
    };
  },
  methods: {
    Login(e) {
      let main = this;
      let Username = main.FormData['Username'];
      e.preventDefault();
      this.v$.FormData.$validate();
      if (!this.v$.FormData.$error) {
        axios.post(this.Api_Url, {
          "api_name": "CheckCredentials",
          "Username": Username,
          "Password": main.FormData['Password'],
        }).then(function (res) {
          let Result = res.data['Result'];
          if (Result == true) {
            main.$swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Login Success',
              showConfirmButton: false,
              timer: 1200
            }).then(
              setTimeout(() => {
                const rand = () => {
                  return Math.random().toString(36).substring(2);
                };
                const token = () => {
                  return rand() + rand();
                };
                if (main.FormData['RememberIndex'] == true) {
                  main.$store.state['LoaderIndex'] = 1;
                  axios.post(main.Api_Url, {
                    "api_name": 'UpdateAccessToken',
                    "Token": token(),
                    "Username": Username,
                  }).then(function (res) {
                    let Result2 = res.data['Result'];
                    if (Result2 == true) {
                      localStorage.setItem("Token", token());
                      main.$store.state['LoaderIndex'] = 0;
                      main.$router.push({ name: 'home' });
                    }
                  });
                }
                else {
                  sessionStorage.setItem("Token", token());
                  main.$router.push({ name: 'home' });
                }
              }, 1200)
            );
          }
          else {
            main.$swal.fire({
              icon: 'error',
              title: 'Wrong username or password',
              timer: 1200,
              timerProgressBar: true,
            });
          }
        });
      }
    },
  },
  created() {
    this.$store.state['LoaderIndex'] = 1;
  },
  mounted() {
    let main = this;
    let SessionToken = sessionStorage.getItem('Token');
    let StorageToken = localStorage.getItem('Token');
    if (SessionToken != null || StorageToken != null) {
      let Token = 0;
      if (SessionToken != null) {
        Token = SessionToken;
      }
      else {
        Token = StorageToken;
      }
      axios.post(this.Api_Url, {
        "api_name": "CheckAccessToken",
        "Token": Token,
      }).then(function (res) {
        let Result = res.data['Result'];
        if (Result == true) {
          main.$router.push({ name: 'home' });
          main.$store.state['LoaderIndex'] = 0;
        }
        else {
          sessionStorage.clear();
          localStorage.clear();
          main.$store.state['LoaderIndex'] = 0;
        }
      });
    }
    else {
      main.$store.state['LoaderIndex'] = 0;
    }
    $("#LoginView").on("keydown", "input", function (e) {
      let data_Chrs = [];
      let val = $(this).val();
      data_Chrs = val;
      let x = e.which || e.KeyCode;
      if (x == 32) {
        e.preventDefault();
      }
    });
  },
  computed() { },
  watch: {},
  validations() {
    return {
      FormData: {
        Username: {
          required: helpers.withMessage("Please fill this field", required),
          minLength: helpers.withMessage("Min Length is 4", minLength(4)),
          maxLength: helpers.withMessage("Max Length is 16", maxLength(16)),
        },
        Password: {
          required: helpers.withMessage("Please fill this field", required),
        },
      },
    };
  },
}
</script>

<style lang="scss" scoped>
#LoginView {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;
  align-items: flex-start;
  background-image: url('@/assets/login_bg.png');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;

  .Filter {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.60);
  }

  .Row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  #LoginForm {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;

    #FormHeader {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      align-items: flex-start;

      h1 {
        font-size: 1.7rem;
        text-align: center;
        color: white;
        font-weight: 400;
        padding-bottom: 0.5rem;
      }
    }

    #FormBody {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      align-items: flex-start;

      .InputField {
        display: flex;
        padding-top: 1.6rem;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;
        align-items: center;
        position: relative;

        label {
          position: absolute;
          font-size: 0.8rem;
          color: white;
          padding-left: 0.5rem;
          transition: ease all 300ms;
          top: 0.3rem;
        }


        .InputRow {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: center;
          justify-content: center;
          align-items: center;

          .InputIcon {
            position: absolute;
            height: 1.4rem;
            width: 1.4rem;
            left: 0.25rem;
          }

          input {
            font-size: 1.2rem;
            padding: 0.3rem 1rem;
            background-color: rgb(255 255 255 / 29%);
            color: white;
            border-radius: 1.8rem;
            border: 0;
          }

          input::placeholder {
            font-size: 1.1rem;
            color: white;
          }

        }

        .ErrorMsg {
          padding: 0.25rem 0.5rem;
          background-color: #dc354566;
          color: white;
          font-size: 0.7rem;
          margin-top: 0.5rem !important;
          border-radius: 1rem;

        }


      }

    }

    #FormFooter {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      padding: 1rem 0;
      justify-content: space-between;
      font-size: 0.9rem;

      a {
        font-size: 0.9rem;
        cursor: pointer;
        color: white;
        transition: ease all 400ms;
      }

      a:hover {
        text-decoration: underline;
        color: rgb(188, 188, 192);
      }

      .form-check {
        display: flex;
        min-height: 0;
        padding-left: 1.5em;
        margin-bottom: 0;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        color: white;
        cursor: pointer;

        input {
          margin-top: 0;
        }

        label {
          cursor: pointer;
          margin: 0 0.25rem;
        }
      }
    }

    button {
      font-size: 1.2rem;
      border-radius: 2rem;
      transition: ease 400ms all;
      border: 0;
    }

    button:hover {
      background-color: #fcceb6;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>