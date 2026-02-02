import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 鎖定背景捲動當選單開啟時
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuItems = [
    { label: '關於醫師', href: '/#about' },
    { label: '主治專長', href: '/#expertise' },
    { label: '衛教專欄', href: '/blog' },
    { label: '門診資訊', href: '/#clinic' },
  ];

  return (
    <>
      {/* 漢堡按鈕 */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 text-primary hover:bg-black/5 rounded-full transition-colors"
        aria-label="開啟選單"
      >
        <Menu size={28} />
      </button>

      {/* 側邊抽屜 (Drawer) */}
      <div 
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 backdrop-blur-sm ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)} // 點擊遮罩關閉
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#F9F8F6] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // 阻止點擊內容時關閉
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
      </div>
    </>
  );
};

export default MobileMenu;