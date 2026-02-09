import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 🟢 1. 引入 createPortal
import { Search, X } from 'lucide-react';

export default function SearchWidget() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // 🟢 2. 新增掛載狀態 (解決 SSR 問題)

  useEffect(() => {
    setMounted(true); // 標記元件已掛載到 Client 端
  }, []);

  useEffect(() => {
    // 只有當元件掛載後才初始化 Pagefind
    if (mounted) {
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
            // 由於使用了 Portal，這個元素現在會位於 body 標籤中，但 getElementById 依然找得到它
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
      
      // 稍微延遲以確保 Portal DOM 已經長出來
      setTimeout(initPagefind, 100);
    }
  }, [mounted]); // 🟢 依賴 mounted 狀態

  return (
    <>
      {/* ======================================= */}
      {/* 1. 桌機版 (Desktop) - 維持不變 */}
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
        {/* 觸發按鈕 (留在 Header 內) */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`p-2 transition-colors rounded-full relative z-50 ${
            isMobileOpen ? 'bg-gray-100 text-primary' : 'text-text hover:bg-gray-100'
          }`}
          aria-label="搜尋"
        >
          {isMobileOpen ? <X size={24} /> : <Search size={24} />}
        </button>

        {/* 🟢 3. 使用 Portal 將視窗傳送到 body 
            這會讓視窗的 DOM 結構直接掛在 body 下，徹底解決 z-index 被 Header 卡住的問題 
        */}
        {mounted && createPortal(
          <div className={`fixed inset-0 z-[100] transition-all duration-300 ${
             /* 控制顯示/隱藏：這裡我們用 opacity 來做動畫，而不是銷毀元件，這樣 Pagefind 實例才不會消失 */
             isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}>
            
            {/* 遮罩 (點擊關閉) */}
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
              onClick={() => setIsMobileOpen(false)}
            ></div>

            {/* 下滑搜尋面板 */}
            {/* top-[80px] 對應 Header 高度 (h-20 = 5rem = 80px) */}
            <div 
              className={`absolute left-0 top-[80px] w-full bg-white shadow-lg border-t border-gray-100 overflow-hidden transition-transform duration-300 ease-in-out ${
                isMobileOpen ? 'translate-y-0' : '-translate-y-10'
              }`}
            >
              <div className="p-4 container mx-auto">
                <div id="mobile-search" className="custom-pagefind-mobile"></div>
              </div>
            </div>
          </div>,
          document.body // 傳送到 body
        )}
      </div>
    </>
  );
}