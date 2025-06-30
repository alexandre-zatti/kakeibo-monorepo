import { PageHeader } from '@/components/page-header';
import { Product, ProductType } from '@/types/product';
import { PaginatedResponseSchema } from '@/types/paginated';
import ProductsTable from '@/app/products/table';
import Search from '@/app/products/search';
import { cn } from '@/lib/utils';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 20;
  const search =
    typeof resolvedSearchParams.search === 'string'
      ? resolvedSearchParams.search
      : undefined;

  async function fetchProducts(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    data: ProductType[];
    count: number;
    total: number;
    page: number;
    pageCount: number;
  }> {
    const url = new URL(`${process.env.API_GROCERIES_URL}/product`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('sort', 'purchase.boughtAt,DESC');

    if (search && search.trim() !== '') {
      const filterString = `description||$cont||${search}`;
      url.searchParams.set('filter', filterString);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

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

  const {
    data,
    total,
    page: currentPage,
    pageCount,
  } = await fetchProducts(page, limit, search);

  return (
    <>
      <PageHeader title={'Products'} />

      <div className={cn('mb-4')}>
        <Search />
      </div>

      <ProductsTable
        data={data}
        page={currentPage}
        pageCount={pageCount}
        total={total}
      />
    </>
  );
}
