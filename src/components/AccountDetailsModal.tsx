import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AccountDetailsModalProps {
  open: boolean;
  onClose: () => void;
  userId: string; // pass this from parent
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
  open,
  onClose,
  userId,
}) => {
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      setError("");
      fetch(`https://3cees29vh8.execute-api.ap-south-1.amazonaws.com/get_iam_details?UserID=${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch IAM details");
          }
          return res.json();
        })
        .then((data) => {
          setAccountId(data.IAMAccountId || "");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [open, userId]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>IAM Details</DialogTitle>
          <DialogDescription>Your IAM account information is below.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Error: {error}</p>
        ) : (
          <div className="space-y-2 text-sm">
            <div>
              <strong>Account ID:</strong> {accountId}
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AccountDetailsModal;
