<template>
    <div>
        <!-- 네비게이션 바 -->
        <NavigationBar />
  
        <!-- 대시보드 영역-->
        
    </div>
</template>
  
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import NavigationBar from '../components/NavigationBar.vue';
  
  const router = useRouter();
  
  
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

</style>