import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabItem = {
  label: string;
  key: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultKey?: string;
  onTabChange?: (key: string) => void;
};

export function Tabs({ tabs, defaultKey, onTabChange }: TabsProps) {
  const [active, setActive] = useState(defaultKey || tabs[0].key);

  const handleChange = (key: string) => {
    setActive(key);
    onTabChange?.(key);
  };

  const activeTab = tabs.find((t) => t.key === active);

  return (
    <div className="w-full">
      {/* NAV */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleChange(tab.key)}
            className={`py-2 px-4 font-medium transition ${
              active === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO COM ANIMAÇÃO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab?.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
