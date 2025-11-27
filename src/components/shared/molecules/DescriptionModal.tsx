import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface IDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: Array<string | { text: string; className?: string }>;
}

export const DescriptionModal = ({
  isOpen,
  onClose,
  title,
  content,
}: IDescriptionModalProps) => {
  if (typeof document === "undefined") return null; // SSR safeguard

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-background-primary rounded-t-lg w-full max-w-lg max-h-[70vh] flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Close button + Title */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              {title && <h1 className="text-primary m-0">{title}</h1>}
            </div>

            {/* Scrollable content */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <p>
                {content.map((item, index) =>
                  typeof item === "string" ? (
                    <span key={index}>{item}</span> // use span instead of p
                  ) : (
                    <span key={index} className={item.className}>
                      {item.text}
                    </span>
                  )
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // render modal at the top of the DOM
  );
};
