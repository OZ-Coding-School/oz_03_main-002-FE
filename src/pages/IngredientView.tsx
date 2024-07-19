import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine } from 'react-icons/ri';
import BottomSheet from '../components/BottomSheet.tsx';
import EditModal from '../components/EditModal.tsx';
import DeleteModal from '../components/DeleteModal.tsx';
import CreateModal from '../components/CreateModal.tsx';
import IngredeintTestData from '../data/IngredientTestData.json';

export type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  expirationDate: string;
};

function IngredientView(): React.ReactElement {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] =
    useState<Ingredient | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ingredientToEdit, setIngredientToEdit] = useState<Ingredient | null>(
    null,
  );
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    setIngredients(IngredeintTestData);
  }, []);

  const handleSelect = (id: number) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id],
    );
    setIsBottomSheetOpen(true);
  };

  const handleEdit = (ingredient: Ingredient) => {
    setIngredientToEdit(ingredient);
    setEditModalOpen(true);
  };

  const confirmEdit = (editedIngredient: Ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ing) =>
        ing.id === editedIngredient.id ? editedIngredient : ing,
      ),
    );
    setEditModalOpen(false);
    setIngredientToEdit(null);
  };

  const handleDelete = (ingredient: Ingredient) => {
    setIngredientToDelete(ingredient);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (ingredientToDelete) {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ing) => ing.id !== ingredientToDelete.id),
      );
      setSelectedIds((prevIds) =>
        prevIds.filter((prevId) => prevId !== ingredientToDelete.id),
      );
    }
    setDeleteModalOpen(false);
    setIngredientToDelete(null);
  };

  const handleAdd = (newIngredient: Omit<Ingredient, 'id'>) => {
    const newId = Math.max(...ingredients.map((ing) => ing.id), 0) + 1;
    const ingredientWithId = { ...newIngredient, id: newId };
    setIngredients([...ingredients, ingredientWithId]);
    setAddModalOpen(false);
  };

  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md h-full max-h-[844px] flex flex-col bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="text-left text-lg font-semibold">재료 목록</h2>
          <div className="flex items-center">
            <span className="font-semibold text-sky-500 text-base mr-2">
              선택된 재료: {selectedIds.length}
            </span>
            <motion.button
              className="px-3 py-2 bg-green-700 text-white rounded-lg flex items-center justify-center"
              onClick={() => setAddModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RiAddLine size={20} className="mr-1" />
              <span className="text-sm">재료추가</span>
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {ingredients.map((ingredient) => (
              <motion.div
                key={ingredient.id}
                className={`bg-white p-3 rounded-lg shadow-md cursor-pointer relative ${
                  selectedIds.includes(ingredient.id)
                    ? 'border-2 border-blue-500'
                    : ''
                }`}
                onClick={() => handleSelect(ingredient.id)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
                  transition: { duration: 0.1 },
                }}
              >
                <h3 className="font-bold text-sm">{ingredient.name}</h3>
                <p className="text-gray-600 text-xs">{ingredient.quantity}</p>
                <p className="text-gray-500 text-xs">
                  유통기한: {ingredient.expirationDate}
                </p>
                {selectedIds.includes(ingredient.id) && (
                  <span className="absolute top-2 right-2 text-blue-500 text-base">
                    ✓
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        ingredients={ingredients}
        selectedIds={selectedIds}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        ingredient={ingredientToEdit}
        onSave={confirmEdit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        ingredient={ingredientToDelete}
        onConfirm={confirmDelete}
      />

      <CreateModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default IngredientView;
