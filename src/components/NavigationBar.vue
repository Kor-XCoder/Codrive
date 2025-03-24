<template>
  <div id="navigator-bar">
    <router-link to="/">
      <img id="header-logo" src="/pic/logo.png" alt="Codrive Logo" />
    </router-link>
    <div id="auth-container">
      <div class="hcontainer user-container" :class="{ loggedin: loggedIn }" :style="{ width: iconWidth }" @click="checkLogout">
        <i class="fa-solid fa-user" v-if="loggedIn" style="font-size:27px;"></i>
        <p v-if="loggedIn" class="username" style="font-size:20px;" >{{ username }}</p>
        <p v-else class="login" id="Sign-in" style="width: '90px'">로그인</p>
      </div>
    </div>
  </div>
</template>

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
header {
    display: flex;
}

#navigator-bar {
    display:flex;
    position:fixed;
    width: 100%;
    height: 10vh;
    background-color:rgb(255, 255, 255);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: space-between;
}

#auth-container {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 2%;
}

.user-container {
    position: relative;
    width: 90px;
    justify-content: space-between;
    z-index: 1; /* 가상 요소 위에 표시 */
}

.loggedin::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 10px);
    background-color: rgba(128, 128, 128, 0.5);
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1; /* 배경이 뒤에 위치 */
}

.loggedin:hover::before {
    opacity: 1;
}

#header-logo {
    margin-left: 10%;
    width:250px;
    height:auto;
    
    max-height: 100%;
}

/* 미디어 쿼리로 화면 크기 감지 */
@media (max-width: 1000px) {
    #header-logo img {
        height: 70px; /* 강제로 높이를 50px로 설정 */
        width: 70px; /* 강제로 너비를 50px로 설정 */
    }
}

#Sign-in {
    display:block;
    color: rgb(0, 0, 0);
    font-size: 25px;
    transition: color 0.2s ease;
}
#Sign-in:hover{
    color: rgb(102, 99, 245);
}

#Sign-up {
    margin-right: 2%;
    display:flex;
    width: 130px;
    height: 60%;
    background-color: rgb(102, 99, 245);
    /* box-shadow: 0px 0px 6px 3px rgba(35, 35, 254, 0.3); */
    border-radius: 17px;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.3s ease;
}

#Sign-up:hover {
    box-shadow: 0px 0px 12px 6px rgba(102, 99, 245, 0.5);
}

#Sign-up > p{
    color: whitesmoke;
    font-size: 25px;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  setup() {
    const router = useRouter();
    const loggedIn = ref<boolean>(false);
    const username = ref<string>('');

    const checkLoginStatus = async (): Promise<void> => {
      try {
        const response = await axios.get('https://sharp-unified-racer.ngrok-free.app/users/profile', { withCredentials: true });
        if (response.data.loggedIn) {
          loggedIn.value = true;
          username.value = response.data.username;
        }
      } catch (error) {
        console.error('세션 확인 오류:', error);
      }
    };

    const checkLogout = async (): Promise<void> => {
        if (!loggedIn.value) {
            router.push('/signin');
            return;
        }
        try {
            const response = await axios.post('https://sharp-unified-racer.ngrok-free.app/users/logout', {}, { 
                withCredentials: true 
            });
            if (response.status === 200) {
                loggedIn.value = false;
                username.value = '';
                router.push('/');
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };
    onMounted(checkLoginStatus);

    const iconWidth = computed(() => {
        if (!loggedIn.value) return "90px"; // 로그인하지 않은 경우 기본값
        
        // 최소 50px에서 `username` 길이에 따라 증가 (최대 150px 제한)
        return `${Math.min(50 + username.value.length * 10, 200)}px`;
    });

    return { loggedIn, username, checkLogout, iconWidth };
  }
});
</script>

