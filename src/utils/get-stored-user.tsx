function getStoredUser() {
    if (typeof window !== 'undefined') {
      const UsuarioLocalStorage = localStorage.getItem('usuario');
      if (UsuarioLocalStorage !== null) {
        try {
          const usuarioData = JSON.parse(UsuarioLocalStorage);
          return usuarioData;
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }