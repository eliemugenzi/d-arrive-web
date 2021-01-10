<template>
  <main>
    <div class="center">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        @submit.prevent="handleLogin"
        layout="vertical"
        class="login-form"
      >
        <h2 class="title">Login</h2>
        <a-form-item validateTrigger="submit">
          <a-input
            placeholder="Phone Number"
            v-decorator="[
              'phone_number',
              {
                rules: [
                  { required: true, message: 'Please input your Phone Number' },
                  {
                    validator: validatePhoneNumber
                  }
                ]
              }
            ]"
            style="width:100%"
            validateTrigger="submit"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '250' }]"
            >
              <a-select-option value="250">
                +250
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  {
                    min: 6,
                    message: 'Should have 6 characters minimum!'
                  }
                ]
              }
            ]"
            type="password"
            placeholder="Password"
            validateTrigger="submit"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input-password>
        </a-form-item>
        <a-alert
          v-if="error"
          message="Error"
          :description="error"
          show-icon
          type="error"
          style="margin-bottom: 10px;"
        ></a-alert>
        <div
          v-if="login.loading"
          style="align-self:center;margin-left:50%;margin-bottom: 20px;"
        >
          <a-spin></a-spin>
        </div>
        <a-alert
          v-if="login.error"
          type="error"
          message="Error"
          :description="login.error"
          style="margin-bottom:10px;"
          show-icon
        ></a-alert>

        <a-button type="primary" html-type="submit" class="login-form-button">
          Log in
        </a-button>
      </a-form>
    </div>
  </main>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import { isOk, normalize } from "dev-rw-phone";
import { isEmpty } from "lodash";
import { mapActions, mapGetters } from "vuex";
import { axiosConfig } from "../config/axios";

export default {
  setup(context) {
    console.log(context);
    const state = reactive({
      phone_number: null,
      password: null
    });

    const error = ref(null);

    return {
      state,
      error
    };
  },
  async asyncData(context) {
    console.log(context);
    try {
      context.$axios.setHeader(
        "Authorization",
        `JWT ${localStorage.getItem("JWT_TOKEN")}`
      );
      const res = await context.$axios.get("/buses");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    handleLogin() {
      console.log("HERE");
      this.error = null;
      const fields = this.form.getFieldsValue();
      const errors = this.form.getFieldsError();
      console.log("ERR", errors);
      console.log(fields);
      if (
        [null, undefined, ""].includes(fields.phone_number) &&
        [null, undefined, ""].includes(errors.phone_number)
      ) {
        this.error = "Phone Number has issues";
      } else if (
        [null, undefined, ""].includes(fields.password) &&
        [null, undefined, ""].includes(errors.password)
      ) {
        this.error = "Password has issues";
      } else {
        this.state = {
          phone_number: normalize(fields.phone_number),
          password: fields.password
        };

        this.handleSignIn({
          data: this.state,
          ctx: this
        });
      }
    },
    validatePhoneNumber(rule, value, callback) {
      const form = this.$form;

      if ([null, undefined, ""].includes(value)) {
        return callback();
      }

      if (isOk(value)) {
        callback();
      } else {
        callback("Invalid Phone number format");
      }
    },
    ...mapActions(["handleSignIn"])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "normal_login"
    });
  },
  computed: {
    ...mapGetters(["login", "token"])
  },
  watch: {
    token: (newVal, prevVal) => {
      console.log("VALUES", newVal, prevVal);
      if (![null, undefined, ""].includes(newVal)) {
        localStorage.setItem("JWT_TOKEN", newVal);
        this.$storage.setLocalStorage("JWT_TOKEN", newVal);
        console.log("UNIVERSAL STORAGE", this.$storage);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.center {
  display: grid;
  place-items: center;
}

.title {
  margin-bottom: 20px;
  text-align: center;
}

.login-form-button {
  width: 100%;
}

.login-form {
  width: 30vw;
  margin-top: 10vh;
}

.spin-container {
  align-self: center;
  margin-bottom: 20px;
}
</style>
