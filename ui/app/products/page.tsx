import { PageHeader } from '@/components/page-header';
import { ColumnDef } from '@tanstack/react-table';
import { Product, ProductType } from '@/types/product';
import { DataTable } from '@/components/data-table';
import { PaginatedResponseSchema } from '@/types/paginated';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 20;

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'unitValue',
      header: 'Value',
    },
    {
      accessorKey: 'unitIdentifier',
      header: 'Unit',
    },
    {
      accessorKey: 'totalValue',
      header: 'Total',
    },
    {
      accessorKey: 'purchase.boughtAt',
      header: 'Bought At',
    },
  ];

  async function fetchProducts(): Promise<{
    data: ProductType[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
  }> {
    const res = await fetch(
      `${process.env.API_GROCERIES_URL}/product?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch products: ${res.status} ${res.statusText}`,
      );
    }

    const json: unknown = await res.json();
    const result = PaginatedResponseSchema(Product).safeParse(json);

    if (!result.success) {
      console.error('Product list validation failed:', result.error.format());
      throw new Error('Product data did not match schema');
    }

    return result.data;
  }

  const { data, total, page: currentPage, pageCount } = await fetchProducts();

  return (
    <>
      <PageHeader title={'Products'} />
      <DataTable
        columns={columns}
        data={data}
        page={currentPage}
        pageCount={pageCount}
        total={total}
      />
    </>
  );
}
