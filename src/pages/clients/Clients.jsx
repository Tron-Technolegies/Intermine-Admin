import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import ClientCard from "../../components/clients/ClientCard";
import AddClientModal from "../../components/clients/AddClientModal";
import useClients from "../../hooks/useClients";
import Loading from "../../components/Loading";

export default function Clients() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const navigate = useNavigate();
  const { data, error, isLoading } = useClients(page, search, status);

  if (isLoading) return <Loading />;
  if (error)
    return <div className="p-6 text-center text-red-500">{error.message}</div>;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Clients"
        subtitle="Manage all mining clients and agreements"
        buttonText="Add Client"
        ModalComponent={AddClientModal}
      />

      <SearchFilterBar
        search={search}
        onSearch={setSearch}
        filterValue={status}
        onFilterChange={setStatus}
        filterOptions={["ALL", "online", "offline"]}
      />

      {/* Client Cards Grid */}
      <div className="p-6 flex flex-col gap-2">
        {data?.clients?.map((client) => (
          <ClientCard
            key={client._id}
            client={{
              id: client.clientId,
              name: client.clientName,
              email: client.email,
              location: client.address?.street || "N/A",
              joined: new Date(client.createdAt).toLocaleDateString(),
              miners: `${client.owned?.length || 0}`,
              consumption: client.owned?.power || "0W",
              agreement: client.miningAgreement ? true : false,
              status: client.status || "Active",
            }}
            onViewDetails={() => navigate(`/clients/${client._id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 pb-8">
        <button
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-40"
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span className="text-gray-600">
          Page {page} / {data?.totalPages}
        </span>

        <button
          disabled={page >= data?.totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-40"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
