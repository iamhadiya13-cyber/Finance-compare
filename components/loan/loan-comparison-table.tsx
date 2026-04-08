"use client";

/* eslint-disable react-hooks/incompatible-library */

import { useMemo, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import type { LoanEntry } from "@/lib/loan-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type LoanComparisonTableProps = {
  data: LoanEntry[];
};

export function LoanComparisonTable({ data }: LoanComparisonTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredCards = useMemo(() => {
    if (!globalFilter.trim()) {
      return data;
    }

    const needle = globalFilter.toLowerCase();
    return data.filter((item) =>
      [item.providerName, item.interestRate, item.loanAmountRange]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [data, globalFilter]);

  const columns = useMemo<ColumnDef<LoanEntry>[]>(
    () => [
      {
        accessorKey: "providerName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-3 h-auto px-3 py-1 text-[0.78rem]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Provider
            <ArrowUpDown className="size-3.5" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[180px] space-y-1.5">
            <p className="font-sans font-semibold">{row.original.providerName}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-4 fill-current text-primary" />
              {row.original.rating.toFixed(1)} / 5 editorial score
            </div>
          </div>
        ),
      },
      {
        accessorKey: "interestRate",
        header: "Interest rate",
      },
      {
        accessorKey: "processingFee",
        header: "Processing fee",
      },
      {
        accessorKey: "minSalary",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-3 h-auto px-3 py-1 text-[0.78rem]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Min salary
            <ArrowUpDown className="size-3.5" />
          </Button>
        ),
        cell: ({ getValue }) => formatCurrency(getValue<number>()),
      },
      {
        accessorKey: "maxTenureMonths",
        header: "Max tenure",
        cell: ({ getValue }) => `${getValue<number>()} months`,
      },
      {
        accessorKey: "loanAmountRange",
        header: "Loan amount range",
      },
      {
        accessorKey: "lastUpdated",
        header: "Updated",
        cell: ({ getValue }) => formatDate(getValue<string>()),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _, filterValue) => {
      const haystack = [
        row.original.providerName,
        row.original.interestRate,
        row.original.loanAmountRange,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(String(filterValue).toLowerCase());
    },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Filter by lender or rate range"
          className="w-full md:max-w-sm"
        />
        <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
          Use the table for quick screening, then review the editorial notes below before visiting an official lender page.
        </p>
      </div>

      <div className="grid gap-3 md:hidden">
        {filteredCards.map((item) => (
          <div key={item.providerName} className="card-hover surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-sans text-[0.98rem] font-semibold text-foreground">
                  {item.providerName}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="size-4 fill-current text-primary" />
                  {item.rating.toFixed(1)} / 5
                </div>
              </div>
              <div className="rounded-xl bg-muted px-2.5 py-1 font-sans text-[0.74rem] font-medium text-foreground">
                {item.interestRate}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Processing fee
                </p>
                <p className="mt-1 text-sm text-foreground">{item.processingFee}</p>
              </div>
              <div>
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Minimum salary
                </p>
                <p className="mt-1 text-sm text-foreground">{formatCurrency(item.minSalary)}</p>
              </div>
              <div>
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Max tenure
                </p>
                <p className="mt-1 text-sm text-foreground">{item.maxTenureMonths} months</p>
              </div>
              <div>
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Loan amount range
                </p>
                <p className="mt-1 text-sm text-foreground">{item.loanAmountRange}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/75 bg-muted/45 p-3.5 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Best fit:</span>{" "}
                {item.pros[0]}.
              </p>
              <p className="mt-2">
                <span className="font-medium text-foreground">Verify:</span>{" "}
                {item.cons[0]}.
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-hidden md:block">
        <div className="surface overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCards.map((item) => (
          <div key={`${item.providerName}-note`} className="card-hover surface p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-sans text-[0.98rem] font-semibold text-foreground">
                  {item.providerName}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Updated {formatDate(item.lastUpdated)}
                </p>
              </div>
              <div className="rounded-xl border border-border/75 bg-muted/55 px-2.5 py-1 font-sans text-[0.74rem] font-medium text-foreground">
                {item.interestRate}
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Why it may be worth shortlisting:</span>{" "}
                {item.pros.join("; ")}.
              </p>
              <p>
                <span className="font-medium text-foreground">What to verify before applying:</span>{" "}
                {item.cons.join("; ")}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}