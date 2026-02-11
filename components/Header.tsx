
import React from 'react';
import BotIcon from './icons/BotIcon';

const Header: React.FC = () => {
  return (
    <div className="flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        {/* The icon now represents the salon's logo, without the "online" status indicator. */}
        <BotIcon className="w-12 h-12 text-[#C5A37E]" />
      <div className="ml-4">
        <h1 className="text-lg font-bold text-gray-800">Queen Beauty Anna Pankowska</h1>
        <p className="text-sm text-gray-600">Gabinet Kosmetyczny Anna Pankowska</p>
      </div>
    </div>
  );
};

export default Header;