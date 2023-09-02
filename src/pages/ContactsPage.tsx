import api from "@/api";
import { Contact, Contacts } from "@/api/contact.api";
import { Paper } from "@/components";
import { Table } from "@/components/tables";
import { useDocumentTitle } from "@/hooks";
import { DATE_TIME_FORMAT } from "@/utils/constants";
import { TITLES } from "@/utils/titles";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { FC, useMemo } from "react";
import { useLoaderData } from "react-router-dom";

type Props = {};

const ContactsPage: FC<Props> = () => {
  useDocumentTitle(TITLES.CONTACTS);

  const { contacts: rows, count } = useLoaderData() as Contacts;

  const columns = useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        accessorKey: "lastName",
        header: "Họ",
        enableSorting: true,
      },
      {
        accessorKey: "firstName",
        header: "Tên",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
      },
      {
        accessorKey: "phone",
        header: "Điện thoại",
        enableSorting: true,
      },
      {
        accessorKey: "website",
        header: "Website",
        enableSorting: true,
        cell: ({ row }) => row.original.website || "Không có",
      },
      {
        accessorKey: "message",
        header: "Tin nhắn",
        enableSorting: true,
      },
      {
        accessorKey: "createdAt",
        header: "Ngày tạo",
        cell: ({ row }) =>
          moment(row.original.createdAt).format(DATE_TIME_FORMAT),
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <Paper title={TITLES.CONTACTS}>
      <Table
        rows={rows}
        columns={columns}
        count={count}
        hasRowSelection={true}
        sortable={true}
        onDelete={api.contact.deleteMany}
        deleteAction={true}
        hasSearch={true}
        hasDeleteBtn={true}
      />
    </Paper>
  );
};

export default ContactsPage;
