import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 當 Modal 開啟時，初始化 Pagefind UI
      // 這裡稍微延遲一下，確保 DOM 元素 #search-container 已經長出來
      setTimeout(() => {
        try {
          if (window.PagefindUI) {
            // 先清空舊的，避免重複渲染
            const container = document.getElementById('search-container');
            if (container) container.innerHTML = '';

            new window.PagefindUI({
              element: "#search-container",
              showSubResults: true,
              showImages: false, // 搜尋結果不顯示圖片，保持簡潔
              translations: {
                placeholder: "搜尋衛教文章、最新消息...",
                clear_search: "清除",
                load_more: "載入更多結果",
                search_label: "站內搜尋",
                filters_label: "篩選",
                zero_results: "沒有找到關於 [SEARCH_TERM] 的結果",
                many_results: "找到 [COUNT] 筆關於 [SEARCH_TERM] 的結果",
                one_result: "找到 [COUNT] 筆關於 [SEARCH_TERM] 的結果",
              }
            });
          }
        } catch (e) {
          console.error("Pagefind init failed:", e);
        }
      }, 100);

      // 鎖定背景捲動
      document.body.style.overflow = 'hidden';
    } else {
      // 解除鎖定
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. 觸發按鈕 (搜尋放大鏡) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-text hover:text-primary transition-colors rounded-full hover:bg-gray-100 flex-shrink-0"
        aria-label="開啟搜尋"
      >
        <Search size={20} />
      </button>

      {/* 2. Modal 本體 */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 font-sans">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* 搜尋框容器 */}
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
              <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                <Search size={18} />
                站內搜尋
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-text transition-colors rounded-full hover:bg-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Pagefind UI 掛載點 */}
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar bg-white">
              <div id="search-container"></div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}