<template>
    <!-- 네비게이션 바 -->
    <NavigationBar />
    <div class="signup-container">
      <div id="Authentication">
        <div class="hcontainer">
          <img src="/pic/logo.png" alt="Codrive Logo" />
        </div>
  
        <!-- 이메일 입력 -->
        <div class="hcontainer">
          <div class="input-container">
            <input type="text" id="emailInput" v-model="email" :class="{ filled: email !== '' }" :style="{ borderColor: emailBorderColor, boxShadow: emailBoxShadow }"  required />
            <label for="emailInput" class="placeholder">E-mail / 이메일</label>
          </div>
        </div>
  
        <!-- 아이디 입력 -->
        <div class="vcontainer">
          <div class="hcontainer">
            <div class="input-container">
              <input type="text" id="IDInput" v-model="username" :class="{ filled: username !== '' }" :style="{ borderColor: IDBorderColor, boxShadow: IDBoxShadow }" required />
              <label for="IDInput" class="placeholder">ID / 아이디</label>
            </div>
          </div>
          <div class="hcontainer error-container">
            <p class="error-message" :class="{ visible: idError !== '' }">{{ idError }}</p>
          </div>
        </div>
  
        <!-- 비밀번호 입력 -->
        <div class="vcontainer">
          <div class="hcontainer">
            <div class="input-container">
              <input type="password" id="PWInput" v-model="password" :class="{ filled: password !== '' }" :style="{ borderColor: PWBorderColor, boxShadow: PWBoxShadow }" required />
              <label for="PWInput" class="placeholder">Password / 비밀번호</label>
            </div>
          </div>
          <div class="hcontainer error-container">
            <p class="error-message" :class="{ visible: passwordError !== '' }">{{ passwordError }}</p>
          </div>
        </div>
  
        <!-- 비밀번호 확인 -->
        <div class="vcontainer">
          <div class="hcontainer">
            <div class="input-container">
              <input type="password" id="PWConfirmInput" v-model="passwordConfirm" :class="{ filled: passwordConfirm !== '' }" :style="{ borderColor: PWCfrmBorderColor, boxShadow: PWCfrmBoxShadow }" required />
              <label for="PWConfirmInput" class="placeholder">Password Confirm / 비밀번호 확인</label>
            </div>
          </div>
          <div class="hcontainer error-container">
            <p class="error-message" :class="{ visible: passwordConfirmError !== '' }">{{ passwordConfirmError }}</p>
          </div>
        </div>
  
        <!-- 다음 버튼 -->
        <div class="hcontainer">
          <button id="nextButton" @click="handleNext" :disabled="loading">
            <i class="fa-solid fa-arrow-right" v-if="!loading" id="next_icon"></i>
            <i class="fa fa-spinner fa-spin" v-if="loading" id="next_loading"></i>
          </button>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import Swal from "sweetalert2";
    import NavigationBar from "../components/NavigationBar.vue";

    // Vue Router 설정
    const router = useRouter();

    // 입력값을 저장하는 반응형 변수
    const email = ref<string>("");
    const username = ref<string>("");
    const password = ref<string>("");
    const passwordConfirm = ref<string>("");
    const loading = ref<boolean>(false);

    // 오류 메시지
    const idError = ref<string>("");
    const passwordError = ref<string>("");
    const passwordConfirmError = ref<string>("");

    // Toastr 옵션 설정
    // const toastrOptions = {
    //     closeButton: true,
    //     newestOnTop: false,
    //     progressBar: true,
    //     positionClass: "toast-bottom-right",
    //     preventDuplicates: false,
    //     onclick: null,
    //     showDuration: 300,
    //     hideDuration: 1000,
    //     timeOut: 3500,
    //     extendedTimeOut: 1000,
    //     showEasing: "swing",
    //     hideEasing: "linear",
    //     showMethod: "fadeIn",
    //     hideMethod: "fadeOut"
    // };

    // 이메일 유효성 검사
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // 아이디 유효성 검사
    const isValidID = (ID: string): string => {
        const idRegex = /^[a-zA-Z0-9]{5,15}$/;
        const numericRegex = /^[0-9]+$/;

        if (ID.length < 5) {
            return "아이디는 최소 5자 이상이어야 합니다.";
        } else if (ID.length > 15) {
            return "아이디는 최대 15자 이하여야 합니다.";
        } else if (!idRegex.test(ID)) {
            return "아이디는 영어 대소문자와 숫자만 사용할 수 있습니다.";
        } else if (numericRegex.test(ID)) {
            return "아이디는 숫자로만 구성될 수 없습니다.";
        }
        return "";
    };

    // 비밀번호 유효성 검사
    const isValidPW = (PW: string): string => {
        const lengthRegex = /^.{6,15}$/;
        const letterRegex = /[a-zA-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /^[a-zA-Z0-9]*[?!@#$%^&*]+[a-zA-Z0-9]*$/;

        if (!lengthRegex.test(PW)) {
            return "비밀번호는 6자 이상 15자 이하여야 합니다.";
        } else if (!letterRegex.test(PW)) {
            return "비밀번호에 최소 하나의 영어 대/소문자가 포함되어야 합니다.";
        } else if (!numberRegex.test(PW)) {
            return "비밀번호에 최소 하나의 숫자가 포함되어야 합니다.";
        } else if (!specialCharRegex.test(PW)) {
            return "비밀번호에 허용된 특수문자(?!@#$%^&*)가 하나 이상 포함되어야 합니다.";
        }
        return "";
    };

    // 비밀번호 확인 검사
    const isValidPWConfirm = (PWC: string): string => {
        return password.value === PWC ? "" : "비밀번호와 일치하지 않습니다.";
    };

    const IDBorderColor = ref<string>("rgb(102, 99, 245)");
    const IDBoxShadow = ref<string>("none");
    watch(username, (newVal) => {
        idError.value = isValidID(newVal);
        if (newVal) {
            if (isValidID(newVal) === "") {
                IDBorderColor.value = "rgb(67, 220, 59)";
                IDBoxShadow.value = "0 0 8px rgb(67, 220, 59)";
            } else {
                IDBorderColor.value = "rgb(245, 99, 99)";
                IDBoxShadow.value = "0 0 8px rgb(245, 99, 99)";
            }
        } else {
            IDBorderColor.value = "rgb(102, 99, 245)";
            IDBoxShadow.value = "none";
        }
    });

    const PWBorderColor = ref<string>("rgb(102, 99, 245)");
    const PWBoxShadow = ref<string>("none");
    watch(password, (newVal) => {
        passwordError.value = isValidPW(newVal);
        passwordConfirmError.value = isValidPWConfirm(passwordConfirm.value);
        if (newVal) {
            if (isValidPW(newVal) === "") {
                PWBorderColor.value = "rgb(67, 220, 59)";
                PWBoxShadow.value = "0 0 8px rgb(67, 220, 59)";
            } else {
                PWBorderColor.value = "rgb(245, 99, 99)";
                PWBoxShadow.value = "0 0 8px rgb(245, 99, 99)";
            }
        } else {
            PWBorderColor.value = "rgb(102, 99, 245)";
            PWBoxShadow.value = "none";
        }
    });

    const PWCfrmBorderColor = ref<string>("rgb(102, 99, 245)");
    const PWCfrmBoxShadow = ref<string>("none");
    watch(passwordConfirm, (newVal) => {
        passwordConfirmError.value = isValidPWConfirm(newVal);
        if (newVal) {
            if (isValidPWConfirm(newVal) === "") {
                PWCfrmBorderColor.value = "rgb(67, 220, 59)";
                PWCfrmBoxShadow.value = "0 0 8px rgb(67, 220, 59)";
            } else {
                PWCfrmBorderColor.value = "rgb(245, 99, 99)";
                PWCfrmBoxShadow.value = "0 0 8px rgb(245, 99, 99)";
            }
        } else {
            PWCfrmBorderColor.value = "rgb(102, 99, 245)";
            PWCfrmBoxShadow.value = "none";
        }
    });

    // 이메일 입력값 변경 시 테두리 색상 변경
    const emailBorderColor = ref<string>("rgb(102, 99, 245)");
    const emailBoxShadow = ref<string>("none");

    watch(email, (newVal) => {
        if (newVal) {
            if (isValidEmail(newVal)) {
                emailBorderColor.value = "rgb(67, 220, 59)";
                emailBoxShadow.value = "0 0 8px rgb(67, 220, 59)";
            } else {
                emailBorderColor.value = "rgb(245, 99, 99)";
                emailBoxShadow.value = "0 0 8px rgb(245, 99, 99)";
            }
        } else {
            emailBorderColor.value = "rgb(102, 99, 245)";
            emailBoxShadow.value = "none";
        }
    });

    // 회원가입 요청 함수
    const handleNext = async () => {
        if (!username.value || !email.value || !password.value) return;

        if (!isValidEmail(email.value)) {
            Swal.fire("오류", "이메일 형식이 유효하지 않습니다.", "error");
        } else if (isValidID(username.value)) {
            Swal.fire("오류", isValidID(username.value), "error");
        } else if (isValidPW(password.value)) {
            Swal.fire("오류", isValidPW(password.value), "error");
        } else if (password.value !== passwordConfirm.value) {
            Swal.fire("오류", "비밀번호와 비밀번호 확인 필드가 일치하지 않습니다.", "error");
        } else {
            try {
                loading.value = true;
                const response = await axios.post(
                    "https://sharp-unified-racer.ngrok-free.app/users/register",
                    {
                        username: username.value,
                        email: email.value,
                        password: password.value
                    },
                    { withCredentials: true }
                );

                if (response.status === 201) {
                    router.push({ path: "/email-confirm", query: { usn: username.value } });
                    Swal.fire("회원가입 성공", `${email.value}로 온 인증 코드를 확인해주세요!`, "success");
                } else {
                    Swal.fire("회원가입 실패", response.data.message || "회원가입에 실패했습니다.", "error");
                }
            } catch (error) {
                Swal.fire("오류", "서버 요청 중 오류가 발생했습니다.", "error");
            } finally {
                loading.value = false;
            }
        }

        
    };
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR|ZCOOL+QingKe+HuangYou');

* {
    margin:0;
    padding:0;
    color:#000;
    font-family: 'Noto Sans KR', cursive;
    box-sizing: border-box;
}

body
{
    width: 100vw; 
    height: 100vh;   
    display: flex;
    flex-direction: column;
    align-items:start;
}

.hcontainer {
    width:100%;
    display:flex;
    justify-content: center;
}
.vcontainer {
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content: center;
}

.logo-container > img {
    width:300px;
    margin-top:20px;
    margin-bottom:20px;
    height:auto;
}

.signup-container {
    display:flex;
    justify-content: center;
    width:100%;
    height:100%;
}

#Authentication {
    margin-top:15vh;
    background-color:rgb(255, 255, 255);
    border-radius: 3%;
    height:60vh;
    width: 700px;
    display:flex;
    flex-direction:column;
    justify-content: start;
}

#Authentication > .hcontainer > img {
    width:300px;
    margin-top:20px;
    margin-bottom:20px;
    height:auto;
}

