import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchWidget() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const initPagefind = () => {
      try {
        if (window.PagefindUI) {
          // 1. 初始化桌機版
          const desktopContainer = document.getElementById('desktop-search');
          if (desktopContainer) {
            desktopContainer.innerHTML = '';
            new window.PagefindUI({
              element: "#desktop-search",
              showSubResults: false,
              showImages: false,
              resetStyles: false,
              translations: { placeholder: "搜尋..." }
            });
          }

          // 2. 初始化手機版
          const mobileContainer = document.getElementById('mobile-search');
          if (mobileContainer) {
            mobileContainer.innerHTML = '';
            new window.PagefindUI({
              element: "#mobile-search",
              showSubResults: true,
              showImages: false,
              resetStyles: false,
              translations: { placeholder: "輸入關鍵字搜尋..." }
            });
          }
        }
      } catch (e) {
        console.error("Pagefind init error:", e);
      }
    };
    
    // 稍微延遲以確保 DOM 存在
    setTimeout(initPagefind, 100);
  }, []);

  return (
    <>
      {/* ======================================= */}
      {/* 1. 桌機版 (Desktop) */}
      {/* 寬度給定 w-48 ~ w-64，確保它不會被壓縮 */}
      {/* ======================================= */}
      <div className="hidden lg:block relative z-50">
        <div className="w-64 transition-all duration-300">
          <div id="desktop-search"></div>
        </div>
      </div>

      {/* ======================================= */}
      {/* 2. 手機版 (Mobile) */}
      {/* ======================================= */}
      <div className="lg:hidden">
        {/* 觸發按鈕 */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`p-2 transition-colors rounded-full relative z-50 ${
            isMobileOpen ? 'bg-gray-100 text-primary' : 'text-text hover:bg-gray-100'
          }`}
          aria-label="搜尋"
        >
          {isMobileOpen ? <X size={24} /> : <Search size={24} />}
        </button>

        {/* 下滑搜尋面板 (Mobile Dropdown)
            修正重點：
            1. 使用 fixed 定位，脫離 Header 容器限制。
            2. top-20 (80px) 對應 Header 的高度，確保從 Header 下緣開始。
            3. z-30 確保它在 Header (z-40) 之下，但在內容之上。
        */}
        <div 
          className={`fixed left-0 top-20 w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out z-30 ${
            isMobileOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-10 opacity-0 invisible'
          }`}
        >
          <div className="p-4 container mx-auto">
            <div id="mobile-search" className="custom-pagefind-mobile"></div>
          </div>
          
          {/* 遮罩：點擊下方關閉 */}
          {isMobileOpen && (
            <div 
              className="fixed inset-0 top-[calc(5rem+1px)] bg-black/20 backdrop-blur-[1px] z-[-1]"
              onClick={() => setIsMobileOpen(false)}
            ></div>
          )}
        </div>
      </div>
    </>
  );
}