import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import SearchFilterBar from "../../components/SearchFilterBar";
import ClientCard from "../../components/clients/ClientCard";
import AddClientModal from "../../components/clients/AddClientModal";

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const navigate = useNavigate();

  const clients = [
    {
      id: "Client-005",
      name: "Mike Chen",
      email: "mikechen@email.com",
      location: "Texas Data Centre A",
      joined: "2024-01-15",
      miners: "2/3",
      consumption: "60W",
      agreement: false,
      status: "Active",
    },
    {
      id: "Client-001",
      name: "John Smith",
      email: "johnsmith@email.com",
      location: "California Farm B",
      joined: "2024-03-12",
      miners: "3/3",
      consumption: "75W",
      agreement: true,
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Clients"
        subtitle="Manage all mining equipment and monitor performance"
        buttonText="Add Client"
        ModalComponent={AddClientModal}
      />

      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        placeholder="Search by name, email, or ID..."
      />

      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onViewDetails={(c) => navigate(`/clients/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
