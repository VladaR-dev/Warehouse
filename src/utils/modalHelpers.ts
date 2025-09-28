export const getModalTitle = (modalType: string | null, isProduct = false): string => {
  switch (modalType) {
    case 'add':
      return isProduct ? 'Добавить товар' : 'Добавить склад';
    case 'edit':
      return 'Редактировать склад';
    case 'delete':
      return isProduct ? 'Удалить товар' : 'Удалить склад';
    default:
      return '';
  }
};

export const getSubmitButtonText = (modalType: string | null): string => {
  switch (modalType) {
    case 'add':
      return 'Добавить';
    case 'edit':
      return 'Сохранить';
    case 'delete':
      return 'Удалить';
    default:
      return 'Подтвердить';
  }
};
