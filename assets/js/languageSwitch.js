class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem("preferredLanguage") || "zh";
    this.originalTexts = new Map(); // 存储原始中文内容
    this.init();
  }

  init() {
    // 初始化时保存所有带data-translate属性的元素的原始中文内容
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      this.originalTexts.set(key, element.textContent);
    });

    // 应用保存的语言设置
    this.applyLanguage(this.currentLang);

    // 添加语言切换按钮的事件监听
    const langToggle = document.getElementById("languageToggle");
    if (langToggle) {
      langToggle.addEventListener("click", () => {
        this.currentLang = this.currentLang === "zh" ? "en" : "zh";
        localStorage.setItem("preferredLanguage", this.currentLang);
        this.applyLanguage(this.currentLang);
        this.updateButtonText();
      });
    }
  }

  applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (lang === "en" && translations[key]) {
        element.textContent = translations[key];
      } else {
        // 使用保存的原始中文内容
        element.textContent = this.originalTexts.get(key) || key;
      }
    });
  }

  updateButtonText() {
    const langToggle = document.getElementById("languageToggle");
    if (langToggle) {
      if (this.currentLang === "zh") {
        langToggle.textContent =
          this.originalTexts.get("切换到英文") || "切换到英文";
      } else {
        langToggle.textContent =
          translations["切换到中文"] || "Switch to Chinese";
      }
    }
  }
}

// 当DOM加载完成后初始化语言管理器
document.addEventListener("DOMContentLoaded", () => {
  window.languageManager = new LanguageManager();
});
