import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationControls({ currentPage, totalPages }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    if (page < 1 || page > Math.max(1, totalPages)) return;

    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(page));
    setSearchParams(next);
  };

  const handlePrev = () => setPage(Math.max(1, currentPage - 1));
  const handleNext = () => setPage(Math.min(totalPages, currentPage + 1));

  const pages: Array<number | 'ellipsis'> = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push('ellipsis');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return (
    <Pagination aria-label='Products pagination' className='w-fit mx-0'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (currentPage > 1) handlePrev();
            }}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? 'pointer-events-none opacity-50 hover:cursor-not-allowed'
                : ''
            }
          />
        </PaginationItem>

        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`e-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href='#'
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  if (p !== currentPage) setPage(p);
                }}
                aria-current={p === currentPage ? 'page' : undefined}
                className={
                  p === currentPage
                    ? 'bg-muted text-foreground rounded-sm'
                    : 'text-muted-foreground'
                }
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (currentPage < totalPages) handleNext();
            }}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
