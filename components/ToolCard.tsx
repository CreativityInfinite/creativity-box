'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Zap } from 'lucide-react';
import { Tool } from '@/types/tool';
import { CATEGORY_ICONS, getCategoryDisplayName, getSubcategoryDisplayName, type PrimaryCategoryKey } from '@/src/constants/category.constant';
import { getMessages } from '@/src/i18n/index';

function getIconForTool(tool: Tool) {
  const primaryCategory = tool.primaryCategory as PrimaryCategoryKey;
  if (primaryCategory && CATEGORY_ICONS[primaryCategory]) {
    return CATEGORY_ICONS[primaryCategory];
  }
  // 降级处理：如果没有 primaryCategory 或找不到对应图标，使用默认图标
  return Zap;
}

function getIconBgForTool(tool: Tool) {
  const primaryCategory = tool.primaryCategory as PrimaryCategoryKey;
  // 提升亮度（透明度约 20%）的调色板
  const palette = {
    ImageGeneration: '#22d3ee33', // cyan
    TextWriting: '#9333ea33', // violet
    ChatTools: '#9333ea33', // violet
    CodeAssistant: '#f59e0b33', // amber
    VoiceVideo: '#3b82f633', // blue
    DataInsights: '#10b98133', // emerald
    Automation: '#1d4ed833', // indigo
    Others: '#6b72801a' // gray
  };
  if (primaryCategory && palette[primaryCategory]) {
    return palette[primaryCategory];
  }
  // 降级处理：如果没有 primaryCategory 或找不到对应颜色，使用默认颜色
  return '#6b72801a';
}

export function ToolCard({ tool, locale = 'zh-CN' }: { tool: Tool; locale?: string }) {
  const Icon = getIconForTool(tool);
  const iconBg = getIconBgForTool(tool);

  // 构建分类显示文本
  const getCategoryText = () => {
    const primaryCategory = tool.primaryCategory as PrimaryCategoryKey;
    const subcategory = tool.subcategory;
    const messages = getMessages(locale);

    if (primaryCategory && subcategory) {
      const primaryDisplayName = getCategoryDisplayName(primaryCategory, messages);
      const subcategoryDisplayName = getSubcategoryDisplayName(primaryCategory, subcategory as any, messages);
      return `${subcategoryDisplayName}`;
    } else if (primaryCategory) {
      return getCategoryDisplayName(primaryCategory, messages);
    }
    return '';
  };

  return (
    <Card
      onClick={() => window.open(tool.link, '_blank')}
      className="group relative cursor-pointer bg-gradient-to-tr from-[rgba(34,211,238,0.02)] to-[rgba(34,211,238,0.06)] hover:from-[rgba(34,211,238,0.03)] hover:to-[rgba(34,211,238,0.08)] border border-border/30 hover:border-primary transition-all duration-300 ease-out rounded-xl sm:rounded-2xl lg:rounded-[30px] overflow-hidden hover:shadow-lg hover:-translate-y-1"
    >
      <CardHeader className="pb-0 p-3 sm:p-4 lg:p-6">
        <div className="space-y-1 sm:space-y-1.5">
          <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src={tool.logo} alt={`${tool.name} logo`} className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm shrink-0" />
              <span className="group-hover:text-primary transition-colors duration-300 line-clamp-1 break-all flex-1 min-w-0" title={tool.name}>
                {tool.name}
              </span>
            </div>
          </CardTitle>
          <CardDescription className="text-[8px] sm:text-[10px] lg:text-xs group-hover:text-foreground/80 transition-colors duration-300">
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <Icon className="h-2 w-2 sm:h-3 sm:w-3 shrink-0 text-foreground/60" />
              <span className="truncate flex-1 min-w-0">{getCategoryText()}</span>
            </div>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-2 p-2 sm:p-4 lg:p-6 lg:pt-0 lg:pb-2">
        <p className="text-[9px] sm:text-xs lg:text-sm text-muted-foreground line-clamp-1 lg:line-clamp-3 mb-2 leading-relaxed">{tool.description}</p>

        <div className="mt-2 sm:mt-3 lg:mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {tool.tags.slice(0, 2).map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="rounded-full text-[7px] sm:text-[8px] lg:text-[9px] px-1 sm:px-1.5 lg:px-2 py-0.5 bg-muted/40 text-muted-foreground/70 hover:bg-muted/60 hover:text-muted-foreground/80 transition-colors"
              >
                #{t}
              </Badge>
            ))}

            {tool.tags.length > 2 && (
              <Badge variant="secondary" className="rounded-full text-[7px] sm:text-[8px] lg:text-[9px] px-1 sm:px-1.5 lg:px-2 py-0.5 bg-muted/20 text-muted-foreground/50 border-0">
                +{tool.tags.length - 2}
              </Badge>
            )}
          </div>

          <span className="text-[8px] sm:text-[9px] lg:text-[10px] text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0 font-medium ml-1">
            ★ {tool.rating.toFixed(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
