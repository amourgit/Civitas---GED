import { useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type NavSubMenuItem = {
  label: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
  link?: string;
};

export type NavSubMenu = {
  title: string;
  items: NavSubMenuItem[];
};

export type NavItem = {
  id: number;
  label: string;
  subMenus?: NavSubMenu[];
  link?: string;
  onClick?: () => void;
};

type Props = {
  navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const handleHover = (menuLabel: string | null) => {
    setOpenMenu(menuLabel);
  };

  const [isHover, setIsHover] = useState<number | null>(null);

  return (
    <div className="relative flex items-center justify-center [--color-background:#ffffff] [--color-border:#e2e8f0] [--color-foreground:#0f172a] [--color-muted-foreground:#64748b] [--color-accent:#f1f5f9] [--color-accent-foreground:#008080] [--color-primary:#008080]">
      <motion.ul layout className="relative flex items-center space-x-0">
        <AnimatePresence mode="popLayout">
          {navItems.map((navItem, index) => (
            <motion.li
              key={navItem.label}
              layout
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative"
              onMouseEnter={() => handleHover(navItem.label)}
              onMouseLeave={() => handleHover(null)}
            >
              <button
                type="button"
                className="text-sm py-1.5 px-4 flex cursor-pointer group transition-colors duration-300 items-center justify-center gap-1 text-muted-foreground hover:text-foreground relative font-medium"
                onMouseEnter={() => setIsHover(navItem.id)}
                onMouseLeave={() => setIsHover(null)}
                onClick={() => {
                  if (navItem.onClick) navItem.onClick();
                }}
              >
                <span className="relative z-10 whitespace-nowrap">{navItem.label}</span>
                {navItem.subMenus && (
                  <ChevronDown
                    className={`h-4 w-4 group-hover:rotate-180 duration-300 transition-transform relative z-10 ${
                      openMenu === navItem.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {(isHover === navItem.id || openMenu === navItem.label) && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute inset-0 size-full bg-primary/10"
                    style={{ borderRadius: 99 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {openMenu === navItem.label && navItem.subMenus && (
                  <div
                    className={`w-auto absolute top-full pt-2 z-50 ${
                      index >= 4 ? "right-0" : "left-0"
                    }`}
                  >
                    <motion.div
                      className="bg-background border border-border p-4 w-max shadow-2xl"
                      style={{ borderRadius: 16 }}
                      layoutId="menu"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="w-fit shrink-0 flex space-x-9 overflow-hidden">
                        {navItem.subMenus.map((sub) => (
                          <motion.div layout className="w-full" key={sub.title}>
                            <h3 className="mb-4 text-sm font-medium capitalize text-muted-foreground">
                              {sub.title}
                            </h3>
                            <ul className="space-y-6">
                              {sub.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={item.link || "#"}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (item.onClick) item.onClick();
                                        setOpenMenu(null);
                                      }}
                                      className="flex items-start space-x-3 group cursor-pointer"
                                    >
                                      <div className="border border-border text-foreground rounded-md flex items-center justify-center size-9 shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                                        <Icon className="h-5 w-5 flex-none" />
                                      </div>
                                      <div className="leading-5 w-max">
                                        <p className="text-sm font-medium text-foreground shrink-0 group-hover:text-[#008080] transition-colors">
                                          {item.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground shrink-0 group-hover:text-foreground transition-colors duration-300">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
