<template>
  <div class="layout">
    <!-- 顶部导航栏 -->
    <el-header class="top-header">
      <div class="header-content">
        <!-- 应用标题，点击可返回主页 -->
        <h2 class="app-title" @click="goHome">😎沐沐的 AI 提示词工具箱</h2>

        <!-- 功能下拉菜单 -->
        <el-dropdown trigger="click" class="dropdown-menu" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-menu"></i>功能<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/text-to-image">文生图</el-dropdown-item>
              <el-dropdown-item command="/image-to-image">图生图</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主体内容区 -->
    <div class="main-content">
      <!-- 右侧主要内容区 -->
      <el-main class="main-container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>{{ pageTitle }}</h1>
        </div>
        <!-- 页面内容 -->
        <router-view/>
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
  computed: {
    pageTitle() {
      switch (this.$route.path) {
        case '/':
          return '主页';
        case '/text-to-image':
          return '文生图';
        case '/image-to-image':
          return '图生图';
        default:
          return 'AI 提示词工具箱';
      }
    },
  },
  methods: {
    handleCommand(command) {
      if (command === this.$route.path) {
        return;
      }
      this.$router.push(command);
    },
    goHome() {
      if (this.$route.path === '/') {
        return;
      }
      this.$router.push('/');
    },
  },
  mounted() {
    // 这里可以放一些初始化逻辑
    // 注意：原代码中这段逻辑有误，如果当前路径不是根路径，会强制跳转到根路径
    // 这通常不是期望的行为，除非是为了强制主页。但为了不改动太多，暂时保留。
    // 如果你想让 Layout.vue 只作为布局组件，不参与路由跳转，可以移除或注释掉这部分。
    if (this.$route.path !== '/') {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
/* --- 布局容器 --- */
.layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  display: flex;
  flex-direction: column;
}

/* --- 顶部导航栏 --- */
.top-header {
  /* 使用抹茶绿主题 */
  background: linear-gradient(90deg, #4CAF50 0%, #81C784 100%); /* 抹茶绿渐变 */
  color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 稍微深一点的阴影 */
  z-index: 100; /* 确保在其他元素之上 */
  height: 60px; /* 固定高度 */
  /* 添加一些内边距和圆角 */
  padding: 0 20px;
  border-radius: 0 0 12px 12px; /* 底部圆角 */
  /* 可选：添加边框 */
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.05); */
}

/* --- 导航栏内容容器 --- */
.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between; /* 使标题和菜单分离 */
  /* 可选：添加一点内边距 */
  padding: 0 10px;
}

/* --- 应用标题 --- */
.app-title {
  margin: 0;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-grow: 1; /* 让标题占据剩余空间，但不挤压下拉菜单 */
  font-size: 1.2rem; /* 调整字体大小 */
  /* 可选：添加一点阴影 */
  /* text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); */
  /* 可选：添加一点内边距 */
  padding: 0 10px;
}

.app-title:hover {
  /* 悬停时轻微变亮 */
  filter: brightness(1.05);
}

/* --- 下拉菜单容器 --- */
.dropdown-menu {
  /* 可以在这里设置下拉菜单的定位或样式 */
  /* 通常不需要额外设置，因为 el-dropdown 会自动处理 */
}

/* --- 下拉菜单链接 --- */
.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px 15px; /* 调整内边距 */
  border-radius: 6px; /* 圆角 */
  background-color: rgba(255, 255, 255, 0.1); /* 半透明背景 */
  backdrop-filter: blur(5px); /* 毛玻璃效果 (可选) */
}

.el-dropdown-link:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 悬停时加深背景 */
  /* 可选：添加一点阴影 */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
}

/* --- 下拉菜单项 --- */
.el-dropdown-menu .el-dropdown-item {
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  transition: all 0.3s ease;
  /* 可选：添加一点内边距 */
  /* padding: 12px 20px; */
}

.el-dropdown-menu .el-dropdown-item:hover {
  background-color: #e1f5ff; /* 悬停时的背景色 */
  color: #4CAF50; /* 悬停时的文字颜色 */
  /* 可选：添加一点阴影 */
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05); */
}

/* --- 主体内容区 --- */
.main-content {
  display: flex;
  flex: 1;
  margin: 15px;
  gap: 15px;
}

/* --- 主容器 --- */
.main-container {
  flex: 1;
  background-color: #ffffff;
  border-radius: 12px; /* 更大的圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 稍微深一点的阴影 */
  border: 1px solid #ebeef5;
  padding: 25px;
  overflow-y: auto;
  /* 可选：添加一点内边距 */
  /* padding: 30px; */
}

/* --- 页面标题 --- */
.page-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
  /* 可选：添加一点内边距 */
  /* padding: 0 10px; */
}

.page-header h1 {
  margin: 0;
  color: #212121;
  font-size: 24px;
  font-weight: 600;
  /* 可选：添加一点阴影 */
  /* text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); */
}

/* --- 响应式设计 --- */
@media (max-width: 768px) {
  .top-header {
    height: 50px; /* 移动端稍小 */
    padding: 0 10px;
  }

  .header-content {
    padding: 0 5px;
    justify-content: space-between; /* 调整移动端布局 */
  }

  .app-title {
    font-size: 1.1rem; /* 移动端稍小 */
    padding: 0 5px;
  }

  .el-dropdown-link {
    font-size: 14px;
    padding: 8px 12px; /* 移动端内边距 */
  }

  .main-container {
    padding: 15px;
    margin: 10px; /* 减少移动端间距 */
  }

  .page-header h1 {
    font-size: 20px;
  }
}
</style>
