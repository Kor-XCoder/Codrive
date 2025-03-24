<template>
    <NavigationBar />
    <div class="login-container">
      <!-- 네비게이션 바 -->
      
  
      <div id="Authentication">
        <div class="hcontainer">
          <img src="/pic/logo.png" alt="Codrive Logo" />
        </div>
  
        <!-- ID 입력 -->
        <div class="hcontainer">
            <div class="input-container">
            <input type="text" id="IDInput" v-model="username" :class="{ filled: username !== '' }" required />
            <label for="IDInput" class="placeholder">ID / 아이디</label>
            </div>
        </div>

        <!-- 비밀번호 입력 -->
        <div class="hcontainer">
            <div class="pw-container">
            <input type="password" id="PWInput" v-model="password" :class="{ filled: password !== '' }" required />
            <label for="PWInput" class="placeholder">Password / 비밀번호</label>
            </div>
        </div>
  
        <!-- 로그인 버튼 -->
        <div class="hcontainer">
          <button id="login-button" @click="handleLogin" :disabled="loading">
            <h1 v-if="!loading" id="login_txt">로그인</h1>
            <i v-if="loading" class="fa fa-spinner fa-spin" style="font-size: 30px; color: #eff9ff;"></i>
          </button>
        </div>
  
        <!-- 추가 옵션 -->
        <div class="hcontainer">
          <div class="help-container">
            <h1 @click="findId">아이디 찾기</h1>
            <h1 @click="findPassword">비밀번호 찾기</h1>
            <h1 @click="redirectToSignup">회원가입</h1>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    import Swal from "sweetalert2";
    import NavigationBar from "../components/NavigationBar.vue";
    
    const username = ref<string>("");
    const password = ref<string>("");
    const loading = ref<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!username.value || !password.value) {
            Swal.fire("오류", "아이디와 비밀번호를 입력하세요.", "error");
            return;
        }

        loading.value = true;
        try {
            const response = await axios.post("https://sharp-unified-racer.ngrok-free.app/users/login", {
            username: username.value,
            password: password.value,
            }, { withCredentials: true });

            if (response.status === 200) {
                Swal.fire("성공", "로그인 성공!", "success");
                // router.push("/");
            } else {
                Swal.fire("오류", response.data.message, "error");
            }
        } catch (error) {
            Swal.fire("로그인 실패", "아이디 또는 비밀번호가 올바르지 않거나 이미 로그인되어 있습니다.", "error");
        } finally {
            loading.value = false;
        }
    };

    const findId = () => Swal.fire("안내", "아이디 찾기 기능은 곧 제공될 예정입니다.", "info");
    const findPassword = () => Swal.fire("안내", "비밀번호 찾기 기능은 곧 제공될 예정입니다.", "info");
    const redirectToSignup = () => router.push("/signup");
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

.login-container {
    display:flex;
    justify-content: center;
    width:100%;
    height:100%;
}

#login-button:disabled {
    background-color: rgba(102, 99, 245, 0.8); /* 배경을 뿌옇게 */
    cursor: not-allowed; /* 마우스 커서를 금지 표시로 변경 */
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

.pw-container {
    position: relative;
    width: 60%;
    margin-bottom: 20px;
    margin-top:20px;
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

#IDInput:focus + .placeholder {
    top: -18px;
    font-size: 17px;
    color: rgb(102, 99, 245);
}

.filled + .placeholder {
    top: -18px;
    font-size: 17px;
    color: rgb(102, 99, 245);
}

#IDInput {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border: 2px solid rgb(102, 99, 245);
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}

#PWInput {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border: 2px solid rgb(102, 99, 245);
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}

#PWInput:focus + .placeholder {
    top: -18px;
    font-size: 17px;
    color: rgb(102, 99, 245);
}

#login-button {
    margin-top:40px;
    width:60%;
    height:70px;
    border-radius:15px;
    background-color: rgb(102, 99, 245);
    border: 1px solid rgb(32, 28, 255);
    transition: box-shadow 0.3s ease;
}

#login-button:hover {
    box-shadow: 0px 0px 12px 6px rgba(102, 99, 245, 0.5);
}

#login-button > h1 {
    font-size:20px;
    color:whitesmoke;
}

.help-container {
    margin-top: 70px;
    width:60%;
    height:100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.help-container > h1 {
    color: rgb(118, 118, 118);
    font-size: 20px;
    text-decoration: none; /* 기본 상태에서는 밑줄 없음 */
    display:block;
    height: 30px;
    transition: color 0.3s ease; /* 밑줄 효과를 부드럽게 전환 */
}

.help-container > h1:hover {
    font-size: 20px;
    text-decoration: underline; /* Hover 시 밑줄 효과 추가 */
    color: rgb(102, 99, 245);
}


</style>