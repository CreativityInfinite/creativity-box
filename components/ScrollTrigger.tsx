'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getMessages } from '@/src/i18n/index';

interface ScrollTriggerProps {
  children: React.ReactNode;
  triggerDistance?: number;
  autoScrollTarget?: string;
  reverseScrollTarget?: string;
  showIndicator?: boolean;
}

export function ScrollTrigger({ children, triggerDistance = 400, autoScrollTarget, reverseScrollTarget = 'search-section', showIndicator = true }: ScrollTriggerProps) {
  const [hasAutoScrolledDown, setHasAutoScrolledDown] = useState(false);
  const [hasAutoScrolledUp, setHasAutoScrolledUp] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [suppressAutoScroll, setSuppressAutoScroll] = useState(false);
  const prevYRef = useRef(0);
  const params = useParams();
  const locale = (params?.locale as string) || 'zh-CN';
  const messages = getMessages(locale);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const prevY = prevYRef.current;
    const isScrollingDown = currentScrollY > prevY;
    prevYRef.current = currentScrollY;

    // 隐藏滚动提示
    setShowScrollHint(currentScrollY <= 100);

    // 在程序化滚动期间，禁用自动吸附
    if (suppressAutoScroll) {
      return;
    }

    // 下行自动滚动到热门工具区（防抖与方向判断）
    if (autoScrollTarget && isScrollingDown && !hasAutoScrolledDown && currentScrollY > triggerDistance && currentScrollY < triggerDistance + 200) {
      setHasAutoScrolledDown(true);
      // 使用更自然的滚动：计算绝对位置并微调偏移
      setTimeout(() => {
        const targetElement = document.getElementById(autoScrollTarget);
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          const top = window.scrollY + rect.top - 12; // 轻微上移，视觉更贴合
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 250);
    }

    // 上行自动滚动（基于目标元素距离顶部的吸附判断）
    if (!isScrollingDown && !hasAutoScrolledUp) {
      // 当 hot-tools-section（autoScrollTarget）距离顶部在 0-200px 且用户上滑时，吸附到顶部
      if (reverseScrollTarget === 'top' && autoScrollTarget) {
        const targetEl = document.getElementById(autoScrollTarget);
        const topFromViewport = targetEl ? targetEl.getBoundingClientRect().top : Infinity;
        if (topFromViewport >= 0 && topFromViewport <= 200) {
          setHasAutoScrolledUp(true);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 150);
        }
      } else if (reverseScrollTarget && reverseScrollTarget !== 'top' && currentScrollY < triggerDistance - 50 && currentScrollY > 50) {
        // 兼容回滚到指定元素的逻辑（非顶部）
        setHasAutoScrolledUp(true);
        setTimeout(() => {
          const targetElement = document.getElementById(reverseScrollTarget);
          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const top = window.scrollY + rect.top - 12;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 200);
      }
    }

    // 重置自动滚动标记（靠近顶部时允许再次触发）
    if (currentScrollY < 50) {
      setHasAutoScrolledDown(false);
      setHasAutoScrolledUp(false);
    }
  }, [triggerDistance, autoScrollTarget, reverseScrollTarget, hasAutoScrolledDown, hasAutoScrolledUp, suppressAutoScroll]);

  useEffect(() => {
    const onStart = (_e: Event) => setSuppressAutoScroll(true);
    const onEnd = (_e: Event) => {
      setSuppressAutoScroll(false);
      setHasAutoScrolledDown(false);
      setHasAutoScrolledUp(false);
    };

    window.addEventListener('backToTop:start', onStart as EventListener);
    window.addEventListener('backToTop:end', onEnd as EventListener);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('backToTop:start', onStart as EventListener);
      window.removeEventListener('backToTop:end', onEnd as EventListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {children}

      {/* 滚动指示器 */}
      <AnimatePresence>
        {showIndicator && showScrollHint && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <div className="text-sm font-medium">{messages.ui?.scrollHint}</div>
              <motion.div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
