import React from "react";
import AgreementStatsCard from "../../components/agreement/AgreementStatsCard";
import AgreementTable from "../../components/agreement/AgreementTable";
import PageHeader from "../../components/PageHeader";
import AgreementSendFormModal from "../../components/agreement/AgreementSendFormModal";
import { AiOutlineSend } from "react-icons/ai";

export default function Agreements() {
  return (
    <div className="p-1">
      <PageHeader
        title="Agreement"
        subtitle="Create and manage mining agreement models, track user signatures, and send agreements."
        buttonText="Send Agreement"
        buttonIcon={AiOutlineSend}
        ModalComponent={AgreementSendFormModal}
      />
      <AgreementStatsCard />
      <AgreementTable />
    </div>
  );
}
