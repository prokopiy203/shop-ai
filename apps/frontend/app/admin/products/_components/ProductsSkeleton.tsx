"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProductsSkeleton() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-[220px]" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-[60px] mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-6 w-[80px] mx-auto rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-[100px] ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
