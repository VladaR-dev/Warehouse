export const getModalTitle = (modalType: string | null): string => {
  switch (modalType) {
    case 'add':
      return 'Добавить склад';
    case 'edit':
      return 'Редактировать склад';
    case 'delete':
      return 'Подтверждение удаления';
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
