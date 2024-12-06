import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import TicketStatusBadge from "../components/TicketStatusBadge";
import TicketPriorityBadge from "../components/TicketPriorityBadge";
import delay from "delay";
import TicketActions from "./TicketActions";
const TicketsPage = async () => {
  const tickets = await prisma.ticket.findMany();
  await delay(1000);
  return (
    <div>
      <TicketActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ticket</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Priority
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket) => (
            <Table.Row key={ticket.id}>
              <Table.Cell>
                {ticket.title}
                <div className="block md:hidden">
                  <TicketStatusBadge status={ticket.status} />{" "}
                  <TicketPriorityBadge priority={ticket.priority} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TicketStatusBadge status={ticket.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <TicketPriorityBadge priority={ticket.priority} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {ticket.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default TicketsPage;
