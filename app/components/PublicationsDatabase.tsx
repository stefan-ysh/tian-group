'use client';

import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardBody, 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Pagination,
  Chip
} from "@heroui/react";
import { FileText, Search, Filter, ExternalLink, Download, Users, Calendar, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export interface Author {
  id: string;
  name: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: Author[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract?: string;
  keywords?: string[];
  pdfUrl?: string;
  isHighlighted?: boolean;
  impactFactor?: number;
  citations?: number;
}

interface PublicationsDatabaseProps {
  publications: Publication[];
}

export function PublicationsDatabase({ publications }: PublicationsDatabaseProps) {
  const t = useTranslations('Publications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 提取所有年份和期刊用于过滤
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publications.map(pub => pub.year)));
    return uniqueYears.sort((a, b) => b - a); // 降序排列年份
  }, [publications]);

  const journals = useMemo(() => {
    const uniqueJournals = Array.from(new Set(publications.map(pub => pub.journal)));
    return uniqueJournals.sort();
  }, [publications]);

  // 过滤并搜索论文
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      // 年份过滤
      if (selectedYear && pub.year !== selectedYear) {
        return false;
      }
      
      // 期刊过滤
      if (selectedJournal && pub.journal !== selectedJournal) {
        return false;
      }
      
      // 搜索查询
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        return (
          pub.title.toLowerCase().includes(lowerQuery) || 
          pub.abstract?.toLowerCase().includes(lowerQuery) ||
          pub.authors.some(author => author.name.toLowerCase().includes(lowerQuery)) ||
          pub.journal.toLowerCase().includes(lowerQuery) ||
          pub.keywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))
        );
      }
      
      return true;
    });
  }, [publications, searchQuery, selectedYear, selectedJournal]);

  // 分页处理
  const currentPublications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPublications.slice(startIndex, endIndex);
  }, [filteredPublications, currentPage]);

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  // 重置过滤器
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedYear(null);
    setSelectedJournal(null);
    setCurrentPage(1);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div>
        
        <Card className="mb-8 border border-primary/10">
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* 搜索栏 */}
              <div className="flex-1 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  startContent={<Search size={18} className="text-default-400" />}
                  className="w-full"
                  size="md"
                  variant="bordered"
                />
              </div>
              
              {/* 年份过滤 */}
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    startContent={<Calendar size={18} />}
                    className="min-w-[120px]"
                  >
                    {selectedYear ? selectedYear : t('yearFilter')}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Year filter" className="max-h-[300px] overflow-y-auto">
                  <DropdownItem key="all-years" onClick={() => setSelectedYear(null)}>
                    {t('allYears')}
                  </DropdownItem>
                  <div>
                    {years.map(year => (
                      <DropdownItem key={`year-${year}`} onClick={() => setSelectedYear(year)}>
                        {year}
                      </DropdownItem>
                    ))}
                  </div>
                </DropdownMenu>
              </Dropdown>
              
              {/* 期刊过滤 */}
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="bordered" 
                    startContent={<FileText size={18} />}
                    className="min-w-[150px] max-w-[200px] truncate"
                  >
                    {selectedJournal ? selectedJournal : t('journalFilter')}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Journal filter" className="max-h-[300px] overflow-y-auto">
                  <DropdownItem key="all-journals" onClick={() => setSelectedJournal(null)}>
                    {t('allJournals')}
                  </DropdownItem>
                  <div>
                    {journals.map(journal => (
                      <DropdownItem key={`journal-${journal}`} onClick={() => setSelectedJournal(journal)}>
                        {journal}
                      </DropdownItem>
                    ))}
                  </div>
                </DropdownMenu>
              </Dropdown>
              
              {/* 重置过滤器 */}
              <Button 
                color="secondary" 
                variant="flat"
                className="w-full md:w-auto" 
                onClick={resetFilters}
              >
                {t('resetFilters')}
              </Button>
            </div>
            
            {/* 活跃的过滤器标签 */}
            {(selectedYear || selectedJournal || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedYear && (
                  <Chip 
                    onClose={() => setSelectedYear(null)} 
                    variant="flat" 
                    color="primary"
                    startContent={<Calendar size={14} />}
                  >
                    {selectedYear}
                  </Chip>
                )}
                
                {selectedJournal && (
                  <Chip 
                    onClose={() => setSelectedJournal(null)} 
                    variant="flat" 
                    color="primary"
                    startContent={<FileText size={14} />}
                  >
                    {selectedJournal}
                  </Chip>
                )}
                
                {searchQuery && (
                  <Chip 
                    onClose={() => setSearchQuery('')} 
                    variant="flat" 
                    color="primary"
                    startContent={<Search size={14} />}
                  >
                    {searchQuery}
                  </Chip>
                )}
              </div>
            )}
          </CardBody>
        </Card>
        
        <div className="mb-4 text-sm text-foreground/70">
          {t('showingResults', { count: filteredPublications.length })}
        </div>
        
        {/* 论文列表 */}
        <div className="space-y-4">
          {currentPublications.length > 0 ? (
            currentPublications.map((pub) => (
              <Card
                key={pub.id}
                className={`border ${pub.isHighlighted ? 'border-primary' : 'border-primary/10'} hover:shadow-md transition-shadow`}
              >
                <CardBody className="p-5">
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold mb-2 flex-1">
                        {pub.title}
                        {pub.isHighlighted && (
                          <Award className="inline-block ml-2 text-amber-500" size={16} />
                        )}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        {pub.doi && (
                          <Link
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            title={t('viewOnline')}
                          >
                            <ExternalLink size={16} className="text-primary" />
                          </Link>
                        )}
                        {pub.pdfUrl && (
                          <Link
                            href={pub.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            title={t('downloadPDF')}
                          >
                            <Download size={16} className="text-primary" />
                          </Link>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3 text-sm text-foreground/70">
                      <Users size={16} className="mr-2 text-primary/70" />
                      {pub.authors.map((author, index) => (
                        <React.Fragment key={author.id}>
                          <Link
                            href={`/members/${author.id}`}
                            className="hover:text-primary hover:underline transition-colors"
                          >
                            {author.name}
                          </Link>
                          {index < pub.authors.length - 1 && <span>, </span>}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-y-2 text-sm text-foreground/80">
                      <div className="mr-4 italic">
                        {pub.journal}
                      </div>
                      <div className="mr-4">
                        {pub.year}
                        {pub.volume && `, ${pub.volume}`}
                        {pub.issue && `(${pub.issue})`}
                        {pub.pages && `: ${pub.pages}`}
                      </div>
                      {pub.doi && (
                        <div className="text-xs text-foreground/60">
                          DOI: {pub.doi}
                        </div>
                      )}
                    </div>
                    
                    {pub.citations && (
                      <div className="mt-2 text-xs text-foreground/70">
                        {t('citations')}: {pub.citations}
                      </div>
                    )}
                    
                    {pub.abstract && (
                      <div className="mt-3 text-sm text-foreground/80">
                        <div className="font-medium mb-1">{t('abstract')}:</div>
                        <p className="line-clamp-2 hover:line-clamp-none transition-all duration-200">
                          {pub.abstract}
                        </p>
                      </div>
                    )}
                    
                    {pub.keywords && pub.keywords.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {pub.keywords.map(keyword => (
                          <Chip
                            key={keyword}
                            size="sm"
                            variant="flat"
                            color="default"
                            className="text-xs"
                            onClick={() => setSearchQuery(keyword)}
                          >
                            {keyword}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="py-12 text-center text-foreground/60">
              <FileText size={40} className="mx-auto mb-4 opacity-50" />
              <p>{t('noPublicationsFound')}</p>
              <Button 
                variant="light" 
                color="primary" 
                className="mt-4"
                onClick={resetFilters}
              >
                {t('resetFilters')}
              </Button>
            </div>
          )}
        </div>
        
        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              total={totalPages}
              initialPage={1}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              classNames={{
                cursor: "bg-primary text-white",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 