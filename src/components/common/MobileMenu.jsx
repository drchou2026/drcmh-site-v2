import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; // 1. 引入 createPortal
import { Menu, X, Calendar } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 確保只在客戶端渲染 (因為 Portal 需要 document 物件)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. 鎖定背景捲動 (回歸標準寫法，不用 important)
  useEffect(() => {
    if (isOpen) {
      // 既然你的全域 CSS 是乾淨的，標準寫法就能生效
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // 清除設定，回復原狀
    }
    
    // Cleanup: 元件卸載時恢復捲動
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { label: '關於醫師', href: '/#about' },
    { label: '主治專長', href: '/#expertise' },
    { label: '衛教專欄', href: '/blog' },
    { label: '門診資訊', href: '/#clinic' },
  ];

  return (
    <>
      {/* 3. 漢堡按鈕 (留在 Header 裡) */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 text-primary hover:bg-black/5 rounded-full transition-colors"
        aria-label="開啟選單"
      >
        <Menu size={28} />
      </button>

      {/* 4. 選單內容 (透過 Portal 傳送到 body 最外層) */}
      {/* 這樣就能無視 Header 的高度限制，遮罩可以蓋滿全螢幕 */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] transition-all duration-300 ${
            isOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {/* 黑色遮罩背景 */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* 側邊抽屜 (Drawer) */}
          <div 
            className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-[#F9F8F6] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <span className="font-serif text-xl font-bold text-primary">Dr. Chou</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-primary transition-colors"
                aria-label="關閉選單"
              >
                <X size={28} />
              </button>
            </div>

            {/* Drawer Body */}
            <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
              {menuItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="text-2xl font-serif text-primary hover:text-accent transition-colors border-b border-gray-100 pb-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="mt-8">
                 <a 
                  href="/#clinic" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-accent text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all active:scale-95"
                >
                  <Calendar size={20} />
                  立即預約掛號
                </a>
              </div>
            </nav>

            {/* Drawer Footer */}
            <div className="p-6 text-center text-xs text-gray-400 border-t border-gray-200">
              &copy; {new Date().getFullYear()} Dr. Chou Urology Clinic
            </div>
          </div>
        </div>,
        document.body // 指定傳送目的地為 body
      )}
    </>
  );
};

export default MobileMenu;