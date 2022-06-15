import React from "react";
import { useEffect, useState } from "react";

import { EditItemModal } from "./EditItemModal";
import { EditItemProvider } from "./EditItemProvider";

export interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditItemModalContainer = ({ isOpen, onClose }: EditItemModalProps) => {
  return (
    <EditItemProvider>
      <EditItemModal isOpen={isOpen} onClose={onClose} />
    </EditItemProvider>
  );
};

export default EditItemModalContainer;
