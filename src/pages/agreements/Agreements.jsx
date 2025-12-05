import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import AgreementStatsCard from "../../components/agreement/AgreementStatsCard";
import AgreementTable from "../../components/agreement/AgreementTable";
import AgreementSendFormModal from "../../components/agreement/AgreementSendFormModal";
import useAgreementStats from "../../hooks/adminAgreement/useAgreementStats";
import useAgreements from "../../hooks/adminAgreement/useAgreements";
import { AiOutlineSend } from "react-icons/ai";

export default function Agreements() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");

  const { data, isLoading } = useAgreements(page, query, status);
  const { data: stats } = useAgreementStats();

  const statBlocks = stats
    ? [
        { title: "Total Agreements", value: stats.total },
        { title: "Signed Agreements", value: stats.signed, subtitle: "Completed signatures" },
        { title: "Pending Signatures", value: stats.pending, subtitle: "Awaiting signature" },
        {
          title: "Completion Rate",
          value: `${stats.ratio.toFixed(2)}%`,
          subtitle: "Signature completion",
        },
      ]
    : [];

  return (
    <div className="p-1">
      <PageHeader
        title="Agreement"
        subtitle="Create and manage mining agreement models."
        buttonText="Send Agreement"
        buttonIcon={AiOutlineSend}
        ModalComponent={AgreementSendFormModal}
      />

      <AgreementStatsCard stats={statBlocks} />

      <AgreementTable
        data={data?.agreements}
        isLoading={isLoading}
        page={page}
        totalPages={data?.totalPages || 1}
        setPage={setPage}
      />
    </div>
  );
}
