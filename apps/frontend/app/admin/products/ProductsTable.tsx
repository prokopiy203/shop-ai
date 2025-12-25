"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { useProductsStore } from "./_store/products";
import { useAdminProducts } from "./_queries/useAdminProducts";
import { ProductsSkeleton } from "./_components/ProductsSkeleton";
import { ProductsErrorState } from "./_components/ProductsErrorState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function ProductsTable() {
  const {
    page,
    limit,
    search,
    selectedIds,
    nextPage,
    prevPage,
    toggleSelect,
    toggleSelectAll,
  } = useProductsStore();
  const query = useAdminProducts({ page, limit, search });

  if (query.isLoading) return <ProductsSkeleton />;
  if (query.isError) return <ProductsErrorState />;
  if (!query.data) return null;

  const { items } = query.data;

  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <Card
          className="
  overflow-hidden
"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" flex justify-center items-center">
                  <Checkbox
                    checked={
                      items.length > 0 && selectedIds.length === items.length
                    }
                    onCheckedChange={() =>
                      toggleSelectAll(items.map((p) => p._id))
                    }
                  />
                </TableHead>
                <TableHead className="text-center">Photo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-start">SKU</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Created</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="flex h-full items-center justify-center">
                      <Checkbox
                        checked={selectedIds.includes(p._id)}
                        onCheckedChange={() => toggleSelect(p._id)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center">
                      {p.images?.[0]?.thumbnail ? (
                        <img
                          src={p.images[0].thumbnail}
                          alt={p.title}
                          className="h-10 w-10 rounded-md object-cover border"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center text-xs text-muted-foreground"></div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="hover:underline underline-offset-4"
                    >
                      {p.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-center">{p.stock}</TableCell>
                  <TableCell className="text-center">${p.price}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={p.isActive ? "default" : "secondary"}>
                      {p.isActive ? "active" : "inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">Page {page}</span>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={items.length < limit}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
