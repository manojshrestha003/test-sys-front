import { useState , useEffect, useMemo,useRef} from "react";
import { Search, Command, ArrowRight, User, FileText, Settings, X } from "lucide-react";
import { Input } from "./ui/input";

export interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  category: "Pages" | "Users" | "Settings";
  action?: () => void;
}

// Dummy search data set 
const SAMPLE_DATA: SearchResultItem[] = [
  { id: "1", title: "User Management", description: "Manage platform users and roles", category: "Pages" },
  { id: "2", title: "Security Settings", description: "Configure 2FA and password policies", category: "Settings" },
  { id: "3", title: "John Doe", description: "john@example.com — Senior Developer", category: "Users" },
  { id: "4", title: "Sarah Smith", description: "sarah@example.com — Product Manager", category: "Users" },
  { id: "5", title: "Billing & Invoices", description: "View plans and transaction history", category: "Pages" },
];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on search input
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    return SAMPLE_DATA.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Global hotkey trigger (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Keyboard navigation for dropdown results (Arrow Keys + Enter + Esc)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredResults[selectedIndex];
      if (selected) {
        handleSelect(selected);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item: SearchResultItem) => {
    console.log("Selected search item:", item);
    setQuery("");
    setIsOpen(false);
  };

  const getCategoryIcon = (category: SearchResultItem["category"]) => {
    switch (category) {
      case "Users":
        return <User className="w-4 h-4 text-slate-500" />;
      case "Settings":
        return <Settings className="w-4 h-4 text-slate-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input Field */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search users, pages, settings..."
          className="pl-9 pr-16 h-10 border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600/20 rounded-lg shadow-sm"
        />

        {/* Clear or Shortcut Badge */}
        <div className="absolute right-3 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          )}
        </div>
      </div>

      {/* Floating Results Dropdown Overlay */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <div className="p-1.5 space-y-1">
              {filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`
                      w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-colors text-sm
                      ${isSelected ? "bg-indigo-50 text-indigo-900" : "hover:bg-slate-50 text-slate-700"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-slate-100">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <p className="font-medium leading-none text-slate-900">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelected ? "translate-x-0.5 text-indigo-600" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500">
              No results found for "<span className="font-medium text-slate-800">{query}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}