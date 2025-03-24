<template>
    <!-- 네비게이션 바 -->
    <NavigationBar />
    <div class="signup-container">
      <div id="Authentication">
        <div class="hcontainer">
          <img src="../../public/pic/logo.png" alt="Codrive Logo" />
        </div>
  
        <div class="vcontainer">
          <div class="hcontainer"><h1>Email Confirmation</h1></div>
          <div class="hcontainer"><p>회원가입 후에만 이 페이지에 접근할 수 있습니다.</p></div>
        </div>
  
        <div class="vcontainer">
          <div class="hcontainer">
            <div class="input-container">
              <input type="text" inputmode="numeric" id="CodeInput" v-model="code" :class="{ filled: code !== '' }" :style="{ borderColor: codeBorderColor, boxShadow: codeBoxShadow }" required />
              <label for="CodeInput" class="placeholder" id="InputPlaceholder">인증 코드(6자리) 입력</label>
            </div>
          </div>
          <div class="hcontainer error-container">
            <p class="error-message" id="CodeError">{{ codeError }}</p>
          </div>
        </div>
  
        <div class="hcontainer">
          <div id="nextButton" @click="handleNext" :disabled="loading">
            <i class="fa-solid fa-arrow-right" v-if="!loading"></i>
            <i class="fa-solid fa-spinner" v-if="loading"></i>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import NavigationBar from "../components/NavigationBar.vue";
    import { ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import { useRoute } from "vue-router";
    import axios from "axios";
    import Swal from "sweetalert2";

    const router = useRouter();
    const route =  useRoute();
    const code = ref<string>("");
    const loading = ref<boolean>(false);
    const codeError = ref<string>("");

    const username = route.query.usn;

    if (!username) {
        Swal.fire("오류", "잘못된 접근입니다.", "error");
        router.push("/");
    }

    const verifyUser = async () => {
        try {
            const response = await axios.post("https://sharp-unified-racer.ngrok-free.app/users/can-verify", {
                username: username,
            });
    
            if (response.status !== 200) {
                Swal.fire("오류", "잘못된 접근입니다.", "error");
                router.push("/");
            }
        } catch (error) {
           console.error('Error:', error);
        }
    };
    
    verifyUser();

    const codeBorderColor = ref<string>("rgb(102, 99, 245)");
    const codeBoxShadow = ref<string>("none");
    watch(code, (newVal) => {
        codeError.value = newVal.length === 6 ? "" : "코드는 6자리 숫자입니다.";
        
        if (newVal) {
            if (newVal.length === 6) {
                codeBorderColor.value = "rgb(67, 220, 59)";
                codeBoxShadow.value = "0 0 8px rgb(67, 220, 59)";
            } else {
                codeBorderColor.value = "rgb(245, 99, 99)";
                codeBoxShadow.value = "0 0 8px rgb(245, 99, 99)";
            }
        } else {
            codeBorderColor.value = "rgb(102, 99, 245)";
            codeBoxShadow.value = "none";
        }
    });

    const handleNext = async () => {
        if (code.value.length !== 6) {
            codeError.value = "코드는 6자리 숫자입니다.";
            return;
        }

        loading.value = true;
        try {
            const response = await axios.post("https://sharp-unified-racer.ngrok-free.app/users/verify-email", {
                username: username,
                code: code.value,
            });

            if (response.status === 200) {
                Swal.fire({
                    title: "성공",
                    text: "이메일 인증이 완료되었습니다.",
                    icon: "success",
                    confirmButtonText: "확인"
                }).then(() => {
                    router.push("/signin");
                });
            } else {
                Swal.fire("오류", response.data.message, "error");
            }
        } catch (error) {
            Swal.fire("오류", "인증 코드가 올바르지 않습니다.", "error");
        } finally {
            loading.value = false;
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

#CodeInput:focus + .placeholder {
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
    color: red; /* 에러 메시지 색상 */
    font-size: 16px;
    margin-top: 5px;
    display: none; /* 기본적으로 숨김 */
}

#CodeInput{
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
	border-radius: 15px;
    transition: box-shadow 0.3s ease;
}

#nextButton:hover {
    box-shadow: 0px 0px 12px 6px rgba(102, 99, 245, 0.5);
}

#nextButton > i {
	color: white;
	font-size:50px;
}

#nextButton:disabled {
    cursor:not-allowed;
    border-width:0px;
	background-color:rgba(102, 99, 245, 0.8);
}
</style>