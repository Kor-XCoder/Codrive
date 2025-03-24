<template>
    <div>
      <!-- 네비게이션 바 -->
      <NavigationBar />
  
      <!-- 배너 영역 -->
      <div id="banner">
        <div id="banner-intro">
          <h1>Here is your Codrive!</h1>
          <h3>강력한 클라우드 쿼리 검색 편의성</h3>
        </div>
        <div id="GotoMyDrive">
          <p @click="goToDrive">내 드라이브로 가기</p>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import NavigationBar from '../components/NavigationBar.vue';
  
  const router = useRouter();
  
  const goToDrive = () => {
    router.push('/mydrive'); // Vue Router를 이용한 페이지 이동
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
#banner {
  width: 100%;
  height: 90vh;
  display: flex;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/pic/banner3.png);
  background-size: cover;
  background-position: center; /* 이미지를 항상 중앙에 유지 */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#banner h1 {
    display: block;
    font-size: 60px;
    color: white; /* 대비되는 색상 설정 */
    text-align: center; /* 가운데 정렬 */
}
#banner h3 {
	margin-top:2%;
    display: block;
    font-size: 30px;
    color: white; /* 대비되는 색상 설정 */
    text-align: center; /* 가운데 정렬 */
}

#banner-intro {
	width:100%;
	display:flex;
	flex-direction: column;
	justify-content: start;
}
#GotoMyDrive {
	margin-top:3%;
	display:flex;
	justify-content: center;
	align-items: center;
	width:200px;
	height:8%;
	background-color: rgb(70, 135, 246);
	border-radius: 3%;
}
#GotoMyDrive p{
	color: white;
	font-size: 23px;
}

/* #features {
	display:flex;
	align-items: start;
	flex-direction:column;
	width:100%;
	height:70vh;
} */

/* .feature_card {
	width:25%;
	height:60%;
	background-color: rgb(167, 167, 167);
}

.card_container{
	margin-top:100px;
	width: 100%;
	height: 100%;
    margin:0;
	display:flex;
	justify-content: space-around;
} */

.flex_container{
	width: 100%;
    margin:0;
	display:flex;
	justify-content: space-between;
}
.container{
    width: 100%;
    margin:0;
}

.fn-font {
	font-family: 'Noto Sans KR', sans-serif;
    text-align: center;
}

.bold {
	font-size: 20%;
}

</style>