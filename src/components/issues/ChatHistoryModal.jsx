import useIssueMessages from "../../hooks/useIssueMessages";

export default function ChatHistoryModal({ issueId, onClose }) {
  const { data, isLoading } = useIssueMessages(issueId, true);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Chat History</h2>

        {isLoading && <p>Loading messages...</p>}

        {!isLoading && data?.length === 0 && (
          <p className="text-gray-500">No messages found</p>
        )}

        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {data?.map((msg) => (
            <div key={msg._id} className="p-3 bg-gray-100 rounded-lg border">
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs font-semibold text-end">{msg.sendBy}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {new Date(msg.sendOn).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-5 bg-gray-700 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
