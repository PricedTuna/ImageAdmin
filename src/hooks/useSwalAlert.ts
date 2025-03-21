import Swal from 'sweetalert2';

export const useSwalAlert = () => {
  return {
    success: (title = '¡Éxito!', text = '', options = {}) =>
      Swal.fire({
        icon: 'success',
        title,
        text,
        ...options,
      }),
    error: (title = '¡Error!', text = '', options = {}) =>
      Swal.fire({
        icon: 'error',
        title,
        text,
        ...options,
      }),
    warning: (title = '¡Atención!', text = '', options = {}) =>
      Swal.fire({
        icon: 'warning',
        title,
        text,
        ...options,
      }),
    info: (title = 'Información', text = '', options = {}) =>
      Swal.fire({
        icon: 'info',
        title,
        text,
        ...options,
      }),
    confirm: async (title = '¿Estás seguro?', text = '', options = {}) => {
      const result = await Swal.fire({
        icon: 'question',
        title,
        text,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        ...options,
      });
      return result.isConfirmed;
    },
  };
};