.input-container {
    position: relative;
    width: 60%;
    margin-bottom: 20px;
    margin-top: 50px;
}

#emailInput:focus + .placeholder, #IDInput:focus + .placeholder, #PWInput:focus + .placeholder, #PWConfirmInput:focus + .placeholder{
    top: -18px;
    font-size: 17px;
    color: rgb(102, 99, 245);
}

.filled + .placeholder {
    top: -18px;
    font-size: 17px;
    color: rgb(102, 99, 245);
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 5px;
  display: none; /* 기본적으로 숨김 */
}

.visible {
  display: block; /* 오류가 있을 때 표시 */
}

#emailInput, #IDInput, #PWInput, #PWConfirmInput {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border: 2px solid rgb(102, 99, 245);
    border-radius: 5px;
    font-size: 16px;
    outline: none;
	transition: all ease 0.2s;
}

.placeholder {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: grey;
    font-size: 17px;
    pointer-events: none; /* 클릭 이벤트 방지 */
    transition: all 0.3s ease;
}

.error-container {
	justify-content: start;
	margin-left: 143px;
	margin-top:-15px;
}

#nextButton {
	margin-top:30px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 100px;
	background-color:rgb(102, 99, 245);
    border-width:0px;
	border-radius: 15px;
    transition: box-shadow 0.3s ease;
}

#nextButton:disabled {
    cursor:not-allowed;
    border-width:0px;
	background-color:rgba(102, 99, 245, 0.8);
}

#nextButton:hover {
    box-shadow: 0px 0px 12px 6px rgba(102, 99, 245, 0.5);
}

#nextButton > i {
	color: white;
	font-size:50px;
}
</style>