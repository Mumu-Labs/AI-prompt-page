<template>
  <el-card style="max-width: 100%; margin-bottom: 20px;">
    <div slot="header">
      <h3>🖼️ 图生图 提示词</h3>
      <!-- 分类标签选择 -->
      <div class="category-tags-container">
        <el-tag
            v-for="category in categories"
            :key="category.value"
            :type="selectedCategory === category.value ? 'primary' : ''"
            :effect="selectedCategory === category.value ? 'dark' : 'light'"
            class="category-tag"
            @click="selectCategory(category.value)"
            :class="{ 'is-selected': selectedCategory === category.value }"
        >
          {{ category.label }}
        </el-tag>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col
          v-for="item in filteredPromptsData"
          :key="item.id"
          :span="24"
          style="margin-bottom: 20px;"
      >
        <el-card shadow="hover" class="prompt-card" @click.native="showDetailDialog(item)">
          <div slot="header" class="card-header">
            <span class="category-tag-small">{{ item.category }}</span>
            <!-- 动态显示分类 -->
            <span class="card-title">{{ item.title }}</span>
          </div>
          <div class="card-content">
            <p><strong>正面提示词:</strong></p>
            <!-- 使用计算属性控制显示长度 -->
            <p>{{ truncatedPrompt(item.prompt) }}</p>
            <p><strong>负面提示词:</strong></p>
            <p>{{ truncatedPrompt(item.negativePrompt) }}</p>
          </div>
          <div class="card-footer">

          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 详情弹窗 -->
    <el-dialog
        :title="'提示词详情 - ' + detailItem.title"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
        class="detail-dialog"
    >


      <div class="detail-content">
        <div class="prompt-section">
          <h4>正面提示词:</h4>
          <p class="prompt-text">{{ detailItem.prompt }}</p>
          <h4>负面提示词:</h4>
          <p class="prompt-text">{{ detailItem.negativePrompt }}</p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="copyFullPrompt" icon="el-icon-document-copy">
          复制
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
// 导入新的嵌套结构数据
import {imageToImagePrompts} from '@/assets/data/imageToImagePrompts.js';

export default {
  name: 'ImageToImagePage', // 更新组件名称以匹配文件名
  data() {
    return {
      // 保存原始嵌套结构数据
      promptsData: imageToImagePrompts,
      // 用于存储当前选择分类下的提示词数组
      filteredPromptsData: [],
      // 用于存储分类选项
      categories: [],
      // 当前选中的分类
      selectedCategory: '',
      // 弹窗可见性
      dialogVisible: false,
      // 当前详情项
      detailItem: {},
      // 复制按钮加载状态
      loading: false,
    };
  },
  methods: {
    // 截断提示词文本
    truncatedPrompt(text) {
      if (!text || text.length <= 20) {
        return text;
      }
      return text.substring(0, 20) + '...';
    },

    // 根据选中的分类过滤数据
    filterPrompts(value) {
      if (value === '') {
        // 如果选择“全部”，则需要一种方式来显示所有数据
        let allPrompts = [];
        Object.values(this.promptsData).forEach(categoryArray => {
          allPrompts = allPrompts.concat(
              categoryArray.map(item => ({
                ...item,
                category: Object.keys(this.promptsData)[Object.values(this.promptsData).indexOf(categoryArray)]
              }))
          );
        });
        this.filteredPromptsData = allPrompts;
      } else {
        // 获取指定分类下的数据，并添加 category 属性
        const categoryArray = this.promptsData[value] || []; // 如果找不到分类，返回空数组
        this.filteredPromptsData = categoryArray.map(item => ({
          ...item,
          category: value
        }));
      }
    },

    /**
     * 选择分类
     * @param {string} categoryValue - 选中的分类值
     */
    selectCategory(categoryValue) {
      this.selectedCategory = categoryValue;
      this.filterPrompts(categoryValue);
    },

    // 显示详情弹窗
    showDetailDialog(item) {
      this.detailItem = item; // 存储当前项用于弹窗显示
      this.dialogVisible = true; // 显示弹窗
    },

    // 关闭弹窗
    handleClose(done) {
      this.dialogVisible = false;
      done();
    },

    // 复制完整提示词
    async copyFullPrompt() {
      // 如果正在加载，则直接返回，不执行复制
      if (this.loading) {
        return;
      }
      this.loading = true; // 开始加载

      try {
        const fullPrompt = `正面提示词:\n${this.detailItem.prompt}\n\n负面提示词:\n${this.detailItem.negativePrompt}`;
        await navigator.clipboard.writeText(fullPrompt);
        this.$message.success('已复制到剪贴板！');
      } catch (err) {
        console.error('复制失败:', err);
        this.$message.error('复制失败，请手动复制。');
      } finally {
        // 无论成功还是失败，都设置 loading 为 false
        // 延迟 0.5 秒再设置，模拟复制操作的耗时
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    }
  },
  mounted() {
    // 1. 生成分类选项列表
    // 从嵌套结构的键（分类名称）创建选项
    this.categories = [
      {label: '全部', value: ''},
      ...Object.keys(this.promptsData).map(key => ({label: key, value: key}))
    ];

    // 2. 初始化显示所有数据
    this.selectCategory(''); // 调用 selectCategory 以初始化显示所有数据
  }
};
</script>

<!-- 引入共享样式 -->
<style scoped lang="css" src="@/styles/shared-prompts.css"></style>
