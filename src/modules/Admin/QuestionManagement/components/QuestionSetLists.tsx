import { useState } from "react";
import {
  ArrowUpDown,
  Ban,
  PencilLine,
  Trash2,
} from "lucide-react";
import { DataTable } from "@/common/components/DataTable";
import { OverlayLoader } from "@/common/components/OverlayLoader";
import {
  useGetQuestionSetsQuery,
  useCreateQuestionSetMutation,
  useUpdateQuestionSetMutation,
  useDeleteQuestionSetMutation,
  useDeactivateQuestionSetMutation,
} from "../api/questionSetApi";
import { useGetCategoriesQuery } from "../api/categoryApi";
import { Button } from "@/common/components/ui/Button";
import { ActionMenu } from "@/common/components/ui/ActionMenu";
import { ConfirmDialog } from "@/common/components/ui/ConfirmDialog";
import { CreateQuestionSetDialog } from "./CreateQuestionSetDialog";
import type { QuestionSet } from "../types";
import  type { FormattedQuestionSet, questionSetSubmit } from "../types";


export const QuestionSetLists = () => {
  const { data: response, isLoading, isError } = useGetQuestionSetsQuery();
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const [createQuestionSet, { isLoading: isCreating }] =
    useCreateQuestionSetMutation();
  const [updateQuestionSet, { isLoading: isUpdating }] =
    useUpdateQuestionSetMutation();
  const [deleteQuestionSet, { isLoading: isDeleting }] =
    useDeleteQuestionSetMutation();
  const [deactivateQuestionSet, { isLoading: isDeactivating }] =
    useDeactivateQuestionSetMutation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingQuestionSet, setEditingQuestionSet] =
    useState<FormattedQuestionSet | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: "delete" | "deactivate";
    item: FormattedQuestionSet;
  } | null>(null);

  const questionSets: FormattedQuestionSet[] = (
    response?.data?.questionSets ?? []
  ).map((item: QuestionSet) => ({
    id: item.id,
    categoryId: item.categoryId,
    title: item.title,
    description: item.description,
    price: `${item.currency} ${item.price}`,
    priceValue: Number(item.price),
    currency: item.currency,
    accessDurationDays: item.accessDurationDays,
    status: item.isActive ? "active" : "inactive",
  }));

  const openCreateDialog = () => {
    setDialogMode("create");
    setEditingQuestionSet(null);
    setIsCreateOpen(true);
  };

  const openEditDialog = (item: FormattedQuestionSet) => {
    setDialogMode("edit");
    setEditingQuestionSet(item);
    setIsCreateOpen(true);
  };

  const handleQuestionSetSubmit = async (data: questionSetSubmit) => {
    if (dialogMode === "edit" && editingQuestionSet) {
      await updateQuestionSet({
        id: editingQuestionSet.id,
        payload: data,
      });
      return;
    }
    await createQuestionSet(data);
  };

  const closeCreateDialog = () => {
    setIsCreateOpen(false);
    setEditingQuestionSet(null);
    setDialogMode("create");
  };

  const openActionDialog = (
    type: "delete" | "deactivate",
    item: FormattedQuestionSet,
  ) => {
    setPendingAction({ type, item });
  };

  const handleConfirmAction = async () => {
    if (!pendingAction) return;

    if (pendingAction.type === "delete") {
      await deleteQuestionSet(pendingAction.item.id);
    }

    if (pendingAction.type === "deactivate") {
      await deactivateQuestionSet({
        id: pendingAction.item.id,
        isActive: pendingAction.item.status !== "active",
      });
    }

    setPendingAction(null);
  };

  const columns = [
    {
      id: "title",
      accessorKey: "title",
      header: () => (
        <span className="inline-flex items-center gap-1">
          Title & Description
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        </span>
      ),
      cell: ({ row }: { row: { original: FormattedQuestionSet } }) => (
        <div>
          <p className="font-medium text-slate-900">{row.original.title}</p>
          <p className="text-xs text-slate-400 truncate max-w-xs">
            {row.original.description}
          </p>
        </div>
      ),
    },
    {
      id: "price",
      accessorKey: "price",
      header: () => (
        <span className="inline-flex items-center gap-1">
          Price
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        </span>
      ),
      cell: ({ row }: { row: { original: FormattedQuestionSet } }) => (
        <span className="font-semibold text-slate-900">
          {row.original.price}
        </span>
      ),
    },
    {
      accessorKey: "accessDurationDays",
      header: "Access Duration",
      cell: ({ row }: { row: { original: FormattedQuestionSet } }) => (
        <span className="text-sm text-slate-600">
          {row.original.accessDurationDays} Days
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: FormattedQuestionSet } }) => {
        const isActive = row.original.status === "active";
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isActive ? "bg-emerald-600" : "bg-red-600"
              }`}
            />
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }: { row: { original: FormattedQuestionSet } }) => (
        <div className="text-right">
          <ActionMenu
            actions={[
              {
                id: "edit",
                label: "Edit",
                icon: <PencilLine className="h-4 w-4" />,
                onClick: () => openEditDialog(row.original),
              },
              {
                id: "deactivate",
                label: row.original.status === "active" ? "Deactivate" : "Activate",
                icon: <Ban className="h-4 w-4" />,
                variant: "warning",
                onClick: () => openActionDialog("deactivate", row.original),
              },
              {
                id: "delete",
                label: "Delete",
                icon: <Trash2 className="h-4 w-4" />,
                variant: "danger",
                onClick: () => openActionDialog("delete", row.original),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Questions Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage question sets, configure pricing, access duration, and
            visibility status.
          </p>
        </div>

        <Button className="cursor-pointer" onClick={openCreateDialog}>
          Create Question Set
        </Button>
      </div>

      {isLoading ? (
        <div className="relative min-h-55 rounded-xl border border-slate-200 bg-white">
          <OverlayLoader
            isLoading={true}
            mode="full"
            text="Loading question sets..."
          />
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Unable to load question sets right now.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={questionSets}
          searchPlaceholder="Search question sets by title..."
          searchColumnKey="title"
        />
      )}

      <CreateQuestionSetDialog
        isOpen={isCreateOpen}
        onClose={closeCreateDialog}
        onSubmit={handleQuestionSetSubmit}
        isLoading={isCreating || isUpdating}
        mode={dialogMode}
        initialValues={
          editingQuestionSet
            ? {
                categoryId: editingQuestionSet.categoryId,
                title: editingQuestionSet.title,
                description: editingQuestionSet.description,
                price: String(editingQuestionSet.priceValue),
                currency: editingQuestionSet.currency,
                accessDurationDays: editingQuestionSet.accessDurationDays,
              }
            : undefined
        }
        categories={categoriesResponse?.data?.categories ?? []}
      />

      {pendingAction?.type === "delete" && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setPendingAction(null)}
          onConfirm={handleConfirmAction}
          title="Delete question set"
          description={`This will permanently remove ${pendingAction.item.title}. This action cannot be undone.`}
          confirmLabel="Delete"
          variant="danger"
          isLoading={isDeleting}
        />
      )}

      {pendingAction?.type === "deactivate" && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setPendingAction(null)}
          onConfirm={handleConfirmAction}
          title={pendingAction.item.status === "active" ? "Deactivate question set" : "Activate question set"}
          description={
            pendingAction.item.status === "active"
              ? `Are you sure you want to deactivate ${pendingAction.item.title}?`
              : `Are you sure you want to activate ${pendingAction.item.title}?`
          }
          confirmLabel={pendingAction.item.status === "active" ? "Deactivate" : "Activate"}
          variant="primary"
          isLoading={isDeactivating}
        />
      )}
    </div>
  );
};

export default QuestionSetLists;
