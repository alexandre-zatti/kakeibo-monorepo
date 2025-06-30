'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ProductType } from '@/types/product';
import { DataTable } from '@/components/data-table';

interface ProductTableProps {
  data: ProductType[];
  page: number;
  pageCount: number;
  total: number;
}

export default function ProductsTable({
  data,
  page,
  pageCount,
  total,
}: ProductTableProps) {
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) =>
        `${row.original.quantity} ${row.original.unitIdentifier}`,
    },
    {
      accessorKey: 'unitValue',
      header: 'Unit',
      cell: ({ row }) =>
        row.original.unitValue?.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      accessorKey: 'totalValue',
      header: 'Total',
      cell: ({ row }) =>
        row.original.totalValue?.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    },
    {
      accessorKey: 'purchase.boughtAt',
      header: 'Bought',
      cell: ({ row }) =>
        new Date(row.original.purchase.boughtAt).toLocaleDateString('pt-br'),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      page={page}
      pageCount={pageCount}
      total={total}
    />
  );
}
